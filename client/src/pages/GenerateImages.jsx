import { Image, Sparkles } from "lucide-react";
import React, { useState } from "react";

import toast from "react-hot-toast";

import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)

      const prompt = ` Generate a image of ${input} in the style ${selectedStyle}`

      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt,publish },
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
    setLoading(false)
  };
  return (
    <div className="w-full min-h-screen bg-white py-10 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-green-700 mb-2 drop-shadow flex items-center justify-center gap-2">
          AI Image Generator
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Describe your vision, pick a style, and let AI create a unique image for you. Share your creation with the world!</p>
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Left: Input Card */}
        <form
          onSubmit={onSubmitHandler}
          className="md:w-1/2 w-full p-6 bg-white rounded-2xl border border-green-100 shadow-lg flex flex-col gap-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 text-[#00ad25]" />
            <h2 className="text-xl font-bold">Describe Your Image</h2>
          </div>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={4}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-green-200 focus:border-[#00ad25]"
            placeholder="Describe what you want to see in your image..."
            required
          />
          <div>
            <label className="text-sm font-semibold">Style</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {imageStyle.map((item) => (
                <button
                  type="button"
                  onClick={() => setSelectedStyle(item)}
                  className={`text-xs px-4 py-1 border-2 rounded-full cursor-pointer font-medium transition-colors duration-200 ${selectedStyle === item ? 'bg-gradient-to-r from-[#00ad25] to-[#04ff50] text-white border-[#00ad25]' : 'text-green-700 border-green-100 hover:bg-green-50'}`}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <label className="relative cursor-pointer">
              <input type="checkbox" onChange={(e) => setPublish(e.target.checked)} checked={publish} className="sr-only peer" />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
            </label>
            <p className="text-sm">Make this image Public</p>
          </div>
          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00ad25] to-[#04ff50] text-white px-4 py-2 mt-4 text-sm rounded-lg cursor-pointer font-semibold shadow hover:scale-105 transition-transform duration-200"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Image className="w-5" />
            )}
            Generate Image
          </button>
        </form>

        {/* Right: Output Card */}
        <div className="md:w-1/2 w-full p-6 bg-gray-50 rounded-2xl border border-green-100 shadow flex flex-col min-h-[300px] items-center justify-center">
          <div className="flex items-center gap-3 mb-4">
            <Image className="w-6 h-6 text-[#00ad25]" />
            <h2 className="text-xl font-bold">Generated Image</h2>
          </div>
          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-400">
              <Image className="w-10 h-10 mb-2" />
              <p>Describe your image and click <span className="font-semibold text-green-600">Generate Image</span> to get started.</p>
            </div>
          ) : (
            <div className="mt-3 w-full flex justify-center items-center">
              <img src={content} alt="Generated" className="rounded-xl max-h-[400px] w-auto shadow-lg border border-green-100 bg-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;