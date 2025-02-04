const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createSlide,
  deleteSlide,
  getAllSlides,
  updateSlide,
} = require("../controllers/sliderController");
const { verifyRole } = require("../controllers/authController");

const sliderRouter = express.Router();

// Route for creating a slide
sliderRouter.post(
  "/create",
  verifyRole(["FACULTY", "OFFICIAL"]),
  upload.single("image"),
  createSlide
);

// Route for getting all slides
sliderRouter.get("/all", getAllSlides);

// Route for update slides
sliderRouter.put(
  "/update/:id",
  verifyRole(["FACULTY", "OFFICIAL"]),
  upload.single("image"),
  updateSlide
);

// Route for deleting a slide
sliderRouter.delete(
  "/delete/:id",
  verifyRole(["FACULTY", "OFFICIAL"]),
  deleteSlide
);

module.exports = sliderRouter;
