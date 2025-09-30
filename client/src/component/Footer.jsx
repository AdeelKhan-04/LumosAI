import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-around w-full py-12 text-sm bg-slate-50 text-gray-800/80 border-t border-gray-200">
  {/* Logo */}
  <img src={assets.logo1} alt="AI SaaS Logo" className="mb-2 h-28 w-auto" />
      <p className="mt-2 text-center text-base font-medium">
  Copyright © 2025 <a href="https://github.com/notramm" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-600 hover:underline">Ram Muduli</a>. All rights reserved.
      </p>
      <div className="flex items-center gap-4 mt-6">
        <a
          href="/privacy"
          className="font-medium text-gray-800 hover:text-indigo-600 transition-all"
        >
          Privacy Policy
        </a>
        <div className="h-4 w-px bg-black/20"></div>
        <a
          href="/terms"
          className="font-medium text-gray-800 hover:text-indigo-600 transition-all"
        >
          Terms of Service
        </a>
      </div>
      <p className="mt-4 text-xs text-gray-400">Empowering your business with AI-driven solutions.</p>
    </footer>
  );
}

export default Footer;
