import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', input)
      const { data } = await axios.post(
        "/api/ai/remove-image-background", formData,
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    }
      catch (error){
        toast.error(error.message);
      }
      setLoading(false)
  };
  return (
  <div className="min-h-screen bg-white py-10 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-orange-700 mb-2 drop-shadow-sm flex items-center justify-center gap-2">
          Remove Image Background
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Remove the background from any image instantly. Upload your photo and get a clean, transparent result powered by AI!</p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Upload Form */}
        <form onSubmit={onSubmitHandler} className="p-6 bg-white rounded-2xl border border-orange-200 shadow-lg flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Eraser className="w-6 text-[#ff4938]" />
            <h2 className="text-xl font-bold">Upload Image</h2>
          </div>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="image/*"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-orange-300 focus:border-orange-400 text-gray-700 bg-white"
            required
          />
          <p className="text-xs text-orange-400 font-light mt-1">Supports JPG, PNG, and other image formats</p>
          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#f6ab41] to-[#ff4938] text-white px-4 py-2 mt-8 text-sm rounded-lg cursor-pointer font-semibold shadow hover:scale-105 transition-transform duration-200"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Eraser className="w-5" />
            )}
            Remove Background
          </button>
        </form>

        {/* Right: Output Card */}
        <div className="p-6 bg-white rounded-2xl border border-orange-200 shadow-lg flex flex-col min-h-[350px] max-h-[600px]">
          <div className="flex items-center gap-3 mb-4">
            <Eraser className="w-6 text-[#ff4938]" />
            <h2 className="text-xl font-bold">Result</h2>
          </div>
          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-orange-200">
              <Eraser className="w-10 h-10 mb-2" />
              <p>Upload an image and click <span className="font-semibold text-orange-500">Remove Background</span> to get started.</p>
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll w-full flex justify-center items-center">
              <img src={content} alt="Processed" className="rounded-xl max-h-[400px] w-auto shadow-lg border border-orange-100 bg-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;