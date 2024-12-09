import React from 'react';
import { useNavigate } from 'react-router-dom';
const ArtistCard = ({artist}) => {
    const navigate = useNavigate();
  return (
    <div className="lg:w-72 cursor-pointer rounded-  hover:scale-105 rounded-xl my-2 overflow-hidden shadow-lg bg-[#282828]"
    onClick={() => navigate(`/artist/${artist._id}`)}   >
      <img src={artist.avater.url} className="w-full h-48 object-cover rounded-t-lg" alt="Album art" />
     <div className='p-4'>
     <h1 className="text-2xl font-bold">{artist.name}</h1>
     <p className="text-lg font-bold">{artist.bio} </p>
     </div>
    </div>
  )
}

export default ArtistCard;