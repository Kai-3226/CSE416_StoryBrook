require("dotenv").config()
const multer = require("multer")
const cloudinary =require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
console.log(cloudinary.config().cloud_name)

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "StoryBrook",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

module.exports = multer({storage: storage})