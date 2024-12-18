import React from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from '../components/SideBar.jsx';
import Navbar from '../components/Navbar.jsx';
import Album from '../components/Album.jsx';
import ArtistPage from './Artist.jsx';
import FavouriteSong from './FavouriteSong.jsx';
import AlbumPage from './Album.jsx';


const Home = () => {

  return (
   <>
    <div className="h-screen  ">
      <div className="h-[100%] flex ">
        <Sidebar />
        <div className="w-[100%]  px-6 pt-4 rounded  text-white overflow-auto lg:w-[100%] lg:ml-0">
          <Navbar />
         <div className="h-[100%]">
          <Routes>
            <Route path="/" element={<Album />} />
            <Route path='/artist/:id' element={<ArtistPage />} />
            <Route  path="/favourite" element={<FavouriteSong />} /> 
            <Route path="/album/:id" element={<AlbumPage />} />
          </Routes>
         </div>
        </div>
      </div>   
    </div>
    
   </>
  )
}

export default Home