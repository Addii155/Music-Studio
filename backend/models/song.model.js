import mongoose, { Schema } from "mongoose";

// Define the song schema
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
    singer: {
        type: String,
        // required: true   
    },
    album: {
        type: mongoose.Schema.ObjectId,
        ref: 'Albums' 
    }
}, {
    timestamps: true,  
});

// Create the model from the schema
const Song = mongoose.model("Song", songSchema);

// Export the model
export default Song;
