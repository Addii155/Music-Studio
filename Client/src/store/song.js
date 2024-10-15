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
    
    const response=await axios.get(`http://localhost:8000/api/v1/favorite/add/${id}`,
      {
        withCredentials: true,
      }
    );
    
    console.log(response);

  } catch (error) {
    console.log(error);
  }
}