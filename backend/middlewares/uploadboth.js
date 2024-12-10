import multer from "multer";
import fs from "fs";

// Directories for uploads
const directories = {
    thumbnail: "./backend/uploads/thumbnail",
    song: "./backend/uploads/song",
};

// Ensure directories exist
Object.values(directories).forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Define storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = file.fieldname === "thumbnail" ? directories.thumbnail : directories.song;
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        cb(null, `${Date.now() + file.originalname }`); 
    },
});

// Define file filter
const fileFilter = (req, file, cb) => {
    const validMimeTypes = {
        thumbnail: ["image/jpeg", "image/png"],
        song: ["audio/mpeg", "audio/wav", "audio/flac"],
    };
    if (validMimeTypes[file.fieldname]?.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type for ${file.fieldname}`));
    }
};

// Configure multer
const uploadData = multer({ storage });

export default uploadData;
