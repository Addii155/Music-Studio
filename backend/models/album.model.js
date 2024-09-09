
import mongoose, { Schema, model } from "mongoose";

const albumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "new album",  // Optional description with a default empty string
    },
    releaseDate: {
        type: Date,
        default:Date.now()
    },
    artist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Artist',  // Assuming you have an 'Artist' model
        // required: true,
    },
    genre: {
        type: String,
        enum: ['Rock', 'Pop', 'Hip-Hop', 'Classical', 'Jazz', 'Electronic', 'Country', 'Other'],
        default: 'Other', 
    },
    albumSongs: [
        {
            type:mongoose.Schema.ObjectId,
            ref:'Song'
        }
    ],
    thumbnail: {
        id:String,
        url:String
    },
    createdAt: {
        type: Date,
        default: Date.now(),  
    }
});

const   Album = model('Album', albumSchema);

export default Album;
