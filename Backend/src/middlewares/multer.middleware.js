import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Resolve the directory to the backend's public/temp folder
const dir = path.resolve('public/temp');

// Create the directory if it doesn't exist
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir); // Use the resolved absolute path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save the file with its original name
    }
});

export const upload = multer({
    storage,
});