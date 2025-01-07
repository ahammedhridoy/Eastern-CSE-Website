const prisma = require("../utils/prismaClient"); // Path to your Prisma client
const fs = require("fs");
const path = require("path");

// Create Alumni
const createAlumni = async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newAlumni = await prisma.alumni.create({
      data: {
        name,
        // batch,
        description,
        image: imageUrl,
        designation,
      },
    });

    res
      .status(201)
      .json({ message: "Alumni created successfully.", alumni: newAlumni });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating alumni.", error: error.message });
  }
};

// Get All Alumni
const getAllAlumni = async (req, res) => {
  try {
    const alumniList = await prisma.alumni.findMany({
      orderBy: { updatedAt: "desc" },
    });

    res
      .status(200)
      .json({ message: "Alumni fetched successfully.", alumni: alumniList });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching alumni.", error: error.message });
  }
};

// Update Alumni
const updateAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, designation } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if the alumni exists
    const existingAlumni = await prisma.alumni.findUnique({
      where: { id },
    });

    if (!existingAlumni) {
      return res.status(404).json({ message: "Alumni not found." });
    }

    // If a new image is uploaded, delete the old one
    if (imageUrl && existingAlumni.image) {
      const oldImagePath = path.join(__dirname, "..", existingAlumni.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    // Update the alumni
    const updatedAlumni = await prisma.alumni.update({
      where: { id },
      data: {
        name,
        // batch,
        description,
        designation,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    res
      .status(200)
      .json({ message: "Alumni updated successfully.", alumni: updatedAlumni });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating alumni.", error: error.message });
  }
};

// Delete Alumni
const deleteAlumni = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the alumni
    const alumni = await prisma.alumni.findUnique({
      where: { id },
    });

    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found." });
    }

    // Delete the image file (if exists)
    if (alumni.image) {
      const filePath = path.join(__dirname, "..", alumni.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    // Delete the alumni
    await prisma.alumni.delete({
      where: { id },
    });

    res.status(200).json({ message: "Alumni deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting alumni.", error: error.message });
  }
};

module.exports = {
  createAlumni,
  getAllAlumni,
  updateAlumni,
  deleteAlumni,
};
