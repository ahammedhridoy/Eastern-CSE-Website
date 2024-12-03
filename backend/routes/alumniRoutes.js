const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createAlumni,
  getAllAlumni,
  updateAlumni,
  deleteAlumni,
} = require("../controllers/alumniController");
const { verifyAdmin } = require("../controllers/authController");
const alumniRouter = express.Router();

// Create a new alumni
alumniRouter.post("/create", verifyAdmin, upload.single("image"), createAlumni);

// Get all alumni
alumniRouter.get("/all", getAllAlumni);

// Update alumni
alumniRouter.put("/:id", upload.single("image"), updateAlumni);

// Delete alumni
alumniRouter.delete("/:id", deleteAlumni);

module.exports = alumniRouter;
