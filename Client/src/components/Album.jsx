
import React from 'react';
import MusicCard from './MusicCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AnimatedBars from './MusicAnimated';

const Album = () => {
   const [song, setsong] = useState([])
   useEffect(() => {

      const fetchData = async () => {
         const response = await axios.get("http://localhost:8000/api/v1/allsongs");
         setsong(response.data);
         //   console.log(response.data);
      };
      fetchData();
   }, []);
   return (
      <>
         <div className='h-[100%] bg-[#464749d9] w-[100%] flex flex-col m-2 mt-4'>
            <section className=''>

               <h1 className='text-2xl font-bold text-center'>
                  Top hits song 2024
               </h1>
               <div className='grid ml-4  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6  mt-4'>
                  {song && song.map((song) => (
                     <MusicCard key={song._id} song={song} />
                  ))}
                 {/* <div className="flex items-end ms-auto">
      <div className="bg-primary rounded me-1" style={{ width: '3px', height: '0.308138px' }}></div>
      <div className="bg-primary rounded me-1" style={{ width: '3px', height: '10.033px' }}></div>
      <div className="bg-primary rounded me-1" style={{ width: '3px', height: '0.321982px' }}></div>
      <div className="bg-primary rounded" style={{ width: '3px', height: '10.0696px' }}></div>
    </div> */}
               </div>
            </section>
            <AnimatedBars/>
         </div>



      </>
   )
}

export default Album