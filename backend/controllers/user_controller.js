import Song from "../models/song.model.js";
import User from "../models/user.model.js";
import TryCatch from "../utils/TryCatch.js";

const userCtrl={

    addFavourateSong:TryCatch(async(req,res)=>{
        
        const {SongId}=req.params;
        // console.log(SongId)
        if(!SongId)
        {
            return res.json({
                message:"provide song id"
            })
        }
        const song=await Song.findById(SongId);
        if(!song)
        {
            res.json({
                message:'song not exit'
            })
        }
        const user=req.user;

        if(user.favoriteSong.includes(SongId)){
            return res.status(400).json({ message: "Song already in favorites" });
        }
        user.favoriteSong.push(SongId);
        await user.save();
        res.status(200).json({
             message: "Song added to favorites", 
             favoriteSongs: user.favoriteSongs
             });
    }),
    getUserSong:TryCatch(async(req,res)=>{
        const user=req.user;
        
        const populatedUser= await User.findById(user._id).populate('favoriteSong')
        if (!populatedUser || !populatedUser.favoriteSong.length) {
            return res.status(404).json({
                message: "No favorite songs found for this user"
            });
        }
    
        res.status(200).json({
            message: "Favorite songs retrieved successfully",
            favoriteSongs: populatedUser.favoriteSong,
        });
    })
}
export default userCtrl;