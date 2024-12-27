const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createSlide,
  deleteSlide,
  getAllSlides,
  updateSlide,
} = require("../controllers/sliderController");
const {
  verifyAdmin,
  verifyUser,
  verifyEditor,
  verifyRole,
} = require("../controllers/authController");

const sliderRouter = express.Router();

// Route for creating a slide
sliderRouter.post(
  "/create",
  verifyRole(["EDITOR", "ADMIN"]),
  upload.single("image"),
  createSlide
);

// Route for getting all slides
sliderRouter.get("/all", getAllSlides);

// Route for update slides
sliderRouter.put(
  "/update/:id",
  verifyRole(["EDITOR", "ADMIN"]),
  upload.single("image"),
  updateSlide
);

// Route for deleting a slide
sliderRouter.delete(
  "/delete/:id",
  verifyRole(["EDITOR", "ADMIN"]),
  deleteSlide
);

module.exports = sliderRouter;
