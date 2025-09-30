import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Scissors,
  SquarePen,
  User,
  Image as ImageIcon,
  LogOut,
  X,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-image", label: "Generate Image", Icon: ImageIcon },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: User },
];

function Sidebar({ sidebar, setSidebar }) {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`
        w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center
        max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:w-full max-sm:h-full max-sm:z-50
        ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
        transition-all duration-300 ease-in-out
      `}
    >
      {/* Mobile Close (X) Icon */}
      <div className="sm:hidden w-full flex justify-end p-4 absolute top-0 right-0 z-50">
        <X className="w-8 h-8 text-gray-700 cursor-pointer" onClick={() => setSidebar(false)} />
      </div>
  <div className="my-7 w-full pt-10 sm:pt-0">
        <img src={user.imageUrl} className="w-13 rounded-full mx-auto" alt="" />
        <h1 className="mt-1 text-center">{user.fullName}</h1>
        <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                  isActive
                    ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white"
                    : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center justify-between"
        >
          <img
            src={user.imageUrl}
            className="w-8 rounded-full cursor-pointer"
            alt=""
          />
          <div className="cursor-pointer">
            <h1 className="text-sm font-medium">{user.fullName}</h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">
                Premium Plan
              </Protect>
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Sidebar;
