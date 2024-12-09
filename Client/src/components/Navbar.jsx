import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../redux/action/auth";
import { useModeToggle } from "../components/mode-toggle";
import { GiGuitar } from "react-icons/gi";
import search from "../assets/search.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useModeToggle().currentMode;
  const { user, error } = useSelector((state) => state.auth);
  
  const handleLogout = async () => {
    try {
      await dispatch(LogoutUser());
      toast.success("Logout successful!");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed!");
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    if (!user && error === null) {
      toast.success("Logout successful!");
      navigate("/");
    } else if (error) {
      console.error("Something went wrong:", error);
      toast.error(error);
    }
  }, [user, error, navigate]);

  const themeClasses = theme === "light" ? "bg-white text-black" : "bg-black text-white";

  return (
    <>
      <div className={`w-full mb-2 flex justify-between items-center font-semibold ${themeClasses}`}>
        <div className="flex items-center gap-2 lg:flex">
          <GiGuitar className="w-12 h-12 block lg:hidden" />
          <h1 className="font-bold text-2xl lg:hidden">MuziK</h1>
        </div>
        {
          user.role === "ADMIN" && (
            <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden lg:block cursor-pointer"
            onClick={() => navigate('/admin')}
            >
              Admin
            </p>
          )
        }
        <div className="flex items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 hidden md:block rounded-2xl w-[300px] border text-black 
            border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img src={search} alt="Search" className="w-6 h-6 md:hidden flex cursor-pointer" />
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden lg:block cursor-pointer">
            Explore Premium
          </p>
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden lg:block cursor-pointer">
            Install App
          </p>
          {user ? (
            <div className="flex items-center gap-2">
              <div onClick={handleLogout} className="hover:border-white border-2 cursor-pointer rounded-2xl p-1">
                <button className="bg-white text-black px-4 py-1 rounded-2xl" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <div onClick={() => navigate("/login")} className="hover:border-white border-2 rounded-2xl p-2 cursor-pointer">
              <button className="bg-white text-black cursor-pointer px-4 py-1 rounded-2xl">Login</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
