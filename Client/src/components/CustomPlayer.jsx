import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import playicon from "../assets/play.png";
import pauseicon from "../assets/pause.png";
import volumeimg from "../assets/volume.png";
import loaderIcon from "../assets/35.gif"; // Add your loader here
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setPause, setSongProgress } from "../redux/reducer/musicSlice";
const CustomPlayer = ({ song }) => {
  const { isPlaying } = useSelector((state) => state.music);
  const currmusicProgress = JSON.parse(localStorage.getItem("currProgress"));
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(1); // Volume ranges from 0 to 1
  const [progress, setProgress] = useState(currmusicProgress); // Progress in seconds
  const [songduration, setSongDuration] = useState(currmusicProgress); // Store the song's duration
  const playerRef = useRef(null); // Reference to the ReactPlayer instance
  const [buffer, setBuffer] = useState(false); // Buffering state
  const handleProgress = (state) => {
    setProgress(state.playedSeconds);
    dispatch(setSongProgress(state.playedSeconds));
  };
  useEffect(() => {
    const storedProgress = localStorage.getItem("currProgress");
    if (storedProgress) {
      setProgress(() => JSON.parse(storedProgress));
      playerRef.current.seekTo(JSON.parse(storedProgress));
    } else {
      setProgress(0); // Default to 0 if nothing is stored
    }
  }, []);

  const handleSeek = (value) => {
    setProgress(value);
    dispatch(setSongProgress(value));
    playerRef.current.seekTo(value / songduration);
    dispatch(setPause());
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
    <div className="rounded-lg shadow-md bg-gray-900  relative">
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
          style={{ display: "none" }} // Hide the player interface
          onProgress={handleProgress} // Track progress updates
          onDuration={handleDuration} // Extract the song's duration
          onBuffer={() => setBuffer(true)} // Show loader during buffering
          onBufferEnd={() => setBuffer(false)} // Hide loader when buffering ends
          onEnded={() => dispatch(setPause())}
        />
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            dispatch(setPause(!isPlaying));
          }}
          className="text-white hover:bg-gray-700 p-2 rounded"
        >
          {isPlaying ? (
            <img src={pauseicon} alt="pause" className="w-6 h-6" />
          ) : (
            <img src={playicon} alt="play" className="w-6 h-6" />
          )}
        </button>
        <div className="flex items-center justify-center gap-1">
          <div className="w-8px h-8px">
            {volume === 0 ? (
              <FaVolumeMute className="text-white w-6 h-6" />
            ) : volume > 0.5 ? (
              <FaVolumeHigh className="text-white w-6 h-6" />
            ) : (
              <FaVolumeDown className="text-white w-6 h-6" />
            )}
          </div>
          <label
            htmlFor="volume"
            className="pl-1 text-white"
            style={{ width: "40px", textAlign: "center" }} 
          >
            {Math.round(volume * 100)} 
          </label>
          <input
            id="volume"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="ml-2 flex-1 "
          />
        </div>
      </div>

      <div className="mt-1 ">
        <div className="w-full flex justify-between ">
          <span>{formatCurrrenttime(progress)}</span>
          <span>{formatCurrrenttime(songduration)}</span>
        </div>
        <div className="text-blue-700">
          {buffer && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={loaderIcon} alt="Loading..." className="w-8 h-8 " />
            </div>
          )}
          <input
            type="range"
            min={0}
            max={songduration || 1}
            step={0.1}
            value={progress}
            onChange={(e) => handleSeek(parseFloat(e.target.value))} 
            onMouseDown={() => (seekingRef.current = true)}
            onMouseUp={() => (seekingRef.current = false)} 
            className="w-full cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
};

export { CustomPlayer };
