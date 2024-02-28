require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//Config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

//Instance of cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormat: [".png", ".jpg", "jpeg"], //Array of allowed image formats
  params: {
    folder: "Blog API",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

module.exports = storage;
