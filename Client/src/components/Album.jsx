import React from 'react';
import MusicCard from './MusicCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AnimatedBars from './MusicAnimated';
import ArtistCard from './ArtistCard';
const Album = () => {
   const [song, setsong] = useState([]);
   const [artist,setartist]=useState([])
   useEffect(() => {

      const fetchData = async () => {
         const response = await axios.get("http://localhost:8000/api/v1/allsongs");
         setsong(response.data);
        
      };
      fetchData();
   }, []);

   useEffect(() => {
   const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/allartist");
      setartist(response.data);
        console.log(response.data);
   };
   fetchData();
}, []);
   return (
      <>
         <div className='min-h-[100%] bg-[#464749d9] rounded-xl w-[100%] flex flex-wrap  flex-col m-2 mt-4'>
            <section className=''>

               <h1 className='text-2xl font-bold text-center'>
                  Top Artists
               </h1>
               <div>
                  {
                     artist && artist.map((artist) => (
                        <ArtistCard key={artist._id} artist={artist} />
                     ))
                  }
               </div>
               <h1 className='text-2xl font-bold text-center'>
                  Top hits song 2024
               </h1>
               <div className='grid mx-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-2 px-1 md:gap-4 gap-6 mt-4'>
                  {song && song.map((song) => (
                     <MusicCard key={song._id} song={song} />
                  ))}
               
               </div>
            </section>
           
         </div>



      </>
   )
}

export default Album