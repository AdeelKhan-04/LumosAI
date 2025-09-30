import { Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)

      if(object.split(' ').length > 1){
        return toast('Please enter only one object name')
      }

      const formData = new FormData()
      formData.append('image', input)
      formData.append('object', object)

      const { data } = await axios.post(
        "/api/ai/remove-image-object", formData,
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white py-12 px-2">
      {/* Header (like Write Article) */}
      <div className="w-full max-w-4xl mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow-sm flex items-center justify-center gap-2">
          Remove Object from Image
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Remove any single object from your image in seconds. Upload your photo, enter the object name, and let AI do the rest!</p>
      </div>

      {/* Stepper Layout */}
      <div className="w-full max-w-md flex flex-col gap-8 items-center">
        {/* Step 1: Upload */}
        <div className="w-full bg-white rounded-2xl border border-blue-200 shadow-lg flex flex-col items-center p-6 relative">
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg shadow">1</span>
          <div className="flex items-center gap-3 mb-2 mt-2">
            <Scissors className="w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-bold text-blue-700">Upload Image</h2>
          </div>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="image/*"
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-blue-200 text-blue-900 bg-blue-50"
            required
          />
          <p className="text-xs text-blue-400 font-light mt-1">Supports JPG, PNG, and other image formats</p>
        </div>

        {/* Step 2: Object Name */}
        <div className="w-full bg-white rounded-2xl border border-violet-200 shadow-lg flex flex-col items-center p-6 relative">
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-violet-500 text-white font-bold text-lg shadow">2</span>
          <div className="flex items-center gap-3 mb-2 mt-2">
            <Scissors className="w-6 h-6 text-violet-500" />
            <h2 className="text-lg font-bold text-violet-700">Object to Remove</h2>
          </div>
          <textarea
            onChange={(e) => setObject(e.target.value)}
            value={object}
            rows={2}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-violet-200 text-violet-900 bg-violet-50"
            placeholder="e.g., watch or spoon (single object name)"
            required
          />
        </div>

        {/* Step 3: Action Button */}
        <form onSubmit={onSubmitHandler} className="w-full flex flex-col items-center">
          <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white px-4 py-2 mt-2 text-sm rounded-lg cursor-pointer font-semibold shadow hover:scale-105 transition-transform duration-200">
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Scissors className="w-5" />
            )}
            Remove Object
          </button>
        </form>

        {/* Step 4: Output Card */}
        <div className="w-full bg-white rounded-2xl border border-violet-200 shadow-lg flex flex-col items-center min-h-[200px] p-6 mt-2">
          <div className="flex items-center gap-3 mb-4">
            <Scissors className="w-6 h-6 text-violet-500" />
            <h2 className="text-lg font-bold text-violet-700">Result</h2>
          </div>
          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-violet-200">
              <Scissors className="w-10 h-10 mb-2" />
              <p>Upload an image, enter an object, and click <span className="font-semibold text-violet-500">Remove Object</span> to get started.</p>
            </div>
          ) : (
            <div className="mt-3 w-full flex justify-center items-center">
              <img src={content} alt="Processed" className="rounded-xl max-h-[250px] w-auto shadow border border-violet-100 bg-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;