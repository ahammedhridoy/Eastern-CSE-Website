const express = require("express");
const facultyRouter = express.Router();

const { upload } = require("../helpers/multer");
const {
  createFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
  getSingleFaculty,
} = require("../controllers/facultyController");
const adminAuthMiddleware = require("../middleware/adminAuth");
const authMiddleware = require("../middleware/auth");
const { verifyAdmin } = require("../controllers/authController");

// Create a new faculty
facultyRouter.post(
  "/create",
  verifyAdmin,
  upload.single("image"),
  createFaculty
);

// Get all faculties
facultyRouter.get("/all", getAllFaculties);

// Get Single Faculty
facultyRouter.get("/:id", getSingleFaculty);

// Update a faculty
facultyRouter.patch("/:id", verifyAdmin, upload.single("image"), updateFaculty);

// Delete a faculty
facultyRouter.delete("/:id", verifyAdmin, deleteFaculty);

module.exports = facultyRouter;
