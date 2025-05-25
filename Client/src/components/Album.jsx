import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import MusicCard from './MusicCard';
import ArtistCard from './ArtistCard';
import AlbumCard from './AlbumCard';

const Album = () => {
   const [songs, setSongs] = useState([]);
   const [artists, setArtists] = useState([]);
   const [albums, setAlbums] = useState([]);
   const [loading, setLoading] = useState(false);

   // Fetch Songs
   useEffect(() => {
      const fetchSongs = async () => {
         try {
            setLoading(true);
            const response = await axios.get("https://muzik-drab.vercel.app/api/v1/allsongs");
            setSongs(response.data);
         } catch (error) {
            toast.error(error.message || "Failed to load songs.");
         } finally {
            setLoading(false);
         }
      };
      fetchSongs();
   }, []);

   // Fetch Albums
   useEffect(() => {
      const fetchAlbums = async () => {
         try {
            const response = await axios.get("https://muzik-drab.vercel.app/api/v1/allalbum");
            setAlbums(response.data);
         } catch (error) {
            toast.error(error.message || "Failed to load albums.");
         }
      };
      fetchAlbums();
   }, []);

   // Fetch Artists
   useEffect(() => {
      const fetchArtists = async () => {
         try {
            const response = await axios.get("https://muzik-drab.vercel.app/api/v1/allartist");
            setArtists(response.data);
         } catch (error) {
            toast.error(error.message || "Failed to load artists.");
         }
      };
      fetchArtists();
   }, []);

   return (
      <div className='min-h-[100%] bg-[#282729] rounded-xl w-[100%] flex flex-col mt-4'>

         {/* Popular Artists */}
         <section className='bg-[#3f3a43] rounded-xl shadow-2xl p-4'>
            <h1 className='lg:text-3xl text-xl font-bold text-center'>Popular Artists</h1>
            <div className='grid mx-1 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
               {artists.length > 0 ? (
                  artists.map((artist) => <ArtistCard key={artist._id} artist={artist} />)
               ) : (
                  <p className="text-center text-gray-400">No artists found.</p>
               )}
            </div>
         </section>

         {/* Top Albums */}
         <section className='bg-[#3f3a43] rounded-xl shadow-2xl p-4 mt-4'>
            <h1 className='text-2xl font-bold text-center'>Top Albums</h1>
            <div className='grid mx-1 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
               {albums.length > 0 ? (
                  albums.map((album) => <AlbumCard key={album._id} artist={album} />)
               ) : (
                  <p className="text-center text-gray-400">No albums found.</p>
               )}
            </div>
         </section>

         {/* Top Hits Songs */}
         <section className='bg-[#3f3a43] rounded-xl shadow-2xl p-4 mt-4'>
            <h1 className='lg:text-3xl text-xl font-bold text-center'>Top Hits Songs 2024</h1>
            {loading ? (
               <p className="text-center text-gray-400">Loading songs...</p>
            ) : (
               <div className='grid lg:mx-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
                  {songs.length > 0 ? (
                     songs.map((song) => <MusicCard key={song._id} song={song} />)
                  ) : (
                     <p className="text-center text-gray-400">No songs found.</p>
                  )}
               </div>
            )}
         </section>

      </div>
   );
};

export default Album;
