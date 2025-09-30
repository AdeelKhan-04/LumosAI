import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });
    const content = response.choices[0].message.content;
    await sql` INSERT INTO creations (user_id, prompt, content, type) values (${userId}, ${prompt}, ${content}, 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });
    const content = response.choices[0].message.content;
    await sql` INSERT INTO creations (user_id, prompt, content, type) values (${userId}, ${prompt}, ${content}, 'blog-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Requires Premium plan.",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql` INSERT INTO creations (user_id, prompt, content, type, publish) values (${userId}, ${prompt}, ${secure_url}, 'image', ${
      publish ?? false
    })`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Requires Premium plan.",
      });
    }
    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type) values (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const { object } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Requires Premium plan.",
      });
    }
    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
      resource_type: "image",
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type) values (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Requires Premium plan.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, 
    and areas for improvement. Resume Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    const content = response.choices[0].message.content;

    await sql` INSERT INTO creations (user_id, prompt, content, type) values (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// export const codeReview = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { code, language } = req.body;
//     const plan = req.plan;

//     if (plan !== "premium") {
//       return res.json({
//         success: false,
//         message: "Requires Premium plan.",
//       });
//     }

//     if (!code || !language) {
//       return res.status(400).json({
//         success: false,
//         message: "Code and language are required",
//       });
//     }

//     const prompt = `
//       Please review the following ${language} code and provide:
//       1. A list of issues found (categorized by severity)
//       2. A fixed version of the code
//       3. A detailed explanation of the changes made

//       Code to review:
//       \`\`\`${language}
//       ${code}
//       \`\`\`
//     `;

//     // Call AI service
//     const response = await AI.chat.completions.create({
//       model: "gemini-2.0-flash",
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       temperature: 0.2,
//       max_tokens: 2000,
//     });

//     const aiResponse = response.choices[0].message.content;
//     const result = parseAIResponse(aiResponse, language);

//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type)
//       VALUES (${userId}, ${`Code review for ${language} snippet`}, ${JSON.stringify(
//       result
//     )}, 'code-review')
//     `;

//     res.json({
//       success: true,
//       ...result,
//     });
//   } catch (error) {
//     console.error("Code review error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to review code",
//     });
//   }
// };

// // Helper function to parse AI response
// function parseAIResponse(response, language) {

//   const issues = [];
//   let fixedCode = "";
//   let explanation = "";

//   // Extract fixed code (between ```lang and ```)
//   const codeBlockRegex = new RegExp(`\`\`\`${language}([\\s\\S]*?)\`\`\``);
//   const codeMatch = response.match(codeBlockRegex);
//   if (codeMatch) {
//     fixedCode = codeMatch[1].trim();
//   }

//   // Extract explanation (text after "Explanation:" or similar)
//   const explanationMatch = response.match(/explanation:?([\s\S]*)/i);
//   if (explanationMatch) {
//     explanation = explanationMatch[1].trim();
//   }

//   // Simple issue detection (would need to be enhanced based on your AI's output format)
//   if (response.includes("SyntaxError")) {
//     issues.push({
//       type: "Syntax Error",
//       description: "The code contains syntax errors that prevent execution",
//       severity: "high",
//     });
//   }

//   if (response.includes("potential bug")) {
//     issues.push({
//       type: "Potential Bug",
//       description:
//         "The code may contain logical errors or edge cases not handled properly",
//       severity: "medium",
//     });
//   }

//   // Fallback if no issues detected but response is long
//   if (issues.length === 0 && response.length > 300) {
//     issues.push({
//       type: "Code Review",
//       description: "The code was analyzed and suggestions were provided",
//       severity: "info",
//     });
//   }

//   return {
//     issues,
//     fixedCode: fixedCode || response, // Fallback to full response if no code block found
//     explanation,
//   };
// }