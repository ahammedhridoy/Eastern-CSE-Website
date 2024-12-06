const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createSlide,
  deleteSlide,
  getAllSlides,
  updateSlide,
} = require("../controllers/sliderController");
const { verifyAdmin } = require("../controllers/authController");

const sliderRouter = express.Router();

// Route for creating a slide
sliderRouter.post("/create", verifyAdmin, upload.single("image"), createSlide);

// Route for getting all slides
sliderRouter.get("/all", verifyAdmin, getAllSlides);

// Route for update slides
sliderRouter.put(
  "/update/:id",
  verifyAdmin,
  upload.single("image"),
  updateSlide
);

// Route for deleting a slide
sliderRouter.delete("/delete/:id", verifyAdmin, deleteSlide);

module.exports = sliderRouter;
