import express from "express";
import verifyJwt from "../middlewares/auth.middlesware.js";
import userCtrl from "../controllers/user_controller.js";

const userSongRouter=express.Router();

userSongRouter.get("/favorite/add/:SongId",verifyJwt,userCtrl.addFavourateSong);
userSongRouter.get("/favorite/mysong",verifyJwt,userCtrl.getUserSong);
export default userSongRouter;