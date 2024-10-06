import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
// import { UserData } from "../context/User";
import { LogoutUser } from "../redux/action/auth";
import { useDispatch } from "react-redux";
import { ModeToggle } from "../components/mode-toggle";
import { useModeToggle } from "../components/mode-toggle";
import { useSelector } from "react-redux";
import search from "../assets/search.png";
import { GiGuitar } from "react-icons/gi";
const getCurrentMode = () => useModeToggle.getState().currentMode;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = getCurrentMode();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(LogoutUser())
    navigate("/")
  }
  
  return (
    <>
      {/* <div></div> */}
      <div className={`w-full flex justify-between items-center font-semibold 
       ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}
       py-4`}>
        <div className="flex items-center gap-2 lg:flex">
          <GiGuitar className="w-12 h-12  block lg:hidden" />
          <h1 className="font-bold text-2xl lg:hidden">MuziK </h1>
          {/* src="./logo96.png" */}

        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 hidden md:block rounded-2xl w-[300px] border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img src={search} alt="" className="w-12 cursor-pointer h-12 md:hidden flex" />
          {/* <ModeToggle /> */}
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden lg:block cursor-pointer">
            Explore Premium
          </p>
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden lg:block cursor-pointer">
            Install App
          </p>
          {user ? (
            <div className="flex items-center gap-2">
              <img src={user?.avatar} className="w-12 rounded-full " alt="" />
              <p className="text-white">{user?.username.split(" ")[0]}</p>
              <button onClick={handleLogout} className="bg-white hover:bg-black hover:text-white text-black px-4 py-1 rounded-2xl">Logout</button>
            </div>
          ) : (
            <button
              className="bg-white text-black cursor-pointer px-4 py-1 rounded-2xl"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

        </div>
      </div>

      {/* <div className="flex items-center gap-2 mt-4">
  <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
    All
  </p>
  <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
    Music
  </p>
  <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
    Podcasts
  </p>
  <p
    onClick={() => navigate("/login")}
    className="bg-black px-4 py-1 rounded-2xl cursor-pointer md:hidden"
  >
    PlayList
  </p>
</div> */}
    </>
  );
};

export default Navbar;