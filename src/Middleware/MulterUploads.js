const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, "Uploads/");
  },
  filename: (req, file, next) => {
    next(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploader = multer({ storage: fileStorage });

module.exports = uploader;
