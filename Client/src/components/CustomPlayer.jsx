import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import playicon from '../assets/play.png';
import pauseicon from '../assets/pause.png';
import volumeimg from "../assets/volume.png";
import loaderIcon from "../assets/35.gif"; // Add your loader here
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa"
import { FaVolumeDown } from "react-icons/fa";
import { useSelector , useDispatch } from 'react-redux';
import  { setPause } from '../redux/reducer/musicSlice'
const CustomPlayer = ({ song }) => {
  const {isPlaying , currProgress} = useSelector(state=>state.music);
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(isPlaying);
  const [volume, setVolume] = useState(1); // Volume ranges from 0 to 1
  const [progress, setProgress] = useState(currProgress); // Progress in seconds
  const [songduration, setSongDuration] = useState(0); // Store the song's duration
  const playerRef = useRef(null); // Reference to the ReactPlayer instance
  const [buffer, setBuffer] = useState(false); // Buffering state

  // Handle progress updates from ReactPlayer
  const handleProgress = (progressData) => {
    if (!seekingRef.current) {
      setProgress(progressData.played * songduration); // Update progress in seconds
    }
  };


  // Handle seeking (when user interacts with the progress slider)
  const handleSeek = (value) => {
    setProgress(value);
    playerRef.current.seekTo(value / songduration); // Seek to the desired position in seconds
    dispatch(setPause()); // Start playing
  };

  // Handle when the duration of the song is available
  const handleDuration = (duration) => {
    setSongDuration(duration); // Set the song duration
  };

  const formatCurrrenttime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds}`;
  };

  const seekingRef = useRef(false); // To track if the user is seeking

  return (
    <div className="rounded-lg shadow-md  bg-gray-900  p-4 relative">
      {song?.audio?.url && (
        <ReactPlayer
          ref={playerRef} // Attach the player reference
          url={song.audio.url}
          playing={isPlaying}
          volume={volume}
          playsinline={true}
          controls={false} // Hide native controls
          width="100%"
          height="50px"
          style={{ display: 'none' }} // Hide the player interface
          onProgress={handleProgress} // Track progress updates
          onDuration={handleDuration} // Extract the song's duration
          onBuffer={() => setBuffer(true)} // Show loader during buffering
          onBufferEnd={() => setBuffer(false)} // Hide loader when buffering ends
          onEnded={() => dispatch(setPause())}
        />
      )}

     
      {/* Custom Controls */}
      <div className="flex items-center justify-between mt-1">
        <button
          onClick={() =>{
            dispatch(setPause(!isPlaying))
          }}
          className="text-white hover:bg-gray-700 p-2 rounded"
        >
          {isPlaying ? (
            <img src={pauseicon} alt="pause" className="w-6 h-6" />
          ) : (
            <img src={playicon} alt="play" className="w-6 h-6" />
          )}
        </button>

        <div>
        <div>
        {
            volume === 0 ?
             <FaVolumeMute className="text-white w-6 h-6"/>
            : volume > 0.5 ? <FaVolumeHigh className="text-white w-6 h-6"/>
            : <FaVolumeDown className="text-white w-6 h-6"/>    
         }
        </div>
          <label htmlFor="volume" className='mr-2'>{volume * 100}</label>
          <input
            id="volume"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="ml-2 flex-1"
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-1">
        <div className="w-full flex justify-between ">
          <span>{formatCurrrenttime(progress)}</span>
          <span>{formatCurrrenttime(songduration)}</span>
        </div>
        <div>
        { buffer && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={loaderIcon} alt="Loading..."   className="w-8 h-8 " />
        </div>
      )}
        <input
          type="range"
          min={0}
          max={songduration || 1} 
          step={0.1}
          value={progress}
          onChange={(e) => handleSeek(parseFloat(e.target.value))} // Allow manual seeking
          onMouseDown={() => (seekingRef.current = true)} // Disable automatic progress updates while seeking
          onMouseUp={() => (seekingRef.current = false)} // Re-enable progress updates after seeking
          className="w-full"
        />
        </div>
      </div>
    </div>
  );
};

export  {CustomPlayer};
