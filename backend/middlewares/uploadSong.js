import express from "express";
import multer from "multer";
import fs from 'fs';
const filedirectory="./backend/uploads/song"

// Check if the "uploads" directory exists, and create it if it doesn't

if (!fs.existsSync(filedirectory)) {
    fs.mkdirSync(filedirectory);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/uploads/song');  // Save the file to the "uploads" directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, `${Date.now() + file.originalname }`);  // Append a unique suffix to the filename
    }
});

const uploadSong = multer({
    storage: storage,
});

export default uploadSong;
