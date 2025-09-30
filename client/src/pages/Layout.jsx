import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../component/Sidebar";
import { useUser, SignIn } from "@clerk/clerk-react";

function Layout() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const {user} = useUser();


  return user ?  (
    <div className="flex flex-col items-start justify-start h-screen">
  <nav className="w-full px-0 min-h-14 flex items-center justify-between border-b border-gray-200 sticky top-0 z-40 bg-white/90 backdrop-blur-xl cursor-pointer">
        <img src={assets.logo1} alt="" className="w-32 sm:w-36 h-auto ml-10" onClick={() => navigate("/")} />
        <div className="sm:hidden pr-4 flex items-center h-full mr-2">
          {sidebar ? (
            <X
              onClick={() => setSidebar(false)}
              className="w-8 h-8 text-gray-600 cursor-pointer"
              style={{ minHeight: '100vh' }}
            />
          ) : (
            <Menu
              onClick={() => setSidebar(true)}
              className="w-8 h-8 text-gray-600 cursor-pointer"
              style={{ minHeight: '100vh' }}
            />
          )}
        </div>
      </nav>
      <div className="flex-1 w-full flex h-[calc(100vh-64px)] relative">
        {/* Overlay for mobile sidebar */}
        {sidebar && (
          <div
            className="fixed inset-0 bg-black/30 z-30 sm:hidden"
            onClick={() => setSidebar(false)}
          />
        )}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-[#F4F7FB]">
          <Outlet />
        </div>
      </div>

    </div>
  ) : <div className="flex items-center justify-center h-screen">
    <SignIn/>
  </div>
}

export default Layout;
