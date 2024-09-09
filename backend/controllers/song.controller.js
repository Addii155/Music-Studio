import Album from "../models/album.model.js";
import Artist from "../models/artist.model.js";
import Song from "../models/song.model.js";
// import extractImageFromMP3 from "../middlewares/extractImageFromMp3.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from "cloudinary";
import {parseFile} from "music-metadata";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from "path";

const songCtrl = {
    addAlbum: TryCatch(async (req, res) => {
        const { title, description  } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        try {
            // const artist = await Artist.findById(singer)
            // // console.log(artist);
            // if (!artist) {
            //     return res.json({
            //         message: "No artist found"
            //     })
            // }
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
        const {albumId} = req.body;
        const file = req.file;
    // console.log("File:", file); 

    if (!file) {
        return res.status(400).json({
            message: "No file uploaded",
        });
    }

    const metadata = await parseFile(file.path);
    // console.log("Metadata:", metadata);

    let imagePath = null;
    
    if (metadata.common.picture && metadata.common.picture.length > 0) {
        const picture = metadata.common.picture[0];
        // console.log(`Image format: ${picture.format}`);
        // console.log(`Image size: ${picture.data.length} bytes`);

        const directory = "./backend/uploads/songIcon";
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        const imageName = `album_art_${uuidv4()}.${picture.format.split('/')[1]}`;
        imagePath = path.join(directory, imageName);
        fs.writeFileSync(imagePath, picture.data);
    }

    // Handle saving the song and metadata to the database
    const title = file.originalname;
    const album = await Album.findById(req.body.albumId);
    if (!album) {
        return res.json({ msg: "Album not exist" });
    }
    const cloud = await cloudinary.v2.uploader.upload(file.path, { resource_type: "video" });
    if(!cloud)
    {
        return res.json({ msg: "Audio file upload failed" });
    }
    const thumbnailSong= await cloudinary.v2.uploader.upload(imagePath, { resource_type: "image" });

    if(!thumbnailSong)
    {
        return res.json({ msg: "music image upload failed" });
    }
    const newsong = await Song.create({
        title,
        audio: { id: cloud.public_id, url: cloud.secure_url },
        album: album._id,
        thumbnail:  {
            id: thumbnailSong.public_id,
         url: thumbnailSong.secure_url },// Save the image path to the database
    });

    // Clean up the uploaded MP3 file
    fs.unlinkSync(file.path);
    console.log(thumbnailSong);

    return res.json({
        message: "Song Added",
        imagePath, 
    });

    })
}
export default songCtrl;