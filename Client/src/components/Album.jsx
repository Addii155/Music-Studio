import React from 'react';
import MusicCard from './MusicCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AnimatedBars from './MusicAnimated';
import ArtistCard from './ArtistCard';
import AlbumCard from './AlbumCard';
const Album = () => {
   const [song, setsong] = useState([]);
   const [artist, setartist] = useState([])
   const [albums, setalbums] = useState([])
   useEffect(() => {

      const fetchData = async () => {
         const response = await axios.get("https://music-studio-rjkw.onrender.com/api/v1/allsongs");
         setsong(response.data);

      };
      fetchData();
   }, []);
   useEffect(() => {

      const fetchData = async () => {
         const response = await axios.get("https://music-studio-rjkw.onrender.com/api/v1/allalbum");
         setalbums(response.data);

      };
      fetchData();
   }, []);

   useEffect(() => {

      const fetchData = async () => {
         const response = await axios.get("https://music-studio-rjkw.onrender.com/api/v1/allartist");
         setartist(response.data);
         
      };
      fetchData();
   }, []);
   return (
      <>
         <div className='min-h-[100%] bg-[#282729] rounded-xl w-[100%] flex flex-wrap  flex-col  mt-4'>
            <section >
               <div className=' bg-[#3f3a43]  rounded-xl shadow-2xl '>
                  <h1 className='text-2xl font-bold  text-center'>
                     Popular Artists
                  </h1>

                  <div className='grid  chl:grid-cols-4 grid-cols-2  md:grid-cols-2 
                  lg:grid-cols-3 cl:grid-cols-3 lg:gap-2 px-1 md:gap-4 gap-6 mt-4'>
                     {
                        artist && artist.map((artist) => (
                           <ArtistCard key={artist._id} artist={artist} />
                        ))
                     }
                  </div>
               </div>
               <div className=' bg-[#3f3a43] m-4 rounded-xl py-2 shadow-2xl '>
                  <h1 className='text-2xl font-bold text-center'>
                     Top Artists
                  </h1>

                  <div className='grid mx-2 chl:grid-cols-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 
                  lg:grid-cols-3 cl:grid-cols-3 lg:gap-2 px-1 md:gap-4 gap-6 mt-4'>
                     {
                        albums && albums.map((album) => (
                           <AlbumCard key={album._id} artist={album} />
                        ))
                     }
                  </div>
               </div>
             
               <div className='bg-[#3f3a43]  rounded-xl py-2'>
               <h1 className='text-2xl font-bold text-center'>
                  Top hits song 2024
               </h1>
                  <div className='grid lg:mx-2 chl:grid-cols-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 
                  lg:grid-cols-3 cl:grid-cols-3 lg:gap-2 px-1 md:gap-4 gap-6 mt-4 overflow-x-auto'>
                     {song && song.map((song) => (
                        <MusicCard key={song._id} song={song} />
                     ))}
                  </div>
               </div>
            </section>

         </div>



      </>
   )
}

export default Album