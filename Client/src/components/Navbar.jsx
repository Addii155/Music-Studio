import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
// import { UserData } from "../context/User";
import { LogoutUser } from "../redux/action/auth";
import { useDispatch } from "react-redux";
import {ModeToggle} from "../components/mode-toggle";
import { useModeToggle } from "../components/mode-toggle";

const getCurrentMode = () => useModeToggle.getState().currentMode;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme= getCurrentMode();
 
  const handleLogout = () => {
    dispatch(LogoutUser())
    navigate("/")
  }
  return (
    <>
      <div className={`w-full flex justify-between items-center font-semibold 
       ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}
       px-8 py-4`}>
       <div className="flex items-center gap-2 lg:flex">
       <img
          src="./public/logo96.png"
          className="w-12 ml-8 block lg:hidden"
          alt="Logo"
          width="24px"
          height="24px"
        />
  <img
    src={assets.arrow_left}
    className="w-8 bg-black p-2 rounded-2xl cursor-pointer hidden lg:block"
    alt=""
    onClick={() => navigate(-1)}
  />
  <img
    src={assets.arrow_right}
    className="w-8 bg-black p-2 rounded-2xl cursor-pointer hidden lg:block"
    alt=""
    onClick={() => navigate(+1)}
  />
</div>
      
        <div className="flex items-center gap-4">
        {/* <ModeToggle    /> */}
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Install App
          </p>
          <p
            className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
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
          className="bg-black px-4 py-1 rounded-2xl cursor-pointer  md:hidden"
        >
          PlayList
        </p>
      </div>
    </>
  );
};

export default Navbar;