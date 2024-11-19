const fs = require("fs");
const path = require("path");
const prisma = require("../utils/prismaClient");

const createSlide = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded." });
    }

    const imageUrl = `/uploads/${req.file.filename}`; // Path to save in the database

    // Save slide to the database using Prisma
    const newSlide = await prisma.slider.create({
      data: {
        image: imageUrl,
      },
    });

    res
      .status(201)
      .json({ message: "Slide created successfully.", slide: newSlide });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating slide.", error: error.message });
  }
};

// Delete a slide
const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the slide by ID using Prisma
    const slide = await prisma.slider.findUnique({
      where: { id },
    });

    if (!slide) {
      return res.status(404).json({ message: "Slide not found." });
    }

    // Delete the file from the server
    const filePath = path.join(__dirname, "..", slide.image);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });

    // Delete the slide from the database using Prisma
    await prisma.slider.delete({
      where: { id },
    });

    res.status(200).json({ message: "Slide deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting slide.", error: error.message });
  }
};

module.exports = { createSlide, deleteSlide };
