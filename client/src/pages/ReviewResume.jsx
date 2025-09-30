import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
  
    const { getToken } = useAuth();
    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        setLoading(true)


      const formData = new FormData()
      formData.append('resume', input)

      const { data } = await axios.post(
        "/api/ai/resume-review", formData,
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
    <div className="min-h-screen bg-white py-10 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl mb-10 text-left">
        <h1 className="text-4xl font-extrabold text-emerald-700 mb-2 drop-shadow-sm flex items-center justify-start gap-2">
          <FileText className="w-8 h-8 text-[#00da83]" />
          Resume Review
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl">Upload your PDF resume and get instant, AI-powered feedback and analysis to help you stand out!</p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Upload Form */}
        <form onSubmit={onSubmitHandler} className="p-6 bg-white rounded-2xl border border-emerald-200 shadow-lg flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 text-[#00da83]" />
            <h2 className="text-xl font-bold">Upload Resume</h2>
          </div>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="application/pdf"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-emerald-300 focus:border-emerald-400 text-gray-700 bg-white"
            required
          />
          <p className="text-xs text-emerald-400 font-light mt-1">Supports PDF resume only</p>
          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00da83] to-[#009bb3] text-white px-4 py-2 mt-8 text-sm rounded-lg cursor-pointer font-semibold shadow hover:scale-105 transition-transform duration-200"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <FileText className="w-5" />
            )}
            Review Resume
          </button>
        </form>

        {/* Right: Output Card */}
        <div className="p-6 bg-white rounded-2xl border border-emerald-200 shadow-lg flex flex-col min-h-[350px] max-h-[600px]">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 text-[#00da83]" />
            <h2 className="text-xl font-bold">Analysis Results</h2>
          </div>
          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-emerald-200">
              <FileText className="w-10 h-10 mb-2" />
              <p>Upload a resume and click <span className="font-semibold text-emerald-500">Review Resume</span> to get started.</p>
            </div>
          ) : (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
              <div className='reset-tw'>
                <Markdown >
                  {content}
                </Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewResume