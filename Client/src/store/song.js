import {create} from "zustand";

export const useSong = create((set) => ({  
    song: [],
    setSong: (song) => set({song}),

}))
