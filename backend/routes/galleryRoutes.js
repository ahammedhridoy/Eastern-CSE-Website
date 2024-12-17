const express = require("express");
const { upload } = require("../helpers/multer");
const {
  getImagesByAlbum,
  deleteGalleryImage,
  addImagesToGallery,
  getAllImages,
} = require("../controllers/galleryController");
const { verifyUser, verifyEditor } = require("../controllers/authController");
const galleryRouter = express.Router();

// Add an image to a gallery
galleryRouter.post(
  "/create",
  verifyUser,
  verifyEditor,
  upload.array("images", 30),
  addImagesToGallery
);

// Get all images
galleryRouter.get("/all", verifyEditor, getAllImages);

// Get images by album
galleryRouter.get("/:albumId", getImagesByAlbum);

// Delete a gallery image
galleryRouter.delete("/:id", verifyUser, verifyEditor, deleteGalleryImage);

module.exports = galleryRouter;
