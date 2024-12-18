import React from "react";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";
import Album from "./Album";

import { Routes, Route } from "react-router-dom";
import Dummy from "./Dummy";
// import state from "../store";

const Layout = () => {

  return (
    <div className="h-screen  ">
      <div className="h-[100%] flex ">
        <Sidebar />
        <div className="w-[100%]  px-6 pt-4 rounded  text-white overflow-auto lg:w-[100%] lg:ml-0">
          <Navbar />
         <div className="h-[100%]">
          <Routes>
            <Route path="/home" element={<Album />} />
            <Route path="/home/mycompo" element={<Dummy />} />
          </Routes>
         </div>
        </div>
      </div>   
    </div>
  );
};

export default Layout;