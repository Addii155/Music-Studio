import express from "express";
import verifyJwt from "../middlewares/auth.middlesware.js";
import uploadThumbnail from "../middlewares/uploadFile.js";
import artistCtrl from "../controllers/artist.controller.js";

const artistRouter=express.Router();

artistRouter.post('/addartist',verifyJwt,uploadThumbnail.single('avatar'),artistCtrl.addAccount);

export default artistRouter;