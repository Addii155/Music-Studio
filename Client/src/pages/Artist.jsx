import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MusicCard from "../components/MusicCard";
import axios from "axios";

const ArtistPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      setLoading(true);
      try {
        const artistResponse = await axios(
          `https://music-studio-rjkw.onrender.com/api/v1/getartist/allsong/${id}`
        );
        const artistData = artistResponse.data;
        setSongs(artistData.songs);
        setArtist(artistData);
      } catch (error) {
        console.log("Error fetching artist data:", error);
      }
      setLoading(false);
    };

    fetchArtistDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full bg-[#282828] rounded-lg p-4">
      <div className="artist-details mb-4 flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-4 lg:space-y-0">
        <img
          src={artist?.avater.url}
          alt="Artist"
          className="w-full sm:w-80 md:w-96 h-auto rounded-lg mx-auto lg:mx-0"
        />
        <div className="p-4 text-center lg:text-left">
          <h1 className="lg:text-8xl text-xl font-bold sm:text-4xl md:text-6xl">
            {artist?.name}
          </h1>
          <p className="text-gray-400 font-bold mt-2">{artist?.bio}</p>
        </div>
      </div>

      {songs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 px-2">
          {songs.map((song) => (
            <MusicCard key={song._id} song={song} />
          ))}
        </div>
      ) : (
        <div className="text-white mt-4">No songs found</div>
      )}
    </div>
  );
};

export default ArtistPage;
