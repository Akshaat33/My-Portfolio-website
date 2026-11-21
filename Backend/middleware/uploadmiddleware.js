import multer from "multer";

// Store uploaded files temporarily in memory
const storage = multer.memoryStorage();

// Configure multer
const upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    }
});

export default upload;