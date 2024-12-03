const express = require("express");
const {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");
const { upload } = require("../helpers/multer");
const { verifyAdmin } = require("../controllers/authController");
const teacherRouter = express.Router();

// Create a new teacher
teacherRouter.post(
  "/create",
  verifyAdmin,
  upload.single("image"),
  createTeacher
);

// Get all teachers
teacherRouter.get("/all", getAllTeachers);

// Update a teacher
teacherRouter.put("/:id", upload.single("image"), updateTeacher);

// Delete a teacher
teacherRouter.delete("/:id", deleteTeacher);

module.exports = teacherRouter;
