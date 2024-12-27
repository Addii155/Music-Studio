import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const MyPlaylist = () => {
  const { user } = useSelector((state) => state.auth);  // Get the user from redux store
  const [playlists, setPlaylists] = useState([]);  // State to store playlists
  const [loading, setLoading] = useState(true);  // State to handle loading state
  const [error, setError] = useState(null);  // State to handle errors

  useEffect(() => {
    // Fetch playlists when the component is mounted
    const fetchPlaylists = async () => {
      if (!user) {
        toast.error('Please log in to see your playlists');
        return;
      }

      try {
        const response = await axios.get(
          'https://music-studio-rjkw.onrender.com/api/v1/getplaylists', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        // console.log(response.data.playlists);
        setPlaylists(response.data.playlists);  // Store playlists in state
        setLoading(false);  // Stop loading
      } catch (error) {
        setError('Failed to fetch playlists');
        setLoading(false);  // Stop loading in case of error
      }
    };

    fetchPlaylists();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;  // Display error if any occurred
  }

  return (
    <div className="my-playlists-container">
      <h1 className="text-3xl font-bold text-white">My Playlists</h1>

      {playlists.length === 0 ? (
        <p className="text-white">You have no playlists yet. Create one!</p>
      ) : (
        <div className="playlist-grid grid grid-cols-3 gap-6 mt-6">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="playlist-card bg-gray-800 p-4 rounded-lg shadow-lg">
              <img
                src={playlist.image || '/path/to/default-image.jpg'}  // Use default image if no image is provided
                alt={playlist.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h2 className="text-xl text-white mt-4">{playlist.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlaylist;
