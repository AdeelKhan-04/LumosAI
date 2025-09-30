import { useAuth } from "@clerk/clerk-react";
import { Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
  <div className="h-screen w-full bg-white flex flex-col items-center py-10 px-2">
      {/* Header */}
      <div className="w-full max-w-3xl mb-8 text-center">
        <p className="text-[#c341f6] text-base font-semibold mb-1">AI-Powered Tool</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800 mb-3 drop-shadow flex items-center justify-center gap-2">

          Blog Title Generator
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Get creative, catchy blog titles instantly. Choose a category, enter your keyword, and let AI inspire your next post!</p>
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Sidebar: Categories */}
        <div className="md:w-1/4 w-full bg-white rounded-2xl shadow-lg border border-purple-100 p-6 flex flex-col items-center">
          <h2 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2"><Sparkles className="w-5 text-[#c341f6]" />Categories</h2>
          <div className="flex flex-wrap md:flex-col gap-2 w-full justify-center">
            {blogCategories.map((item) => (
              <button
                type="button"
                onClick={() => setSelectedCategory(item)}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors duration-200 border-2 ${selectedCategory === item ? 'bg-gradient-to-r from-[#c341f6] to-[#8e37eb] text-white border-[#c341f6]' : 'bg-white text-purple-700 border-purple-100 hover:bg-purple-50'}`}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Main Card: Input + Output */}
        <div className="flex-1 flex flex-col gap-6">
          <form
            onSubmit={onSubmitHandler}
            className="w-full p-6 bg-white rounded-2xl border border-purple-100 shadow-lg flex flex-col mb-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <Hash className="w-6 text-[#c341f6]" />
              <h2 className="text-xl font-bold">Enter Your Keyword</h2>
            </div>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-purple-200 focus:border-[#c341f6]"
              placeholder="e.g. The future of artificial intelligence"
              required
            />
            <button
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#c341f6] to-[#8e37eb] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer font-semibold shadow hover:scale-105 transition-transform duration-200"
            >
              {loading ? (
                <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              ) : (
                <Sparkles className="w-5" />
              )}
              Generate Title
            </button>
          </form>

          <div className="w-full p-6 bg-white rounded-2xl border border-purple-100 shadow-lg flex flex-col min-h-[200px] flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Hash className="w-6 h-6 text-[#c341f6]" />
              <h2 className="text-xl font-bold">Generated Titles</h2>
            </div>
            {!content ? (
              <div className="flex-1 flex flex-col justify-center items-center text-gray-400">
                <Hash className="w-10 h-10 mb-2" />
                <p>Enter a keyword and click <span className="font-semibold text-purple-500">Generate Title</span> to get started.</p>
              </div>
            ) : (
              <div className="mt-3 h-full overflow-y-auto text-base text-slate-700">
                <div className="reset-tw">
                  <Markdown>{content}</Markdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;