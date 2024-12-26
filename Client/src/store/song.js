import {create} from "zustand";
import axios from "axios";
export const useSong = create((set) => ({  
    song: [],
    setSong: (song) => set({song}),

}))

export const likeHandler = create((set) => ({
    liked: false,
    setLiked: () => set((state) => ({liked: !state.liked})),
}))

export const onlikeClick= async({id})=>{
  try {
    
    const response=await axios.get(`https://music-studio-rjkw.onrender.com/api/v1/favorite/add/${id}`,
      {
        withCredentials: true,
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );

  } catch (error) {
    console.log(error);
  }
}