const express = require("express");
const { upload } = require("../helpers/multer");
const { verifyRole } = require("../controllers/authController");
const {
  createAboutSlide,
  updateAboutSlide,
  getAboutAllSlides,
  deleteAboutSlide,
} = require("../controllers/aboutSliderController");

const aboutSliderRouter = express.Router();

// Route for creating a slide
aboutSliderRouter.post(
  "/create",
  verifyRole(["FACULTY", "OFFICIAL"]),
  upload.array("images", 30),
  createAboutSlide
);

// Route for getting all slides
aboutSliderRouter.get("/all", getAboutAllSlides);

// Route for update slides
aboutSliderRouter.put(
  "/update/:id",
  verifyRole(["FACULTY", "OFFICIAL"]),
  upload.single("image"),
  updateAboutSlide
);

// Route for deleting a slide
aboutSliderRouter.delete(
  "/delete/:id",
  verifyRole(["FACULTY", "OFFICIAL"]),
  deleteAboutSlide
);

module.exports = aboutSliderRouter;
