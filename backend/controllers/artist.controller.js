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
        })
        // console.log(newartist)

        return res.status(201).json({
            msg:"new artist add"
        })
    })
}

export default artistCtrl;