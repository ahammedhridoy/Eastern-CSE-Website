const express = require("express");
const createSlider = require("../controllers/sliderController");
const { upload } = require("../helpers/multer");

const sliderRouter = express.Router();

sliderRouter.post("/create", upload.array("images", 10), createSlider);

module.exports = sliderRouter;
