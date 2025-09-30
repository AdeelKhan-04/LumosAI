
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";


function Navbar() {
  const navigator = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center transition-all duration-300 sm:px-20 xl:px-32 ${
        scrolled ? "py-1 shadow-md" : "py-4"
      }`}
    >
      <img
        src={assets.logo1}
        alt="Logo"
        className={`cursor-pointer transition-all duration-300 ${scrolled ? "w-24 sm:w-32" : "w-32 sm:w-44"}`}
        onClick={() => navigator("/")}
      />

      {user ? (
        <div className="scale-150 my-3 mr-5">
          <UserButton />
        </div>
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-black text-white py-2.5 px-10"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default Navbar;
