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
const { verifyRole } = require("../controllers/authController");

// Create a new faculty
facultyRouter.post(
  "/create",
  verifyRole(["OFFICIAL"]),
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
  verifyRole(["OFFICIAL"]),
  upload.single("image"),
  updateFaculty
);

// Delete a faculty
facultyRouter.delete("/:id", verifyRole(["OFFICIAL"]), deleteFaculty);

module.exports = facultyRouter;
