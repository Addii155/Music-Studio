import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useSong } from '../store/song';

const Player = () => {
  const { song: currsong } = useSong();
  const [song, setsong] = useState(null);

  useEffect(() => {
   
    if (!currsong)
    {
        console.log("Current song:", currsong);
        return;
    }
    setsong(currsong);
  }, [currsong]);

  if (!currsong) return <div></div>; // Return an empty div if no song is available
  console.log(currsong);
  return (
    <div className="w-96 mb-4 lg:w-2/4 xl:w-1/4 fixed bottom-0 mx-auto p-4 rounded shadow-lg bg-white dark:bg-black dark:border-2 dark:border-gray-700 flex items-center">
    <div className="flex items-center">
      <div className="w-12 h-12 mr-2">
        <img
          src={song?.thumbnail?.url}
          alt="Album Art"
          className="w-full h-full rounded object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="text-black dark:text-white font-bold">{song?.title}</p>
    
        {/* Conditional rendering for ReactPlayer */}
        {song?.audio?.url && (
          <ReactPlayer
            url={song.audio.url}
            playing
            controls
            className="rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            width="100%"
            height="50px" // Adjust the height as needed
          />
        )}
      </div>
    </div>
  </div>
  );
};

export default Player;
