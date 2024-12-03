const express = require("express");
const { upload } = require("../helpers/multer");
const { createSlide, deleteSlide } = require("../controllers/sliderController");
const { verifyAdmin } = require("../controllers/authController");

const sliderRouter = express.Router();

// Route for creating a slide
sliderRouter.post("/create", verifyAdmin, upload.single("image"), createSlide);

// Route for deleting a slide
sliderRouter.delete("/delete/:id", deleteSlide);

module.exports = sliderRouter;
