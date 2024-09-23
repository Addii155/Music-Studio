import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import playicon from '../assets/play.png';
import pauseicon from '../assets/pause.png';
import volumeimg from "../assets/volume.png"

const CustomPlayer = ({ song }) => {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(1); // Volume ranges from 0 to 1
  const [progress, setProgress] = useState(0); // Progress in seconds
  const [songduration, setSongDuration] = useState(0); // Store the song's duration
  const playerRef = useRef(null); // Reference to the ReactPlayer instance

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
  };

  // Handle when the duration of the song is available
  const handleDuration = (duration) => {
    setSongDuration(duration); // Set the song duration
  };


  const formatCurrrenttime=(time)=>{
    const minutes=Math.floor(time/60);
    const seconds=Math.floor(time%60);
    return `${minutes}:${seconds}`
  }

  const seekingRef = useRef(false); // To track if the user is seeking

  return (
    <div className="rounded-lg shadow-md bg-gray-800 p-4">
      {song?.audio?.url && (
        <ReactPlayer
          ref={playerRef} // Attach the player reference
          url={song.audio.url}
          playing={playing}
          volume={volume}
          playsinline={true}
          controls={false} // Hide native controls
          width="100%"
          height="50px"
          style={{ display: 'none' }} // Hide the player interface
          onProgress={handleProgress} // Track progress updates
          onDuration={handleDuration} // Extract the song's duration
        />
      )}

      {/* Custom Controls */}
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={() => setPlaying(!playing)}
          className="text-white hover:bg-gray-700 p-2 rounded"
        >
          {playing ? (
            <img src={pauseicon} alt="pause" className="w-6 h-6" />
          ) : (
            <img src={playicon} alt="play" className="w-6 h-6" />
          )}
        </button>

        <div>
          <img src={volumeimg} alt="volume" className="w-8 h-8" />
          <label htmlFor="volume">{volume * 100}</label>
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
      <div className="mt-4">
        <div className="w-full flex justify-between ">
         <span>{formatCurrrenttime(progress)}</span>
         <span>{formatCurrrenttime(songduration)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={songduration || 1} // Use songduration or fallback to 1
          step={0.1}
          value={progress}
          onChange={(e) => handleSeek(parseFloat(e.target.value))} // Allow manual seeking
          onMouseDown={() => (seekingRef.current = true)} // Disable automatic progress updates while seeking
          onMouseUp={() => (seekingRef.current = false)} // Re-enable progress updates after seeking
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CustomPlayer;
