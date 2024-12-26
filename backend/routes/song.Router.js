import express from "express"
const songRouter=express.Router();
import verifyJwt from "../middlewares/auth.middlesware.js";
import songCtrl from "../controllers/song.controller.js";
import uploadSong from "../middlewares/uploadSong.js";
import uploadThumbnail from "../middlewares/uploadFile.js";
import uploadData from "../middlewares/uploadboth.js";
songRouter.post('/newsong',uploadData.fields([
    { name:'thumbnail',maxCount:1},
    { name:'song',maxCount:1}
]),songCtrl.addSong);
songRouter.post("/album",verifyJwt,uploadThumbnail.single('avatar'),songCtrl.addAlbum)
songRouter.get("/allsongs",songCtrl.getAllSong);
songRouter.get("/song/searchquery/:title",songCtrl.searchSong);
export default songRouter;