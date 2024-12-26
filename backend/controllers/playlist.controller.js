import Playlist from "../models/playList.js";
import TryCatch from "../utils/TryCatch.js";

const playlistCtrl = {
    createPlaylist: TryCatch(async(req,res)=>{
        const {name} = req.body;
        const playlist = await Playlist.findOne({name});
        if(playlist) return res.status(400).json({msg:"Playlist already exist"});
        const newPlaylist = await Playlist.create({name,
            user:req.user._id,
        });
        
        res.status(201).json({msg:"Playlist created",newPlaylist});
    }),
    getPlaylist: TryCatch(async(req,res)=>{
        const id=req.params.id;

        const playlist = await Album.findById(id).populate("albumSongs");
        if(!playlist) return res.status(400).json({msg:"Playlist not found  "});
        return res.status(200).json({msg:"Playlist found",playlist});

    }),
    getSongs: TryCatch(async(req,res)=>{
        const id=req.params.id;

        const playlist = await  Album.findById(id);

        res.json(playlist.albumSongs);
    }),
    getMyPlaylists: TryCatch(async(req,res)=>{
        const playlists = await Playlist.find({user:req.user._id});
        res.status(200).json({msg:"Playlists found",playlists});
    }),

}
export default playlistCtrl;