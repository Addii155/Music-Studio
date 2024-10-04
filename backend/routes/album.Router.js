import express from 'express';
const albumRouter=express.Router(); 

// import verifyJwt from "../middlewares/auth.middlesware.js";
import albumCtrl from "../controllers/album.controller.js";

albumRouter.get('/allalbum',albumCtrl.getAlbums);
albumRouter.get('/getalbum/:id',albumCtrl.getOneAlbum);
export default albumRouter