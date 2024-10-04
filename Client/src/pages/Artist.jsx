import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";
// import Album from "./Album"; // Component to display songs
import MusicCard from "../components/MusicCard";
// import Player from "./Player";

const ArtistPage = () => {
  const { id } = useParams(); // Get the artist id from the URL
  const [artist, setArtist] = useState(null); // State to hold artist details
  const [songs, setSongs] = useState([]); // State to hold the artist's songs
  const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     // Fetch the artist details and songs
//     const fetchArtistDetails = async () => {
//       setLoading(true); // Start loading
//       try {
//         // Fetch artist details (replace with your API endpoint)
//         const artistResponse = await fetch(`http://localhost:8000/api/v1/artist/${id}`);
//         const artistData = await artistResponse.json();
//         setArtist(artistData);

//         // Fetch artist's songs (replace with your API endpoint)
//         const songsResponse = await fetch(`/api/artist/${id}/songs`);
//         const songsData = await songsResponse.json();
//         setSongs(songsData);
//       } catch (error) {
//         console.error("Error fetching artist data:", error);
//       }
//       setLoading(false); // End loading
//     };

//     fetchArtistDetails();
//   }, [id]); // Re-run the effect when the artist ID changes

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="h-screen">
      <div className="h-[100%] flex">
        {/* Sidebar Component */}
        <Sidebar />
        <div className="w-[100%] px-6 pt-4 rounded text-white overflow-auto lg:w-[100%] lg:ml-0">
          {/* Navbar Component */}
          <Navbar />
          <div className="h-[100%]">
            {/* Artist Details Section */}
            <div className="artist-details mb-4">
              <h1 className="text-3xl font-bold">{artist?.name}</h1>
              <p className="text-gray-400">{artist?.bio}</p>
            </div>

            {/* Album Component to display songs */}
            {/* <Album songs={songs} /> */}
            <MusicCard songs={songs} />
            {/* Player Component */}
            {/* <Player /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;
