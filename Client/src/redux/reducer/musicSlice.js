import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    currsong: null,
    songId: null,
    isPlaying: false,
    currProgress: 0
}

const musicSlice =createSlice ({
    name : "music",
    initialState ,
    reducers : {
        setSong : (state,action) => {
            console.log(action.payload);
            state.currsong = action.payload.song;
            state.songId = action.payload.songId;
            state.isPlaying = action.payload.isPlaying;
        },
        setPause :(state)=>{
            state.isPlaying = !state.isPlaying;
        },
        setProgress:(state)=>{
            state.currProgress = action.payload
        }

    }
})
export default musicSlice.reducer;

export const {setSong , setPause , setProgress} = musicSlice.actions