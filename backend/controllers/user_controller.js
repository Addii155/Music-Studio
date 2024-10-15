import Song from "../models/song.model.js";
import User from "../models/user.model.js";
import TryCatch from "../utils/TryCatch.js";

const userCtrl={

    addFavourateSong:TryCatch(async(req,res)=>{
        
        const {SongId}=req.params;
        // console.log('call')
        // console.log(SongId)
        if(!SongId)
        {
            return res.json({
                message:"provide songid not valid"
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
         let message;
        if(user.favoriteSong.includes(SongId)){
           const index=user.favoriteSong.indexOf(SongId);
           user.favoriteSong.splice(index,1);
           message = "Song removed from favorites";
        }
        else {
            user.favoriteSong.push(SongId); // Add song to favorites
            message = "Song added to favorites";
        }
        await user.save();
        res.status(200).json({
             message, 
             favoriteSongs: user.favoriteSongs
             });
    }),
    getUserSong:TryCatch(async(req,res)=>{
        const user=req.user;
        
        const populatedUser= await User.findById(user._id).populate('favoriteSong')
        if (!populatedUser || !populatedUser.favoriteSong.length) {
            return res.status(200).json({
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