import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
// import PlayListCard from "./PlayListCard";
// import { UserData } from "../context/User";
import like_icon from "../assets/like.png"
import { useModeToggle } from "../components/mode-toggle";
import { FiHeart } from "react-icons/fi";

const getCurrentMode = () => useModeToggle.getState().currentMode;
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = getCurrentMode();

  //   const { user } = UserData();
  return (
    <div className="w-[25%] h-full p-4 flex-col gap-4 text-white hidden lg:flex  ">
      <div className="flex items-center gap-3 pl-4 pt-4 cursor-pointer mb-4  ">
        <img src="./public/logo96.png" className="w-12 ml-8" alt="" width={"24px"} height={"24px"} />
        <h2 className={`font-bold text-2xl
          ${theme === "light" ? "text-black" : "text-white"}
          `}>Music studio</h2>
      </div>
      <div className="bg-[#282828] h-[15%] gap-2 p-4 flex flex-col justify-around rounded-2xl">

        <div
          className={`flex items-center gap-4 pl-8 cursor-pointer 
            ${location.pathname === "/" && " text-black bg-white rounded-2xl p-2"}
            `}
          onClick={() => navigate("/")}
        >
          {
            location.pathname === "/" ? (
              <MdHomeFilled className="w-6 h-6 " />
            ) : (
              <img src={assets.home_icon} className="w-6" alt="" />
            )
          }
          <p className="font-bold" >Home</p>
        </div>
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          {/* <img src={assets.search_icon} className="w-6" alt="" />
          <p className="font-bold">Search</p> */}
          <img src={assets.stack_icon} className="w-8" alt="" />
          <p className="font-bold ">Your Library</p>
        </div>
      </div>
      <div className="p-8 rounded-2xl flex items-center justify-between bg-[#282828] ">
        <div className="flex items-center justify-center gap-4">
          <img src={like_icon} alt="like" width={"24px"} height={"24px"} />
          <h2 className="font-bold text-xl">Favouite</h2>
        </div>
      </div>
      {/* <div className="bg-[#282828] flex items-center justify-center h-[15%] rounded-2xl hover:bg-slate-800 cursor-pointer onClick:bg-[#282828]">
        </div> */}
      <div className="bg-[#282828] h-[15%] rounded-2xl">

        <div className="flex items-center flex-col cursor-pointer p-4 bg-[#282828] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <img src={assets.plus_icon} className="w-8 h-8" alt="Plus Icon" />
            <p className="font-bold text-lg text-white">Create your first playlist</p>
          </div>
          <div className="flex justify-center items-center w-full">
            <button className="flex items-center justify-center w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300">
              <span>Add new Playlist</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 m-2 bg-[#282828] rounded-lg font-semibold flex flex-col items-start justify-start gap-2 pl-6 mt-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-2">Let's find some podcasts to follow</h1>
        <p className="text-lg font-light text-gray-300 mb-4">We'll keep you updated on new episodes</p>
        <button className="px-6 py-2 bg-white text-black text-lg rounded-full mt-4 hover:bg-gray-200 transition duration-300">
          Browse Podcasts
        </button>
      </div>
    </div>

  );
};

export default Sidebar;