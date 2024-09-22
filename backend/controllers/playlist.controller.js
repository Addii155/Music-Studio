import Album from "../models/album.model";
import TryCatch from "../utils/TryCatch";

const playlistCtrl = {
    getPlaylist: TryCatch(async(req,res)=>{
        const id=req.params.id;

        const playlist = await Album.findById(id).populate("albumSongs");

        res.json(playlist);
    }),
    getSongs: TryCatch(async(req,res)=>{
        const id=req.params.id;

        const playlist = await Album.findById(id);

        res.json(playlist.albumSongs);
    })

}