const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createAlumni,
  getAllAlumni,
  updateAlumni,
  deleteAlumni,
} = require("../controllers/alumniController");
const { verifyRole } = require("../controllers/authController");
const alumniRouter = express.Router();

// Create a new alumni
alumniRouter.post(
  "/create",
  verifyRole(["OFFICIAL"]),
  upload.single("image"),
  createAlumni
);

// Get all alumni
alumniRouter.get("/all", getAllAlumni);

// Update alumni
alumniRouter.patch(
  "/:id",
  verifyRole(["OFFICIAL"]),
  upload.single("image"),
  updateAlumni
);

// Delete alumni
alumniRouter.delete("/:id", verifyRole(["OFFICIAL"]), deleteAlumni);

module.exports = alumniRouter;
