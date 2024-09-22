import express from "express"
const songRouter=express.Router();
import verifyJwt from "../middlewares/auth.middlesware.js";
import songCtrl from "../controllers/song.controller.js";
import uploadSong from "../middlewares/uploadSong.js";
import uploadThumbnail from "../middlewares/uploadFile.js";
songRouter.post('/newsong',uploadSong.single('song'),songCtrl.addSong);
songRouter.post("/album",verifyJwt,uploadThumbnail.single('avatar'),songCtrl.addAlbum)
songRouter.get("/allsongs",songCtrl.getAllSong);
export default songRouter;