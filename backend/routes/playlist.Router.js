import express from 'express';
const playlistRouter = express.Router();
import verifyJwt from '../middlewares/auth.middlesware.js';

import playlistCtrl from '../controllers/playlist.controller.js';

playlistRouter.post('/create/playlist', verifyJwt, playlistCtrl.createPlaylist);
playlistRouter.get('/getplaylists', verifyJwt, playlistCtrl.getMyPlaylists);
playlistRouter.get('/playlist/songs', verifyJwt, playlistCtrl.getSongs);

export default playlistRouter;