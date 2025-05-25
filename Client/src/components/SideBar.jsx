import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { GiGuitar } from "react-icons/gi";
import { Heart } from "lucide-react";
import { FaBars } from "react-icons/fa";
import axios from "axios";

// const getCurrentMode = () => useModeToggle.getState().currentMode;

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const theme = "dark";
  const [newPlaylist, setNewPlaylist] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNewPlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylist) {
      return toast.error("Playlist name is required!");
    }

    if (!user) {
      return toast.error("You need to login first!");
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error(
          "You are not authorized to create a playlist. Please log in."
        );
        return;
      }

      const response = await axios.post(
        "https://muzik-drab.vercel.app/api/v1/create/playlist",
        { name: newPlaylist },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response && response.data) {
        setNewPlaylist("");
        toast.success(response.data.msg || "Playlist created successfully!");
      } else {
        toast.error("Something went wrong, please try again!");
      }
    } catch (error) {
      console.error("Playlist creation failed:", error);
      toast.error("Playlist creation failed! Please try again later.");
    }
  };

  return (
    <>
      <div className="w-[25%] overflow-auto h-full bg-black p-4 flex-col gap-4 text-white hidden lg:flex">
        <div className="flex items-center gap-3 pl-4 pt-4 cursor-pointer mb-4">
          <GiGuitar className="w-12 h-12" />
          <h2
            className={`font-bold text-2xl ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Muzik
          </h2>
        </div>

        <div className="bg-[#282828] h-[15%] gap-2 p-4 flex flex-col justify-around rounded-2xl">
          <div
            className={`flex items-center gap-2 pl-4 cursor-pointer ${
              location.pathname === "/" && "text-black bg-white rounded-2xl"
            }`}
            onClick={() => navigate("/")}
          >
            {location.pathname === "/" ? (
              <MdHomeFilled className="w-6 h-6" />
            ) : (
              <img src={assets.home_icon} className="w-6 h-6" alt="" />
            )}
            <p className="font-bold p-2">Home</p>
          </div>
          <div
            className={`flex items-center gap-2 pl-4 cursor-pointer ${
              location.pathname === "/playlist" &&
              "text-black bg-white rounded-2xl"
            }`}
            onClick={() => navigate("/playlist")}
          >
            {location.pathname === "/" ? (
              <MdHomeFilled className="w-6 h-6" />
            ) : (
              <img
                src={assets.stack_icon}
                className={`w-6 h-6 
                ${location.pathname === "/playlist" ? "bg-black" : "text-white"}
                `}
                alt=""
              />
            )}
            <p className="font-bold mb-2">Playlist</p>
          </div>
          {/* <div
            className="flex items-center gap-2 pl-4 cursor-pointer"
            onClick={() => navigate("/playlist")}
          >
            {
              location.pathname === "/playlist" ? (
                <div className="flex items-center w-full   bg-white rounded-2xl text-black gap-2">
                  <img src={assets.stack_icon} className="w-6  bg-black" alt="" />
                  <p className="font-bold w-full py-2 ">
                    Your Library
                  </p>
                </div>
              ) : (
                <>
                  <img src={assets.stack_icon} className="w-6 h-6" alt="" />
                  <p className="font-bold">Your Library</p>
                </>
              )
              //  <img src={assets.stack_icon} className="w-6" alt="" />
            }
          </div> */}
        </div>

        <div
          className={`p-4 rounded-2xl flex items-center justify-between bg-[#282828] ${
            location.pathname === "/favourite" &&
            "text-black bg-white rounded-2xl"
          }`}
        >
          <div
            className="flex items-center justify-center gap-2 cursor-pointer pl-2"
            onClick={() => navigate("/favourite")}
          >
            <Heart
              alt="like"
              className={`${
                location.pathname === "/favourite"
                  ? "text-black"
                  : "text-white w-6 h-6"
              }`}
            />
            <h2 className="font-bold text-xl">Favourite</h2>
          </div>
        </div>

        {/* Add Playlist Section */}
        <div className="bg-[#282828] h-[15%] rounded-2xl">
          <div className="flex items-center flex-col cursor-pointer p-4 bg-[#282828] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4">
              <img src={assets.plus_icon} className="w-8 h-8" alt="Plus Icon" />
              <p className="font-bold text-lg text-white">
                Create your first playlist
              </p>
            </div>
            <div className="flex justify-center items-center w-full">
              <Sheet>
                <SheetTrigger>
                  <button className="flex items-center justify-center w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300">
                    Add new Playlist
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-[#282828] text-white">
                  <SheetHeader>
                    <SheetTitle>Create Playlist</SheetTitle>
                    <SheetDescription>
                      Fill out the details to create a new playlist.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="p-4">
                    <form action="" onSubmit={handleNewPlaylist}>
                      <input
                        type="text"
                        placeholder="Enter Playlist Name"
                        className="w-full p-2 border text-black border-gray-300 rounded mb-4"
                        value={newPlaylist}
                        onChange={(e) => setNewPlaylist(e.target.value)}
                      />
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        type="submit"
                      >
                        Create Playlist
                      </button>
                    </form>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="p-6 m-2 bg-[#282828] rounded-lg font-semibold flex flex-col items-start justify-start gap-2 pl-6 mt-12 shadow-lg">
          <h1 className="text-3xl font-bold text-white">
            Let's find some podcasts to follow
          </h1>
          <p className="text-lg font-light text-gray-300 mb-4">
            We'll keep you updated on new episodes
          </p>
          <button className="px-6 py-2 bg-white text-black text-lg rounded-full mt-4 hover:bg-gray-200 transition duration-300">
            Browse Podcasts
          </button>
        </div>
      </div>
      <div className="lg:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetContent side="left" className="bg-[#282828] text-white">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4">
              <div
                className={`flex items-center gap-2 pl-4 cursor-pointer ${
                  location.pathname === "/" && "text-black bg-white rounded-2xl"
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/");
                }}
              >
                {location.pathname === "/" ? (
                  <MdHomeFilled className="w-6 h-6" />
                ) : (
                  <img src={assets.home_icon} className="w-6 h-6" alt="" />
                )}
                <p className="font-bold p-2">Home</p>
              </div>
              <div
                className="flex items-center gap-3 pl-4 cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/favourite");
                }}
              >
                <Heart alt="like" className="w-6 h-6 text-white" />
                <p className="font-bold text-xl">Favourite</p>
              </div>
              <div
                className="flex items-center gap-3 pl-4 cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/library");
                }}
              >
                <img src={assets.stack_icon} className="w-6" alt="" />
                <p className="font-bold">Your Library</p>
              </div>
              <div
                className="flex items-center gap-3 pl-4 cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/create-playlist");
                }}
              >
                <img src={assets.plus_icon} className="w-6 h-6" alt="plus" />
                <p className="font-bold">Create Playlist</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
