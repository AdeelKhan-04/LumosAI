import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function AiTools() {
  const naviagte = useNavigate();
  const { user } = useUser();

  return (
    <div id="ai-tools-section" className="px-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center mb-10">
        <div className="flex flex-col items-center">
          <span className="block w-16 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 mb-4"></span>
          <h2 id="ai-tools-header" className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-2 drop-shadow">
            Powerful AI Tools
          </h2>
        </div>
        <p className="text-gray-600 max-w-xl mx-auto text-lg font-medium mt-2">
          Everything you need to create, enhance, and optimize your content with <span className="text-blue-600 font-semibold">cutting-edge AI technology</span>.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {AiToolsData.map((tool, idx) => (
          <div
            key={idx}
            className="p-6 flex-1 min-w-[260px] max-w-[300px] rounded-xl bg-white/80 shadow-xl border border-gray-200 transition-all duration-300 cursor-pointer flex flex-col items-center m-2 group hover:scale-105 hover:-rotate-2 hover:shadow-2xl hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50"
            style={{ flexBasis: '30%' }}
            onClick={() => user && naviagte(tool.path)}
          >
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl group-hover:shadow-lg group-hover:scale-110 transition-all duration-300"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold group-hover:text-blue-700 transition-colors duration-300">{tool.title}</h3>
            <p className="text-gray-400 text-sm max-w-[95%] group-hover:text-gray-600 transition-colors duration-300">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AiTools;
