import React from 'react';
import { useNavigate } from 'react-router-dom';
const AlbumCard = ({artist}) => {

    const navigate = useNavigate();
  return (
    <div className=" lg:w-72 sm:w-64 w-42 cursor-pointer  rounded-xl my-2  shadow-lg bg-[#282828]"
    onClick={() => navigate(`/album/${artist._id}`)}   >
      <img src={artist.thumbnail.url} className="w-full md:h-48 h-32 object-cover rounded-t-lg" alt="Album art" />
      
     <div className='p-4'>
     <h1 className="lg:text-2xl text-sm lg:font-bold">{artist.title}</h1>
     </div>
    </div>
  )
}

export default AlbumCard;