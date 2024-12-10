import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    currsong: null,
    songId: null,
    isPlaying: false,
    currProgress: 0,
    loading: false
}

const musicSlice =createSlice ({
    name : "music",
    initialState ,
    reducers : {
        setSong : (state,action) => {
            state.currsong = action.payload.song;
            state.songId = action.payload.songId;
            state.isPlaying = action.payload.isPlaying;
            localStorage.setItem("song",JSON.stringify(action.payload.song));
            localStorage.setItem("songId",JSON.stringify(action.payload.songId));
            localStorage.setItem("isPlaying",JSON.stringify(action.payload.isPlaying));
            localStorage.setItem("currProgress",JSON.stringify(action.payload.currProgress));
        },
        setPause :(state,action)=>{
            console.log(action.payload);
            state.isPlaying = !state.isPlaying;
            localStorage.setItem("isPlaying",JSON.stringify(action.payload));
        },
        setSongProgress:(state,action)=>{
            console.log(action.payload);
            state.currProgress = action.payload;
            localStorage.setItem("currProgress",JSON.stringify(action.payload));
        }

    }
})
export default musicSlice.reducer;

export const {setSong , setPause , setSongProgress} = musicSlice.actions