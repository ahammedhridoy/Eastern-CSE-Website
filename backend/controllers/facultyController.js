const prisma = require("../utils/prismaClient"); // Path to your Prisma client
const fs = require("fs");
const path = require("path");

// Create Faculty
const createFaculty = async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newFaculty = await prisma.faculty.create({
      data: {
        name,
        description,
        designation,
        image: imageUrl,
      },
    });

    res
      .status(201)
      .json({ message: "Faculty created successfully.", faculty: newFaculty });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating faculty.", error: error.message });
  }
};

// Get All Faculties
const getAllFaculties = async (req, res) => {
  try {
    const faculties = await prisma.faculty.findMany({
      orderBy: { createdAt: "desc" },
    });

    res
      .status(200)
      .json({ message: "Faculties fetched successfully.", faculties });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching faculties.", error: error.message });
  }
};

// Get Single Faculty
const getSingleFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the faculty using Prisma
    const faculty = await prisma.faculty.findUnique({
      where: { id },
    });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    res.status(200).json({ message: "Faculty fetched successfully.", faculty });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching faculty.", error: error.message });
  }
};

// Update Faculty
const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if the faculty exists
    const existingFaculty = await prisma.faculty.findUnique({
      where: { id },
    });

    if (!existingFaculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    // If a new image is uploaded, delete the old one
    if (imageUrl && existingFaculty.image) {
      const oldImagePath = path.join(__dirname, "..", existingFaculty.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    // Update the faculty
    const updatedFaculty = await prisma.faculty.update({
      where: { id },
      data: {
        name,
        description,
        designation,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    res.status(200).json({
      message: "Faculty updated successfully.",
      faculty: updatedFaculty,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating faculty.", error: error.message });
  }
};

// Delete Faculty
const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the faculty
    const faculty = await prisma.faculty.findUnique({
      where: { id },
    });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    // Delete the image file (if exists)
    if (faculty.image) {
      const filePath = path.join(__dirname, "..", faculty.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    // Delete the faculty
    await prisma.faculty.delete({
      where: { id },
    });

    res.status(200).json({ message: "Faculty deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting faculty.", error: error.message });
  }
};

module.exports = {
  createFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
  getSingleFaculty,
};
