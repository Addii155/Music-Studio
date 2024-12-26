import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddAlbum = () => {
  const [allArtists, setAllArtists] = useState([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      releaseDate: "",
      artist: "",
      genre: "Other",
      thumbnail: null,
    },
  });

  // Fetch artists for the dropdown
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/allartist");
        setAllArtists(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArtists();
  }, []);

  // Form submission handler
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("releaseDate", data.releaseDate);
    formData.append("artistId", data.artist);
    formData.append("genre", data.genre);
    formData.append("avatar", data.thumbnail[0]);

    try {
      await axios.post("http://localhost:8000/api/v1/album", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Album added successfully");
      reset(); 
    } catch (error) {
      toast.error("Failed to add album");
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Album</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Album Title</label>
          <input
            type="text"
            {...register("title", { required: "Album title is required" })}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Album Title"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            {...register("description")}
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Album Description"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Release Date</label>
          <input
            type="date"
            {...register("releaseDate", { required: "Release date is required" })}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          {errors.releaseDate && <p className="text-red-500">{errors.releaseDate.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Artist</label>
          <select
            {...register("artist", { required: "Artist is required" })}
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="">Select an artist</option>
            {allArtists.map((artist) => (
              <option key={artist._id} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </select>
          {errors.artist && <p className="text-red-500">{errors.artist.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Genre</label>
          <select
            {...register("genre")}
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="Classical">Classical</option>
            <option value="Jazz">Jazz</option>
            <option value="Electronic">Electronic</option>
            <option value="Country">Country</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail", { required: "Thumbnail is required" })}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Album
        </button>
      </form>
    </div>
  );
};

export default AddAlbum;
