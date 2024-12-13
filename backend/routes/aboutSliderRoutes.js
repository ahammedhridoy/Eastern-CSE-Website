const express = require("express");
const { upload } = require("../helpers/multer");
const { verifyUser, verifyEditor } = require("../controllers/authController");
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
  verifyUser,
  verifyEditor,
  upload.single("image"),
  createAboutSlide
);

// Route for getting all slides
aboutSliderRouter.get("/all", getAboutAllSlides);

// Route for update slides
aboutSliderRouter.put(
  "/update/:id",
  verifyUser,
  verifyEditor,
  upload.single("image"),
  updateAboutSlide
);

// Route for deleting a slide
aboutSliderRouter.delete(
  "/delete/:id",
  verifyUser,
  verifyEditor,
  deleteAboutSlide
);

module.exports = aboutSliderRouter;
