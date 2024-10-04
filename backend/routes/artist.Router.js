import express from "express";
import verifyJwt from "../middlewares/auth.middlesware.js";
import uploadThumbnail from "../middlewares/uploadFile.js";
import artistCtrl from "../controllers/artist.controller.js";

const artistRouter=express.Router();

artistRouter.post('/addartist',verifyJwt,uploadThumbnail.single('avatar'),artistCtrl.addAccount);
artistRouter.get('/allartist',artistCtrl.getAllArtist);
artistRouter.get('/getartist/allsong/:id',artistCtrl.artistallMusic);
export default artistRouter;