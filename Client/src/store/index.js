import {create} from "zustand";

export const useStore = create((set) => ({
  count: 0,
  user: null,
  token: null,
  setToken: (token) => set({token: token}),
  setUser: (user) => set({user: user}),
  increasecount:()=>set((state)=>({
    count:state.count+1})),
  decreasecount:()=>set((state)=>({
    count:state.count-1
  })),
  resetcount:()=>set((state)=>({
    count:0
  })),
  
}))