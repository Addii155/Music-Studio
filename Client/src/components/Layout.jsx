import React from "react";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";
// import Player from "./Player";
import state from "../store";

const Layout = () => {
 
  
  return (
    <div className="h-screen bg-[#141414]">
      <div className="h-[100%] flex">
        <Sidebar />
        <div className="w-[100%]  px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[100%] lg:ml-0">
          <Navbar />
          {/* children */}
        </div>
      </div>
      {/* <Player /> */}
      <h1>hleoo</h1>
    </div>
  );
};

export default Layout;