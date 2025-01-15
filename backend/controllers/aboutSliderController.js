const fs = require("fs");
const path = require("path");
const prisma = require("../utils/prismaClient");

const createAboutSlide = async (req, res) => {
  try {
    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "No images provided for upload." });
    }

    // Prepare slide data for Prisma
    const slides = req.files.map((file) => ({
      image: `/uploads/${file.filename}`, // Adjust to match your upload folder path
    }));

    // Save all slides to the database using Prisma
    await prisma.aboutslider.createMany({
      data: slides,
    });

    res.status(201).json({ message: "Slides created successfully." });
  } catch (error) {
    console.error("Error creating slides:", error);
    res
      .status(500)
      .json({ message: "Error creating slides.", error: error.message });
  }
};

// Get All Slides
const getAboutAllSlides = async (req, res) => {
  try {
    const slides = await prisma.aboutslider.findMany({
      orderBy: { updatedAt: "desc" },
    });

    res.status(200).json({ message: "Slides fetched successfully.", slides });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching slides.", error: error.message });
  }
};

// Update a slide
const updateAboutSlide = async (req, res) => {
  try {
    const { id } = req.params; // Get slide ID from the request params
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate slide existence
    const existingSlide = await prisma.aboutslider.findUnique({
      where: { id },
    });

    if (!existingSlide) {
      return res.status(404).json({ message: "Slide not found" });
    }

    // If a new image is uploaded, delete the old image
    if (imageUrl && existingSlide.image) {
      const oldImagePath = path.resolve(
        __dirname,
        "..",
        "uploads",
        existingSlide.image.split("/").pop()
      ); // Ensure correct file path
      fs.unlink(oldImagePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting old image:", err);
        } else if (!err) {
          console.log("Old image deleted successfully:", oldImagePath);
        }
      });
    }

    // Update the slide record
    const updatedSlide = await prisma.aboutslider.update({
      where: { id },
      data: {
        ...(imageUrl && { image: imageUrl }), // Update the image if a new one is provided
        ...req.body, // Update other fields from the request body
      },
    });

    res
      .status(200)
      .json({ message: "Slide updated successfully", slide: updatedSlide });
  } catch (error) {
    console.error("Error updating slide:", error);
    res
      .status(500)
      .json({ message: "Error updating slide", error: error.message });
  }
};

// Delete a slide
const deleteAboutSlide = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the slide by ID using Prisma
    const slide = await prisma.aboutslider.findUnique({
      where: { id },
    });

    if (!slide) {
      return res.status(404).json({ message: "Slide not found." });
    }

    // Delete the file from the server
    if (slide.image) {
      const filePath = path.resolve(
        __dirname,
        "..",
        "uploads",
        slide.image.split("/").pop()
      ); // Ensure correct file path
      fs.unlink(filePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting file:", err);
        } else if (!err) {
          console.log("Image deleted successfully:", filePath);
        }
      });
    }

    // Delete the slide from the database using Prisma
    await prisma.aboutslider.delete({
      where: { id },
    });

    res.status(200).json({ message: "Slide deleted successfully." });
  } catch (error) {
    console.error("Error deleting slide:", error);
    res
      .status(500)
      .json({ message: "Error deleting slide.", error: error.message });
  }
};

module.exports = {
  createAboutSlide,
  deleteAboutSlide,
  getAboutAllSlides,
  updateAboutSlide,
};
