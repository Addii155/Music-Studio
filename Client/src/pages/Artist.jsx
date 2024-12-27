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
    <div className="h-[100%] bg-[#282828] rounded-lg">
      <div className="artist-details mb-4 flex  lg:flex-row flex-col justify-evenly">
        <img
          src={artist?.avater.url}
          alt="Artist"
          className="w-96 h-72 rounded-lg"
        />
        <div className="lg:p-4">
          <h1 className="lg:text-8xl text-xl  font-bold sm:text-4xl md:text-6xl">
            {artist?.name}
          </h1>
          <p className="text-gray-400 font-bold ">{artist?.bio}</p>
        </div>
        {/* <div></div> */}
      </div>
      {songs.length > 0 ? (
        <div className="grid lg:mx-2 sm:mx-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-2 px-1 md:gap-4 gap-2  mt-4">
          {songs.length > 0 &&
            songs.map((song) => <MusicCard key={song._id} song={song} />)}
        </div>
      ) : (
        <div>No songs found</div>
      )}
    </div>
  );
};

export default ArtistPage;
