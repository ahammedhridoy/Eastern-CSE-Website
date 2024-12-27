const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createAlumni,
  getAllAlumni,
  updateAlumni,
  deleteAlumni,
} = require("../controllers/alumniController");
const {
  verifyAdmin,
  verifyUser,
  verifyRole,
} = require("../controllers/authController");
const alumniRouter = express.Router();

// Create a new alumni
alumniRouter.post(
  "/create",
  verifyRole(["ADMIN"]),
  upload.single("image"),
  createAlumni
);

// Get all alumni
alumniRouter.get("/all", getAllAlumni);

// Update alumni
alumniRouter.patch(
  "/:id",
  verifyRole(["ADMIN"]),
  upload.single("image"),
  updateAlumni
);

// Delete alumni
alumniRouter.delete("/:id", verifyRole(["ADMIN"]), deleteAlumni);

module.exports = alumniRouter;
