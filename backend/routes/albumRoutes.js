const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createAlbum,
  getAllAlbums,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");
const { verifyAdmin } = require("../controllers/authController");
const albumRouter = express.Router();

// Create a new album
albumRouter.post("/create", verifyAdmin, upload.single("image"), createAlbum);

// Get all albums
albumRouter.get("/all", getAllAlbums);

// Update an album
albumRouter.put("/:id", upload.single("image"), updateAlbum);

// Delete an album
albumRouter.delete("/:id", deleteAlbum);

module.exports = albumRouter;
