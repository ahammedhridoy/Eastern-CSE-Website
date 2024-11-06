const prisma = require("../utils/prismaClient");

// Create slider
const createSlider = async (req, res) => {
  try {
    const images = req.files.map((file) => `/uploads/${file.filename}`);
    console.log(images);

    const slider = await prisma.slider.create({
      data: {
        images,
      },
    });

    res.status(200).json({ message: "Slider created successfully", slider });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating slider", error });
  }
};

module.exports = createSlider;
