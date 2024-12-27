import Album from "../models/album.model.js";
import Artist from "../models/artist.model.js";
import Song from "../models/song.model.js";
// import extractImageFromMP3 from "../middlewares/extractImageFromMp3.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from "cloudinary";
import { parseFile } from "music-metadata";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import fs from 'fs/promises'

const songCtrl = {
    addAlbum: TryCatch(async (req, res) => {
        const { title, description , artistId} = req.body;
        const artist = await Artist.findById(artistId);
        if(!artist){
            return res.status(400).json({
                message:"artist not found"
        })
        }
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }
        try {
            const cloud = await cloudinary.v2.uploader.upload(file.path, {
                resource_type: "image", 
            });

            if (!cloud) {
                return res.status(500).json({
                    message: "File upload failed",
                });
            }
             fs.unlink(file.path);
            const newAlbum = await Album.create({
                title,
                description,
                thumbnail: {
                    id: cloud.public_id,
                    url: cloud.secure_url,
                },
                artist:artist._id
            });
            res.status(201).json({
                message: "Album created successfully",
            });
        } catch (error) {
            console.error("Error uploading file or creating album: ", error);
            res.status(500).json({
                message: "Server error",
                error: error.message,
            });
        }
    }),
    addSong: TryCatch(async (req, res) => {
        const { title, description, albumId, artistId } = req.body;
        const file = req.files;
       
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }
    const thumbnailFile = req.files.thumbnail?.[0];
    const songFile = req.files.song?.[0];

    // Validate album
    const album = await Album.findById(albumId);
    if (!album) {
        return res.status(400).json({ msg: "Album does not exist" });
    }

    // Validate artist
    const artist = await Artist.findById(artistId);
    if (!artist) {
        return res.status(400).json({ msg: "Artist does not exist" });
    }

    let thumbnailSong = null;
    if (thumbnailFile) {
        const thumbnailPath = thumbnailFile.path;
        const uploadResult = await cloudinary.v2.uploader.upload(thumbnailPath, {
            resource_type: "image",
        });
        thumbnailSong = {
            id: uploadResult.public_id,
            url: uploadResult.secure_url,
        };
        fs.unlink(thumbnailPath); 
    }

    // Upload song to Cloudinary
    const songPath = songFile.path;
    const audioUploadResult = await cloudinary.v2.uploader.upload(songPath, {
        resource_type: "video",
    });
    fs.unlink(songPath); 

    const newSong = await Song.create({
        title,
        audio: {
            id: audioUploadResult.public_id,
            url: audioUploadResult.secure_url,
        },
        description: description || "",
        thumbnail: thumbnailSong,
        album: album._id,
        artist: artist._id,
    });
    album.albumSongs.push(newSong._id);
    artist.songs.push(newSong._id);

    await album.save();
    await artist.save();

    return res.json({
        message: "Song added successfully",
        song: newSong,
    });
    }),
    getAllSong: TryCatch(async (req, res) => {
        const songs = await Song.find().sort({ createdAt: -1 });
        res.json(songs);
    }),
    searchSong: TryCatch(async (req, res) => {
        const { title } = req.params; 
        
        const songResults = await Song.find({
            title: { 
                $regex: title,  
                $options: 'i',  
            }
        })
        
        const albumResults = await Album.find({
            name: { 
                $regex: title, 
                $options: 'i', 
            }
        })
        // .populate('albumSongs');  
        
        const artistResults = await Artist.find({
            name: { 
                $regex: title, 
                $options: 'i',
            }
        })
        // .populate('songs');  

        // Aggregate all results (songs, albums, artists)
        const combinedResults = {
            songs: songResults,
            albums: albumResults,
            artists: artistResults
        };

        // Send the results as JSON
        res.status(200).json(combinedResults);
    }),
}
export default songCtrl;