import mongoose, { Schema } from "mongoose";

// Define the playlist schema
const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
        default:'My playlist'
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',  // Reference to the User model
        // required: true
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
