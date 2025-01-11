    import express from "express";
    import multer from "multer";
    import fs from 'fs';
  
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './backend/uploads/song');  
        },

        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileExtension = file.originalname.split('.').pop();
            cb(null, `${Date.now() + file.originalname }`);  // Append a unique suffix to the filename
        }
    });

    const uploadSong = multer({
        storage: storage, 
        // fileFilter: (req, file, cb) => {
        //     const validMimeTypes = ["audio/mpeg", "audio/wav", "audio/flac"];
        //     if (validMimeTypes.includes(file.mimetype)) {
        //         cb(null, true);
        //     } else {
        //         cb(new Error("Invalid file type for song"));
        //     }
        // },
    }); 

    export default uploadSong;
