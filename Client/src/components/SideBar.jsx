import React,{useState} from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import AddPlaylist from "./AddPlaylist";
// import PlayListCard from "./PlayListCard";
// import { UserData } from "../context/User";
import like_icon from "../assets/like.png"
import { useModeToggle } from "../components/mode-toggle";
import { FiHeart } from "react-icons/fi";
import { GiGuitar } from "react-icons/gi";
import { Heart } from "lucide-react";
const getCurrentMode = () => useModeToggle.getState().currentMode;
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = getCurrentMode();
  const [isPopupOpen, setisPopupOpen] = useState(false) 
  // const [ismodelopen, setismodelopen] = useState(false)

  //   const { user } = UserData();
  return (
    <div className="w-[25%] overflow-auto h-full p-4 flex-col gap-4 text-white hidden lg:flex  ">
      <div className="flex items-center gap-3 pl-4 pt-4 cursor-pointer mb-4  ">
        <GiGuitar className="w-12 h-12" />
        <h2 className={`font-bold text-2xl
          ${theme === "light" ? "text-black" : "text-white"}
          `}>Muzik</h2>

      </div>
      <div className="bg-[#282828] h-[15%] gap-2 p-4 flex flex-col justify-around rounded-2xl">

        <div
          className={`flex items-center gap-2 pl-4 cursor-pointer 
            ${location.pathname === "/" && " text-black bg-white rounded-2xl "}
            `}
          onClick={() => navigate("/")}
        >
          {
            location.pathname === "/" ? (
              <MdHomeFilled className="w-6 h-6 " />
            ) : (
              <img src={assets.home_icon} className="w-6 h-6" alt="" />
            )
          }
          <p className="font-bold p-2" >Home</p>
        </div>
        <div
          className="flex items-center gap-3 pl-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          {/* <img src={assets.search_icon} className="w-6" alt="" />
          <p className="font-bold">Search</p> */}
          <img src={assets.stack_icon} className="w-6" alt="" />
          <p className="font-bold ">Your Library</p>
        </div>
      </div>
      <div className={`p-4  rounded-2xl flex items-center justify-between bg-[#282828] 
      ${location.pathname === "/favourite" && " text-black bg-white rounded-2xl "}
      `}>
        <div className="flex items-center justify-center gap-2 cursor-pointer pl-2"
         onClick={() => navigate("/favourite")}>
          <Heart alt="like"  className={`
            ${location.pathname === "/favourite" ? "text-black" : "text-white w-6 h-6"}`}
            />
          <h2 className="font-bold text-xl">Favouite</h2>
        </div>
        {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" bg-black p-6 rounded-lg shadow-lg w-[300px]">
            <h2 className="text-lg font-bold mb-4">Your Library</h2>
            <input type="text" className="w-full p-2 border text-black border-gray-300 rounded mb-4" />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setisPopupOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
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
             
             <span onClick={() => setisPopupOpen(true)}>Add new Playlist</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 m-2  bg-[#282828] rounded-lg font-semibold flex flex-col items-start justify-start gap-2 pl-6 mt-12 shadow-lg">
        <h1 className="text-3xl font-bold text-white ">Let's find some podcasts to follow</h1>
        <p className="text-lg font-light text-gray-300 mb-4">We'll keep you updated on new episodes</p>
        <button className="px-6 py-2 bg-white text-black text-lg rounded-full mt-4 hover:bg-gray-200 transition duration-300">
          Browse Podcasts
        </button>
      </div>
    </div>
    

  );
};

export default Sidebar;