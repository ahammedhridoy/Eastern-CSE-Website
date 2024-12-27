const express = require("express");
const { upload } = require("../helpers/multer");
const {
  getImagesByAlbum,
  deleteGalleryImage,
  addImagesToGallery,
  getAllImages,
} = require("../controllers/galleryController");
const {
  verifyUser,
  verifyEditor,
  verifyRole,
} = require("../controllers/authController");
const galleryRouter = express.Router();

// Add an image to a gallery
galleryRouter.post(
  "/create",
  verifyRole(["EDITOR", "ADMIN"]),
  upload.array("images", 30),
  addImagesToGallery
);

// Get all images
galleryRouter.get("/all", verifyRole(["EDITOR", "ADMIN"]), getAllImages);

// Get images by album
galleryRouter.get("/:albumId", getImagesByAlbum);

// Delete a gallery image
galleryRouter.delete(
  "/:id",
  verifyRole(["EDITOR", "ADMIN"]),
  deleteGalleryImage
);

module.exports = galleryRouter;
