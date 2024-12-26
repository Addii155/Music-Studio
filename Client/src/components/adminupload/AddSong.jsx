import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AddSong = () => {
  const [allartists, setallartists] = useState(null);
  const [allalbums, setallalbums] = useState(null);
  const [loading, setloading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      thumbnail: '',
      audio: null,
      album: '',
      artist: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('https://music-studio-rjkw.onrender.com/api/v1/allartist');
        setallartists(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://music-studio-rjkw.onrender.com/api/v1/allalbum');
        setallalbums(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArtists();
    fetchAlbums();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('thumbnail', data.thumbnail[0]);
    formData.append('song', data.audio[0]);
    formData.append('albumId', data.album);
    formData.append('artistId', data.artist);

    try {
      setloading(true);
      const response = await axios.post('https://music-studio-rjkw.onrender.com/api/v1/newsong', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setloading(false);
      if (response.data.success) {
        toast.success('Song added successfully');
      } else {
        toast.error('Failed to add song');
      }
    } catch (error) {
      setloading(false);
      toast.error('Failed to add song');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Song</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
            placeholder="Song Title"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            {...register('description')}
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
            placeholder="Song Description"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            {...register('thumbnail')}
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Audio</label>
          <input
            type="file"
            {...register('audio')}
            accept="audio/*"
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Album</label>
          <select
            {...register('album', { required: 'Album is required' })}
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
          >
            <option value="">Select an album</option>
            {allalbums ? (
              allalbums.map((album) => (
                <option key={album._id} value={album._id}>
                  {album.title}
                </option>
              ))
            ) : (
              <option value="">Loading albums...</option>
            )}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Artist</label>
          <select
            {...register('artist', { required: 'Artist is required' })}
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
          >
            <option value="">Select an artist</option>
            {allartists ? (
              allartists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))
            ) : (
              <option value="">Loading artists...</option>
            )}
          </select>
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Add Song'}
        </button>
      </form>
    </div>
  );
};

export default AddSong;
