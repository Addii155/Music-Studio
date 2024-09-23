import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useSong } from '../store/song';
import CustomPlayer from './CustomPlayer';

const Player = () => {
  const { song: currsong } = useSong();
  const [song, setsong] = useState(null);
  const [duration, setduration] = useState(null);
  useEffect(() => {

    if (!currsong && currsong.length > 0) {
      console.log("Current song:", currsong);
      return;
    }
    setsong(currsong);
  }, [currsong]);

  if (!song || song.length === 0 || !song.audio?.url) return null;

  // console.log(song);
  return (

    <div className="w-2/3  md:2/4 mb-4 lg:w-2/4 xl:w-2/4 fixed bottom-0 mx-auto p-4 rounded shadow-lg bg-white dark:bg-black dark:border-2 dark:border-gray-700 ">
      <div className="flex items-center ">
        <div className="w-24 h-24 lg:w-48 lg:h-48 pr-2">
          <img
            src={song?.thumbnail?.url}
            alt="Album Art"
            className="w-[100%] h-[100%] object-cover rounded"
          />
        </div>


        <div className="flex-1">
          <p className="text-black dark:text-white font-bold">{song?.title}</p>

          {/* Conditional rendering for ReactPlayer */}
          {song?.audio?.url && (
            <CustomPlayer song={song} duration={setduration} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
