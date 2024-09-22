import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { useSong } from '../store/song';
const MusicCard = ( {song}) => {
     const {setSong} = useSong();
    const onClickHandler = () => {
        setSong(song);
       
    }
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[#282828]">
            <div className="relative bg-red-500 ">
                <img className="w-full h-full " src= {song.thumbnail.url}
                 alt="Album Art" 
                 height={"200px"}
                 />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                    <FaPlay className="text-white text-4xl"  
                    onClick={onClickHandler}
                    />
                </div>
            </div>
            <div className="px-2 py-4">
                <div className=" text-md text-white  ">
                    {song.title}
                    </div>
                <p className="text-gray-700 text-base">
                    {song.description}
                    </p>
            </div>
        </div>
    );
};

export default MusicCard;