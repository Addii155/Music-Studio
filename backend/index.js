import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import path from "path"
import multer from 'multer';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary'
import uploadSong from './middlewares/uploadSong.js';
import uploadThumbnail from './middlewares/uploadFile.js';
dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});



const app=express();



app.set("view engine", "ejs");
app.set("views",path.resolve("./backend/views"))
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","http://127.0.0.1:5173"],
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]

}))


import authRouter from "./routes/userRouter.js";
import songRouter from './routes/song.Router.js';
import artistRouter from './routes/artist.Router.js';
import userSongRouter from './routes/userSong.Router.js';
import aiRouter from './routes/ai.Router.js';
import albumRouter from './routes/album.Router.js';

app.use("/api/v1",authRouter);
app.use("/api/v1",songRouter);
app.use("/api/v1",artistRouter);
app.use("/api/v1",userSongRouter);
app.use("/api/v1",aiRouter);
app.use("/api/v1" ,albumRouter);

// app.get('/',(req,res)=>{
//     res.render("home")
// })
app.post('/profile',uploadSong.single('avatar'),async(req,res)=>{
    const file = req.file;
    
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            resource_type: "video",
        });

        console.log("Upload Result: ", uploadResult);

        // Assuming you want to redirect after a successful upload
        return res.redirect('/');
    } catch (error) {
        console.error("Upload Error: ", error);
        return res.status(500).json({ message: "Upload failed", error });
    }
    return res.redirect('/')
})


const PORT=process.env.PORT || 4000
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Database conneted successfull")
    app.listen(PORT,(req,res)=>{
        console.log(`Server Running at Port ${PORT}`)
    })
}
)