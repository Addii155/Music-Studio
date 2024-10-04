import Album from "../models/album.model.js";

const albumCtrl = {
    getAlbums: async (req, res) => {
        try {
            const albums = await Album.find()
            // .populate("albumSongs");
            // console.log(albums);
            res.json(albums);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getOneAlbum: async (req, res) => {
        try {
            const album = await Album.findById(req.params.id).populate(
                "albumSongs"
            );
            res.json(album);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

}
export default albumCtrl;