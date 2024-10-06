import Artist from "../models/artist.model.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from "cloudinary"

const artistCtrl={
    addAccount:TryCatch(async(req,res)=>{
        const {name,bio}=req.body;
        const file = req.file;
        const cloud=await cloudinary.v2.uploader.upload(file.path)
        const newartist=  await Artist.create({
            name,
            bio,
            avater:{
                id:cloud.public_id,
                url:cloud.secure_url
            }
        });
        return res.status(201).json({
            msg:"new artist add"
        })
    }),
    // addSong:TryCatch(async(req,res)=>{
        
    // })
    getAllArtist:TryCatch(async(req,res)=>{
        const artists=await Artist.find();
        res.json(artists);
    }),
    artistallMusic:TryCatch(async(req,res)=>{
        const artist=await Artist.findById(req.params.id).populate("songs");
        // const allmusic=await Song.find({artist:artist._id});
        // console.log(artist)
        res.json(artist);
    })
}
export default artistCtrl;