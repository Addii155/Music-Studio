import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useSelector } from 'react-redux';
import {CustomPlayer} from './CustomPlayer.jsx';

const Player = () => {
  const currsong = useSelector((state) => state.music?.currsong);
  const [song, setsong] = useState(null);
  const [duration, setduration] = useState(null);
  useEffect(() => {
    if (!currsong || currsong.length === 0) {
      return;
    }
    setsong(currsong);
  }, [currsong , song]);

  if (!song ) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 w-full p-4
      bg-white dark:bg-black dark:border-2 dark:border-gray-700 
      shadow-lg flex items-center z-50"
    >
      <div className="w-full mx-auto flex items-center">
        <div className="w-32 h-32 pr-2">
          <img
            src={song?.thumbnail?.url}
            alt="Album Art"
            className="w-full h-full object-cover rounded"
          />
        </div>

        <div className="flex-1 pl-4">
          <p className="text-black dark:text-white font-bold">{song?.title}</p>

          {/* Conditional rendering for ReactPlayer */}
          {song?.audio?.url && (
            <div className="w-full mt-2">
              <CustomPlayer
                song={song}
                duration={setduration}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
