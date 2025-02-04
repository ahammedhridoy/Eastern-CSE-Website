const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createAlbum,
  getAllAlbums,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");
const { verifyRole } = require("../controllers/authController");
const albumRouter = express.Router();

// Create a new album
albumRouter.post(
  "/create",
  verifyRole(["FACULTY", "OFFICIAL"]),
  upload.single("image"),
  createAlbum
);

// Get all albums
albumRouter.get("/all", getAllAlbums);

// Update an album
albumRouter.put(
  "/:id",
  verifyRole(["FACULTY", "OFFICIAL"]),
  upload.single("image"),
  updateAlbum
);

// Delete an album
albumRouter.delete("/:id", verifyRole(["FACULTY", "OFFICIAL"]), deleteAlbum);

module.exports = albumRouter;
