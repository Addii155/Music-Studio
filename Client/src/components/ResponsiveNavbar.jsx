import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GiGuitar } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { Heart } from "lucide-react";
import { assets } from "../assets/assets";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../components/ui/sheet";
// import { useModeToggle } from "../components/mode-toggle";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser, LogoutUser } from "../redux/action/auth";
import { GoogleLogin } from "@react-oauth/google";
// const getCurrentMode = () => useModeToggle.getState().currentMode;

const ResponsiveNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = "dark"
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCreatingPlaylist(false);
  };

  const handleCreatePlaylist = () => {
    setIsCreatingPlaylist(true);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      dispatch(LogoutUser());
      toast.success("Logout successful!");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed!");
      console.error("Logout error:", err);
    }
  };
  const submitHandler = (token) => {
    setIsCreatingPlaylist(false);
    setIsMenuOpen(false);
    if (token?.credential) {
      dispatch(LoginUser(token.credential));
    } else {
      toast.error("Login failed! No credential found.");
    }
  };
  return (
    <div
      className={`w-full mb-2 flex justify-between items-center font-semibold ${
        theme === "light" ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div
        className="flex items-center gap-2 lg:flex cursor-pointer"
        onClick={() =>{ navigate("/")
        }}
      >
        <GiGuitar className="w-12 h-12 block lg:hidden" />
        <h1 className="font-bold text-2xl lg:hidden">MuziK</h1>
      </div>
      <div className="lg:hidden flex items-center gap-4">
      {user && (
        <div className="flex items-center gap-4">
          <h2>{user.username.split(" ")[0]}</h2>
          <p className="hidden lg:block">{user?.name}</p>
        </div>
      )}
        <FaBars
          onClick={handleMenuToggle}
          className="text-white w-8 h-8 cursor-pointer"
        />
      </div>

      <Sheet
        open={isMenuOpen || isCreatingPlaylist}
        onOpenChange={setIsMenuOpen}
      >
        <SheetContent side="left" className="bg-[#282828] text-white">
          <SheetHeader>
            <SheetTitle>
              {isCreatingPlaylist ? "Create Playlist" : "Menu"}
            </SheetTitle>
            {isCreatingPlaylist && (
              <SheetDescription>
                Fill out the details to create a new playlist.
              </SheetDescription>
            )}
          </SheetHeader>

          {!isCreatingPlaylist ? (
            <div className="flex flex-col gap-4">
              {/* Home Link */}
              <div
                className={`flex items-center gap-2 pl-4 cursor-pointer ${
                  location.pathname === "/" && "text-black bg-white rounded-2xl"
                }`}
                onClick={() => {navigate("/")
                  setIsMenuOpen(false)
                }}
              >
                <MdHomeFilled className="w-6 h-6" />
                <p className="font-bold p-2">Home</p>
              </div>

              {/* Your Library Link */}
              {/* <div
                className="flex items-center gap-3 pl-4 cursor-pointer"
                onClick={() => {navigate("/library")
                  setIsMenuOpen(false)
                }}
              >
                <img src={assets.stack_icon} className="w-6" alt="" />
                <p className="font-bold">Your Library</p>
              </div> */}

              <div
                className={`flex items-center gap-3 pl-4 cursor-pointer ${
                  location.pathname === "/favourite" &&
                  "text-black bg-white rounded-2xl"
                }`}
                onClick={() =>{ navigate("/favourite")
                  setIsMenuOpen(false)
                }}
              >
                <Heart className="w-6 h-6" />
                <p className="font-bold text-xl">Favourite</p>
              </div>

              <div
                className="flex items-center gap-3 pl-4 cursor-pointer bg-blue-600 py-2 rounded-xl"
                onClick={handleCreatePlaylist}
              >
                <img src={assets.plus_icon} className="w-6 h-6" alt="plus" />
                <p className="font-bold">Create Playlist</p>
              </div>
              {user ? (
                <div className="flex items-center my-2 text-xl hover:text-slate-300 justify-center  items-center  cursor-pointer">
                  <button
                    onClick={handleLogout}
                    className="text-black bg-white rounded-2xl px-6"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center my-2 text-xl  hover:text-slate-300   cursor-pointer">
                  <button className="text-black bg-white rounded-2xl px-6">
                    <GoogleLogin onSuccess={(token) => submitHandler(token)} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4">
              <input
                type="text"
                placeholder="Enter Playlist Name"
                className="w-full p-2 border text-black border-gray-300 rounded mb-4"
              />
              <button
                className="px-4 py-2 bg-blue-500  text-white rounded hover:bg-blue-600"
                onClick={() => setIsCreatingPlaylist(false)}
              >
                Create Playlist
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ResponsiveNavbar;
