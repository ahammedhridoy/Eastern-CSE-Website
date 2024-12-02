const express = require("express");
const facultyRouter = express.Router();

const { upload } = require("../helpers/multer");
const {
  createFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
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

// Update a faculty
facultyRouter.put("/:id", upload.single("image"), updateFaculty);

// Delete a faculty
facultyRouter.delete("/:id", deleteFaculty);

module.exports = facultyRouter;
