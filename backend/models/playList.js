import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
        default:'My playlist'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',  
    },
    songs: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Song' 
    }],
}, {
    timestamps: true,  
});

const Playlist = mongoose.model("Playlist", playlistSchema);


export default Playlist;
