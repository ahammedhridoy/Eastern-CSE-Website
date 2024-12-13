const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createAlbum,
  getAllAlbums,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");
const {
  verifyAdmin,
  verifyUser,
  verifyEditor,
} = require("../controllers/authController");
const albumRouter = express.Router();

// Create a new album
albumRouter.post(
  "/create",
  verifyUser,
  verifyEditor,
  upload.single("image"),
  createAlbum
);

// Get all albums
albumRouter.get("/all", getAllAlbums);

// Update an album
albumRouter.put(
  "/:id",
  verifyUser,
  verifyEditor,
  upload.single("image"),
  updateAlbum
);

// Delete an album
albumRouter.delete("/:id", verifyUser, verifyEditor, deleteAlbum);

module.exports = albumRouter;
