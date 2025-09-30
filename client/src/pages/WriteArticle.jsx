import { Edit, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from 'axios'
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {

  const articleLength =[
    {length:800, text:'Short (500-800 words)'},
    {length:1200, text:'Medium (800-1200 words)'},
    {length:1600, text:'Long (1200+)'},
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const[content, setContent] = useState('')

  const {getToken} = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const {data} = await axios.post('/api/ai/generate-article', {prompt, length:selectedLength.length}, {
        headers: {Authorization: `Bearer ${await getToken()}`}
      })
      if(data.success){
        setContent(data.content)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }
  return (
    <div className="min-h-screen bg-white py-10 px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2 drop-shadow-sm flex items-center justify-center gap-2">
          <Sparkles className="w-8 text-[#4A7AFF] animate-pulse" />
          AI Article Writer
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Generate high-quality, engaging articles on any topic in seconds. Configure your article and let AI do the writing!</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">1</span>
          <span className="font-medium text-blue-700">Configure</span>
        </div>
        <span className="w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">2</span>
          <span className="font-medium text-purple-700">Generate</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Config Form */}
        <form onSubmit={onSubmitHandler} className="p-6 bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Edit className="w-6 text-blue-500" />
            <h2 className="text-xl font-bold">Article Configuration</h2>
          </div>
          <label className="mt-2 text-sm font-semibold">Article Topic</label>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 focus:border-blue-400"
            placeholder="The future of artificial intelligence is..."
            required
          />
          <label className="mt-4 text-sm font-semibold">Article Length</label>
          <div className="mt-3 flex gap-3 flex-wrap">
            {articleLength.map((item, index) => (
              <span
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-colors duration-200 ${selectedLength.text === item.text ? 'bg-blue-100 text-blue-700 border-blue-400' : 'text-gray-500 border-gray-300 hover:bg-blue-50'}`}
                key={index}
              >
                {item.text}
              </span>
            ))}
          </div>
          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-2 mt-8 text-sm rounded-lg cursor-pointer font-semibold shadow hover:scale-105 transition-transform duration-200"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Edit className="w-5" />
            )}
            Generate Article
          </button>
        </form>

        {/* Right: Output */}
        <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col min-h-[350px] max-h-[600px]">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 text-purple-500" />
            <h2 className="text-xl font-bold">Generated Article</h2>
          </div>
          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-400">
              <Edit className="w-10 h-10 mb-2" />
              <p>Enter a topic and click <span className="font-semibold text-blue-500">Generate Article</span> to get started.</p>
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;