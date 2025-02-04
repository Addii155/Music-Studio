import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./Addartist.css";

const Addartist = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      bio: "",
      avater: null,
      DOB: "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.avater || data.avater[0] === undefined) {
      toast.error("Please upload an avatar");
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    formData.append("avatar", data.avater[0]);
    formData.append("DOB", data.DOB);

    try {
      const response = await axios.post(
        "https://muzik-drab.vercel.app/api/v1/addartist",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Artist added successfully");
      console.log(response.data);

      reset({
        name: "",
        bio: "",
        avater: null,
        DOB: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>Add Artist</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            {...register("bio", { required: "Bio is required" })}
          ></textarea>
          {errors.bio && <p className="error-message">{errors.bio.message}</p>}
        </div>

        <div className="form-group">
          <label>Avatar</label>
          <input
            type="file"
            {...register("avater", { required: "Avatar is required" })}
          />
          {errors.avater && (
            <p className="error-message">{errors.avater.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            {...register("DOB", { required: "Date of Birth is required" })}
          />
          {errors.DOB && <p className="error-message">{errors.DOB.message}</p>}
        </div>

        <button type="submit">Add Artist</button>
      </form>
    </div>
  );
};

export default Addartist;
