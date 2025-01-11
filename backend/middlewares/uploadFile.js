import express from "express";
import multer from "multer";
import fs from 'fs';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/uploads/thumbnail');  // Save the file to the "uploads" directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, `${Date.now() + file.originalname }`);  
    }
});

const uploadThumbnail = multer({
    storage: storage,
});

export default uploadThumbnail;
