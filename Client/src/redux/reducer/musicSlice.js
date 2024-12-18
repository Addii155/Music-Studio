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
            state.currProgress = action.payload.currProgress;
            localStorage.setItem("song",JSON.stringify(action.payload.song));
            localStorage.setItem("songId",JSON.stringify(action.payload.songId));
            localStorage.setItem("isPlaying",JSON.stringify(action.payload.isPlaying));
            localStorage.setItem("currProgress",JSON.stringify(action.payload.currProgress));
        },
        setPause :(state,action)=>{
            if(action.payload!==undefined){
                state.isPlaying=action.payload
                localStorage.setItem("isPlaying",JSON.stringify(action.payload));
                return;
            }else return;
            
           
        },
        setSongProgress:(state,action)=>{
            state.currProgress = action.payload;
            localStorage.setItem("currProgress",JSON.stringify(action.payload));
        }

    }
})
export default musicSlice.reducer;

export const {setSong , setPause , setSongProgress} = musicSlice.actions