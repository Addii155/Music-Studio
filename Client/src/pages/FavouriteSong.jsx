import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";
// import Album from "./Album"; // Component to display songs
import MusicCard from "../components/MusicCard";
import Player from "../components/Player";
import { set } from "mongoose";
// import Player from "./Player";

const FavouriteSong = () => {
    const { id } = useParams(); // Get the artist id from the URL

    const [songs, setSongs] = useState([]); // State to hold the artist's songs
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch the artist details and songs
        const fetchArtistDetails = async () => {
            setLoading(true); // Start loading
            try {
                 const response = await axios.get(`http://localhost:8000/api/v1/favorite/mysong`,{
                    withCredentials: true,
                 });
                //  console.log(response.data.favoriteSongs);
                 setSongs(response.data.favoriteSongs);
                // setSongs(songsData);
            } catch (error) {
                console.error("Error fetching artist data:", error);
            }
            setLoading(false); // End loading
        };

        fetchArtistDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div className="h-screen">
            <div className="h-[100%] flex">

                <Sidebar />
                <div className="w-[100%] px-6 pt-4 rounded text-white overflow-auto lg:w-[100%] lg:ml-0">

                    <Navbar />

                    <div className="w-full bg-[#282828] h-full rounded-xl p-4">
                        <div className="bg-[#3f3a43] m-4 rounded-xl py-2">
                        <h1 className="text-2xl font-bold text-center">
                            Favourite Song
                        </h1>
                        {
                            songs.length > 0 ? (
                                <div className='grid mx-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-2 px-1 md:gap-4 gap-6 mt-4'>
                                    {songs.length > 0 && songs.map((song) => (
                                        <MusicCard key={song._id} song={song} />
                                    ))}

                                </div>
                            ) : (
                                <div>No songs found</div>
                            )
                        }
                        </div>


                        <Player />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavouriteSong;
