import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
// import { assets } from "../assets/assets";

function Hero() {
  const naviagte = useNavigate();
  const handleScrollToFeatures = useCallback(() => {
    const header = document.getElementById("ai-tools-header");
    if (header) {
      header.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[url('/gradientBackground.png')] bg-cover bg-no-repeat py-32 px-2 sm:px-8 md:px-16 lg:px-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-6xl md:text-6xl font-extrabold mx-auto leading-tight drop-shadow-lg">
          Turn Imagination Into Reality <br />
          with <span className="text-primary bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">AI-Powered Creation</span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg text-gray-500">
          Bring your ideas to life in seconds. Generate content, images, and more—effortlessly. Discover the future of creativity and productivity, all in one place.
        </p>
      </div>

      <div className="flex gap-4 justify-center mt-8">
        <button
          onClick={() => naviagte("/ai")}
          className="px-8 py-3 rounded-xl font-semibold text-base sm:text-lg bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 text-white shadow-lg backdrop-blur-md border border-white/30 hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        >
          <span className="inline-block drop-shadow">Start Your Journey</span>
        </button>
        <button
          onClick={handleScrollToFeatures}
          className="px-8 py-3 rounded-xl font-semibold text-base sm:text-lg bg-white/80 text-blue-700 shadow-lg border border-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        >
          <span className="inline-block drop-shadow">Explore Features</span>
        </button>
      </div>
      <div className="flex items-center gap-3 mt-10 mx-auto text-gray-500 text-base font-medium bg-white/60 rounded-full px-6 py-2 shadow">
        <img src={assets.user_group} alt="" className="h-8" />
        Trusted by <span className="font-bold text-primary">10k+</span> people
      </div>
    </div>
  );
}

export default Hero;
