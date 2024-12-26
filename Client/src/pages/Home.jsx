import React,{useState ,useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from '../components/SideBar.jsx';
import Navbar from '../components/Navbar.jsx';
import Album from '../components/Album.jsx';
import ArtistPage from './Artist.jsx';
import FavouriteSong from './FavouriteSong.jsx';
import AlbumPage from './Album.jsx';
import ResponsiveNavbar from '../components/ResponsiveNavbar.jsx';
import MyPlaylist from './Myplaylist.jsx';


const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
   <>
    <div className="h-screen  ">
      <div className="h-[100%] flex ">
       
        <Sidebar />
        <div className="w-[100%]  px-6 pt-4 rounded  text-white overflow-auto lg:w-[100%] lg:ml-0">
        {
          windowWidth > 1024 ? <Navbar /> : <ResponsiveNavbar/>
        }
         <div className="h-[100%]">
          <Routes>
            <Route path="/" element={<Album />} />
            <Route path="/playlist" element={<MyPlaylist />} />
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