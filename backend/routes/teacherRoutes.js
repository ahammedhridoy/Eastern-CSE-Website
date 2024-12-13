const express = require("express");
const {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");
const { upload } = require("../helpers/multer");
const { verifyAdmin, verifyUser } = require("../controllers/authController");
const teacherRouter = express.Router();

// Create a new teacher
teacherRouter.post(
  "/create",
  verifyUser,
  verifyAdmin,
  upload.single("image"),
  createTeacher
);

// Get all teachers
teacherRouter.get("/all", getAllTeachers);

// Update a teacher
teacherRouter.patch(
  "/:id",
  verifyUser,
  verifyAdmin,
  upload.single("image"),
  updateTeacher
);

// Delete a teacher
teacherRouter.delete("/:id", verifyUser, verifyAdmin, deleteTeacher);

module.exports = teacherRouter;
