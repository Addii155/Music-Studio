import mongoose, { Schema } from "mongoose";


const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default:"new song"
    },
    thumbnail: {
        id: String,
        url: String
    },
    audio: {
        id: String,  
        url: String
    },
    album: {
        type: mongoose.Schema.ObjectId,
        ref: 'Albums' 
    },
    artist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Artist'
    }
}, {
    timestamps: true,  
});

const Song = mongoose.model("Song", songSchema);

export default Song;
