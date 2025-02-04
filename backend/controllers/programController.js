const prisma = require("../utils/prismaClient"); // Path to your Prisma client
const fs = require("fs");
const path = require("path");

// Create Program
const createProgram = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newProgram = await prisma.program.create({
      data: {
        title,
        description,
        image: imageUrl,
      },
    });

    res
      .status(201)
      .json({ message: "Program created successfully.", program: newProgram });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating program.", error: error.message });
  }
};

// Get All Programs
const getAllPrograms = async (req, res) => {
  try {
    // Fetch all blogs from the database
    const programs = await prisma.program.findMany({
      orderBy: { updatedAt: "desc" },
    });

    res
      .status(200)
      .json({ message: "Programs fetched successfully.", programs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching programs.", error: error.message });
  }
};

// Fetch single program by ID
const getSingleProgram = async (req, res) => {
  const { id } = req.params;

  try {
    const program = await prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      return res.status(404).json({ message: "Program not found." });
    }

    res.status(200).json({ message: "Program fetched successfully.", program });
  } catch (error) {
    console.error("Error fetching program:", error);
    res
      .status(500)
      .json({ message: "Error fetching program.", error: error.message });
  }
};

// Update Program
const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if the program exists
    const existingProgram = await prisma.program.findUnique({
      where: { id },
    });

    if (!existingProgram) {
      return res.status(404).json({ message: "program not found." });
    }

    // If a new image is uploaded, delete the old one
    if (imageUrl && existingProgram.image) {
      const oldImagePath = path.join(__dirname, "..", existingProgram.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    // Update the program
    const updatedProgram = await prisma.program.update({
      where: { id },
      data: {
        title,
        description,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    if (!updatedProgram) {
      return res
        .status(500)
        .json({ message: "Error updating program.", error: error.message });
    }

    res
      .status(200)
      .json({ message: "Program updated successfully.", blog: updatedProgram });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating program.", error: error.message });
  }
};

// Delete Program
const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog
    const program = await prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      return res.status(404).json({ message: "program not found." });
    }

    // Delete the image file (if exists)
    if (program.image) {
      const filePath = path.join(__dirname, "..", program.image);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err.message); // Log specific error message
        }
      });
    }

    // Delete the program
    await prisma.program.delete({
      where: { id },
    });

    res.status(200).json({ message: "program deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting program.", error: error.message });
  }
};

module.exports = {
  createProgram,
  getAllPrograms,
  getSingleProgram,
  updateProgram,
  deleteProgram,
};
