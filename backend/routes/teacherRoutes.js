const express = require("express");
const {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");
const { upload } = require("../helpers/multer");
const {
  verifyAdmin,
  verifyUser,
  verifyRole,
} = require("../controllers/authController");
const teacherRouter = express.Router();

// Create a new teacher
teacherRouter.post(
  "/create",
  verifyRole(["ADMIN"]),
  upload.single("image"),
  createTeacher
);

// Get all teachers
teacherRouter.get("/all", getAllTeachers);

// Update a teacher
teacherRouter.patch(
  "/:id",
  verifyRole(["ADMIN"]),
  upload.single("image"),
  updateTeacher
);

// Delete a teacher
teacherRouter.delete("/:id", verifyRole(["ADMIN"]), deleteTeacher);

module.exports = teacherRouter;
