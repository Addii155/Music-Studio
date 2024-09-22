import React from "react";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";
import Player from "./Player";
import Album from "./Album";
// import state from "../store";

const Layout = () => {
 
  
  return (
    <div className="h-screen ">
      <div className="h-[100%] flex ">
        <Sidebar />
        <div className="w-[100%]  px-6 pt-4 rounded  text-white overflow-auto lg:w-[100%] lg:ml-0">
          <Navbar />
         <div className="h-[100%]">
          <Album />
         <Player className=""/>
         </div>
        </div>
      </div>   
    </div>
  );
};

export default Layout;