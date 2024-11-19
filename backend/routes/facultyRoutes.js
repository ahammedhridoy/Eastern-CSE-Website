const express = require("express");
const facultyRouter = express.Router();

const { upload } = require("../helpers/multer");
const {
  createFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
} = require("../controllers/facultyController");

// Create a new faculty
facultyRouter.post("/create", upload.single("image"), createFaculty);

// Get all faculties
facultyRouter.get("/all", getAllFaculties);

// Update a faculty
facultyRouter.put("/:id", upload.single("image"), updateFaculty);

// Delete a faculty
facultyRouter.delete("/:id", deleteFaculty);

module.exports = facultyRouter;
