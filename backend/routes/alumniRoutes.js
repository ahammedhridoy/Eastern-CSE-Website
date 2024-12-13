const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createAlumni,
  getAllAlumni,
  updateAlumni,
  deleteAlumni,
} = require("../controllers/alumniController");
const { verifyAdmin, verifyUser } = require("../controllers/authController");
const alumniRouter = express.Router();

// Create a new alumni
alumniRouter.post(
  "/create",
  verifyUser,
  verifyAdmin,
  upload.single("image"),
  createAlumni
);

// Get all alumni
alumniRouter.get("/all", getAllAlumni);

// Update alumni
alumniRouter.patch(
  "/:id",
  verifyUser,
  verifyAdmin,
  upload.single("image"),
  updateAlumni
);

// Delete alumni
alumniRouter.delete("/:id", verifyUser, verifyAdmin, deleteAlumni);

module.exports = alumniRouter;
