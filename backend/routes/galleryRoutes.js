const express = require("express");
const { upload } = require("../helpers/multer");
const {
  getImagesByAlbum,
  deleteGalleryImage,
  addImagesToGallery,
} = require("../controllers/galleryController");
const galleryRouter = express.Router();

// Add an image to a gallery
galleryRouter.post("/create", upload.array("images", 10), addImagesToGallery);

// Get images by album
galleryRouter.get("/:albumId", getImagesByAlbum);

// Delete a gallery image
galleryRouter.delete("/:id", deleteGalleryImage);

module.exports = galleryRouter;