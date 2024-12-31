const multer = require("multer");

// Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/resumes"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
