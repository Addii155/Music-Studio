import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MusicCard from "../components/MusicCard";

const AlbumPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the artist details and songs
    const fetchArtistDetails = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch artist details (replace with your API endpoint)
        const artistResponse = await axios.get(
          `https://music-studio-rjkw.onrender.com/api/v1/getalbum/${id}`
        );
        const artistData = await artistResponse.data;
        setSongs(artistData.albumSongs);
        setArtist(artistData);
      } catch (error) {
        console.log("Error fetching artist data:", error);
      }
      setLoading(false); // End loading
    };

    fetchArtistDetails();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-[#282828] rounded-lg">
      <div className="artist-details mb-4 lg:flex justify-evenly">
        <img
          src={artist?.thumbnail.url}
          alt="Artist"
          className="w-96 h-72 rounded-lg"
        />
        <div className="p-4">
          <h1 className="lg:text-8xl  sm:text:6xl font-bold  sm:text-4xl md:text-6xl">
            {artist?.artist.name}
          </h1>
          <p className="text-gray-400 font-bold ">{artist?.bio}</p>
        </div>
        <div></div>
      </div>
      <h1 className="text-2xl font-bold lg:text:4xl">{artist?.title}</h1>
      <div
        className="grid mx-2  chl:grid-cols-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 
                  lg:grid-cols-3 cl:grid-cols-3 lg:gap-2 px-1 md:gap-4 gap-6 mt-4 overflow-x-auto"
      >
        {songs && songs.map((song) => <MusicCard key={song._id} song={song} />)}
      </div>
    </div>
  );
};

export default AlbumPage;
