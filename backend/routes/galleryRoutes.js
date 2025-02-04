const express = require("express");
const { upload } = require("../helpers/multer");
const {
  getImagesByAlbum,
  deleteGalleryImage,
  addImagesToGallery,
  getAllImages,
} = require("../controllers/galleryController");
const { verifyRole } = require("../controllers/authController");
const galleryRouter = express.Router();

// Add an image to a gallery
galleryRouter.post(
  "/create",
  verifyRole(["FACULTY", "OFFICIAL"]),
  upload.array("images", 30),
  addImagesToGallery
);

// Get all images
galleryRouter.get("/all", verifyRole(["FACULTY", "OFFICIAL"]), getAllImages);

// Get images by album
galleryRouter.get("/:albumId", getImagesByAlbum);

// Delete a gallery image
galleryRouter.delete(
  "/:id",
  verifyRole(["FACULTY", "OFFICIAL"]),
  deleteGalleryImage
);

module.exports = galleryRouter;
