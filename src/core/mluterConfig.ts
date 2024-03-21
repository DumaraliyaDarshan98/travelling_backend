import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/"); // Set the destination folder for uploaded files
  },
  filename: (req, file, callback) => {
    console.log("file :", file);
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const uniqueSuffix = Date.now();
    callback(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage });