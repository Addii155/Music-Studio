import React, { useState, useEffect } from 'react';
import MusicCard from './MusicCard';
import axios from 'axios';
import AnimatedBars from './MusicAnimated';
import ArtistCard from './ArtistCard';
import AlbumCard from './AlbumCard';

const Album = () => {
  const [song, setsong] = useState([]);
  const [artist, setartist] = useState([]);
  const [albums, setalbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://music-studio-rjkw.onrender.com/api/v1/allsongs");
      setsong(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://music-studio-rjkw.onrender.com/api/v1/allalbum");
      setalbums(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://music-studio-rjkw.onrender.com/api/v1/allartist");
      setartist(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#282729] rounded-xl w-full flex flex-col mt-4 p-4">
      <section>

        {/* Popular Artists Section */}
        <div className="bg-[#3f3a43] rounded-xl shadow-2xl p-4">
          <h1 className="text-2xl font-bold text-center text-white">
            Popular Artists
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {artist && artist.map((artist) => (
              <ArtistCard key={artist._id} artist={artist} />
            ))}
          </div>
        </div>

        {/* Top Albums Section */}
        <div className="bg-[#3f3a43] m-4 rounded-xl py-2 shadow-2xl">
          <h1 className="text-2xl font-bold text-center text-white">
            Top Albums
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {albums && albums.map((album) => (
              <AlbumCard key={album._id} album={album} />
            ))}
          </div>
        </div>

        {/* Top Hits Songs Section */}
        <div className="bg-[#3f3a43] m-4 rounded-xl py-2">
          <h1 className="text-2xl font-bold text-center text-white">
            Top Hits Songs 2024
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 overflow-x-auto">
            {song && song.map((song) => (
              <MusicCard key={song._id} song={song} />
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};

export default Album;
