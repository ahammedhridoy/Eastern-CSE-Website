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
const {
  verifyAdmin,
  verifyUser,
  verifyRole,
} = require("../controllers/authController");

// Create a new faculty
facultyRouter.post(
  "/create",
  verifyRole(["ADMIN"]),
  upload.single("image"),
  createFaculty
);

// Get all faculties
facultyRouter.get("/all", getAllFaculties);

// Get Single Faculty
facultyRouter.get("/:id", getSingleFaculty);

// Update a faculty
facultyRouter.patch(
  "/:id",
  verifyRole(["ADMIN"]),
  upload.single("image"),
  updateFaculty
);

// Delete a faculty
facultyRouter.delete("/:id", verifyRole(["ADMIN"]), deleteFaculty);

module.exports = facultyRouter;
