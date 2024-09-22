import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
// import PlayListCard from "./PlayListCard";
// import { UserData } from "../context/User";
import { useModeToggle } from "../components/mode-toggle";

const getCurrentMode = () => useModeToggle.getState().currentMode;
const Sidebar = () => {
  const navigate = useNavigate();
  const theme = getCurrentMode();
  // console.log(theme);
  //   const { user } = UserData();
  return (
    <div className="w-[25%] h-full p-4 flex-col gap-4 text-white hidden lg:flex  ">
      <div className="flex items-center gap-3 pl-4 pt-4 cursor-pointer mb-4  ">


        <img src="./public/logo96.png" className="w-12 ml-8" alt="" width={"24px"} height={"24px"} />
        <h2 className={`font-bold text-2xl
          ${theme === "light" ? "text-black" : "text-white"}
          `}>Music studio</h2>
      </div>
      <div className="bg-[#282828] h-[15%] p-4 flex flex-col justify-around rounded-2xl">

        <div
          className="flex items-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={assets.home_icon} className="w-6" alt="" />
          <p className="font-bold" >Home</p>
        </div>
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={assets.search_icon} className="w-6" alt="" />
          <p className="font-bold">Search</p>
        </div>
      </div>
      <div className="p-8 rounded-2xl flex items-center justify-between bg-[#282828] ">
        <div className="flex items-center gap-6">
          <img src={assets.stack_icon} className="w-8" alt="" />
          <p className="font-bold ">Your Library</p>
        </div>

      </div>
      <div className="bg-[#282828] h-[15%] rounded-2xl">

        <div className="flex items-center flex-col  pt-2 pl-8 cursor-pointer ">
          <div className="flex items-center gap-3 ">
            <img src={assets.plus_icon} className="w-6" alt="" />
            <p className="font-bold">Create your first playlist</p>
          </div>
          <br />
          <div className="flex justify-center items-center hover:bg-white hover:text-black p-2 rounded">
            <button className="flex items-center">
              <span>Add new Playlist</span>
            </button>

          </div>

        </div>

      </div>

      <div className="p-4 m-2 bg-[#282828] rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
        <h1>Let's findsome podcasts to follow</h1>
        <p className="font-light">we'll keep you update on new episodes</p>

        <button className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4">
          Browse Podcasts
        </button>
      </div>
    </div>

  );
};

export default Sidebar;