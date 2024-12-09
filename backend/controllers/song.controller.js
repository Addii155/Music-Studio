import Album from "../models/album.model.js";
import Artist from "../models/artist.model.js";
import Song from "../models/song.model.js";
// import extractImageFromMP3 from "../middlewares/extractImageFromMp3.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from "cloudinary";
import { parseFile } from "music-metadata";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import { get } from "http";

const songCtrl = {
    addAlbum: TryCatch(async (req, res) => {
        const { title, description } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        try {
            const cloud = await cloudinary.v2.uploader.upload(file.path, {
                resource_type: "image", // Adjust resource type if not an image
            });

            if (!cloud) {
                return res.status(500).json({
                    message: "File upload failed",
                });
            }


            const newAlbum = await Album.create({
                title,
                description,
                thumbnail: {
                    id: cloud.public_id,
                    url: cloud.secure_url,
                },
                // artist: artist._id,
            });
            // artist.album.push(newAlbum._id);
            // await artist.save();

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
        const { albumId, artistId } = req.body;
        const file = req.file;
    
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }
    
        // Parse metadata from the audio file
        const metadata = await parseFile(file.path);
    
        let thumbnailSong = null; // Initialize variable for thumbnail upload
    
        // Check if the song has an image in the metadata
        if (metadata.common.picture && metadata.common.picture.length > 0) {
            const picture = metadata.common.picture[0];
    
            // Define the directory for storing album art
            const directory = "./backend/uploads/songIcon";
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
            }
    
            // Create a unique image name and save the image
            const imageName = `album_art_${uuidv4()}.${picture.format.split('/')[1]}`;
            const imagePath = path.join(directory, imageName);
            fs.writeFileSync(imagePath, picture.data);
    
            // Upload the thumbnail to cloudinary
            thumbnailSong = await cloudinary.v2.uploader.upload(imagePath, { resource_type: "image" });
    
            if (!thumbnailSong) {
                return res.json({ msg: "Music image upload failed" });
            }
        }
    
        // Check if the album exists
        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(400).json({ msg: "Album does not exist" });
        }
    
        // Check if the artist exists
        const artist = await Artist.findById(artistId);
        if (!artist) {
            return res.status(400).json({ msg: "Artist does not exist" });
        }
    
        // Upload the audio file to cloudinary
        const cloud = await cloudinary.v2.uploader.upload(file.path, { resource_type: "video" });
        if (!cloud) {
            return res.status(400).json({ msg: "Audio file upload failed" });
        }
    
        // Create the new song
        const newsongData = {
            title: file.originalname,
            audio: {
                id: cloud.public_id,
                url: cloud.secure_url,
            },
            album: album._id,
            artist: artist._id,
        };
    
        // Only add the thumbnail field if thumbnailSong is available
        if (thumbnailSong) {
            newsongData.thumbnail = {
                id: thumbnailSong.public_id,
                url: thumbnailSong.secure_url,
            };
        }
    
        const newsong = await Song.create(newsongData);
    
        // Update album and artist with the new song
        album.albumSongs.push(newsong._id);
        artist.songs.push(newsong._id);
    
        await album.save();
        await artist.save();

        return res.json({
            message: "Song added successfully",
        });
    }),
    getAllSong: TryCatch(async (req, res) => {
        const songs = await Song.find();
        // console.log(songs);
        res.json(songs);
    }),
}
export default songCtrl;