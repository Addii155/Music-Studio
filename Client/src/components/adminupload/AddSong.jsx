import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AddSong = () => {
  const [allartists, setallartists] = useState(null);
  const [allalbums, setallalbums] = useState(null);
  const [loading,setloading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
      thumbnail: '',
      audio: null,
      album: '',
      artist: '',
    },
  });

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/allartist');
        setallartists(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/allalbum');
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
      const response = await axios.post('http://localhost:8000/api/v1/newsong', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setloading(false);
      toast.success('Song added successfully');
    } catch (error) {
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
            {...register('title')}
            className="w-full border text-black border-gray-300 p-2 rounded-lg"
            placeholder="Song Title"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            {...register('description')}
            className="w-full border  text-black border-gray-300 p-2 rounded-lg"
            placeholder="Song Description"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Thumbnail</label>
          <input
            type="file"
            accept='image/*'
            {...register('thumbnail')}
            className="w-full border  text-black border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Audio</label>
          <input
            type="file"
            {...register('audio')}
            accept="audio/*"
            className="w-full border  text-black border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div className='text-black'>
          <label className="block text-gray-700 font-semibold mb-2">Album</label>
          <select
            {...register('album')}
            className="w-full border  text-black border-gray-300 p-2 rounded-lg"
          >
            <option value="album" className='text-black'>Select an album</option>
            {allalbums &&
              allalbums.map((album) => (
                <option key={album._id} value={album._id} className='text-black'>
                  {album.title}
                </option>
              ))}          
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Artist</label>
          <select
            {...register('artist')}
            className="w-full border text-black  border-gray-300 p-2 rounded-lg"
          >
            <option value="artist" className='text-black'>Select an artist</option>
            {allartists &&
              allartists.map((artist) => (
                <option key={artist._id} value={artist._id} className='text-black'>
                  {artist.name}
                </option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition
            ${loading ? disabled : ''}
            `}
        >
         {
          loading ? (
           "loading..."
          ): "Add Song"
         }
        </button>
      </form>
    </div>
  );
};

export default AddSong;
