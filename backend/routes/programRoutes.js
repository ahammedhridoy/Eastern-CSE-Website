const express = require("express");
const { upload } = require("../helpers/multer");
const { verifyRole } = require("../controllers/authController");
const {
  createProgram,
  getAllPrograms,
  getSingleProgram,
  updateProgram,
  deleteProgram,
} = require("../controllers/programController");

const programRouter = express.Router();

// Create a new program
programRouter.post(
  "/create",
  verifyRole(["OFFICIAL"]),
  upload.single("image"),
  createProgram
);

// Get all programs
programRouter.get("/all", getAllPrograms);

// Get Single program
programRouter.get("/:id", getSingleProgram);

// Update a program
programRouter.put(
  "/:id",
  verifyRole(["OFFICIAL"]),
  upload.single("image"),
  updateProgram
);

// Delete a program
programRouter.delete("/:id", verifyRole(["OFFICIAL"]), deleteProgram);

module.exports = programRouter;
