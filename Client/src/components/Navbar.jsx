import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../redux/action/auth";
import { useModeToggle } from "../components/mode-toggle";
import { GiGuitar } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { LoginUser } from "../redux/action/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useModeToggle().currentMode;
  const { user, error } = useSelector((state) => state.auth);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // Google login handler
  const submitHandler = (token) => {
    if (token?.credential) {
      dispatch(LoginUser(token.credential));
    } else {
      toast.error("Login failed! No credential found.");
    }
  };

  // Logout handler
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

  const themeClasses = theme === "light" ? "bg-white text-black" : "bg-black text-white";

  return (
    <div className={`w-full mb-2 flex justify-between items-center font-semibold ${themeClasses}`}>
      <div className="flex items-center gap-2 lg:flex cursor-pointer" onClick={() => navigate("/")}>
        <GiGuitar className="w-12 h-12 block lg:hidden" />
        <h1 className="font-bold text-2xl lg:hidden">MuziK</h1>
      </div>

      {/* Admin link for ADMIN users */}
      {user && user.role === "ADMIN" && (
        <p
          className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden lg:block cursor-pointer"
          onClick={() => navigate("/admin")}
        >
          Admin
        </p>
      )}

      <div className="lg:hidden flex items-center gap-4">
        <FaBars
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          className="text-white w-8 h-8 cursor-pointer"
        />
      </div>

      {/* Side Menu for Mobile */}
      

      <div className="flex items-center justify-center gap-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 hidden md:block rounded-2xl w-[300px] border text-black 
          border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      
        {user ? (
          <div className="flex items-center gap-2">
            <div>
              <span>{user.username.split(" ")[0].toUpperCase()}</span>
            </div>
            <div onClick={handleLogout} className="hover:border-white border-2 cursor-pointer rounded-2xl p-1">
              <button className="bg-white text-black px-4 py-1 rounded-2xl">Logout</button>
            </div>
          </div>
        ) : (
          <div className="hover:border-white border-2 rounded-2xl p-2 cursor-pointer">
            <GoogleLogin onSuccess={(token) => submitHandler(token)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
