import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { useSong } from '../store/song';
const MusicCard = ( {song}) => {
     const {setSong} = useSong();
    const onClickHandler = () => {
        setSong(song);
    }
    return (
        <div className="lg:w-56 hover:scale-105 rounded overflow-hidden shadow-lg bg-[#282828]">
            <div className="relative ">
                <div className='w-full h-36'>
                <img  src= {song.thumbnail.url}
                 alt="Album Art" 
                  className="w-[100%] h-[100%] object-cover rounded"
                 />
                </div>
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
            </div>
        </div>
    );
};

export default MusicCard;