const prisma = require("../utils/prismaClient"); // Path to your Prisma client
const fs = require("fs");
const path = require("path");

// Create Teacher
const createTeacher = async (req, res) => {
  try {
    const { name, designation, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newTeacher = await prisma.teacher.create({
      data: {
        name,
        designation,
        description,
        image: imageUrl,
      },
    });

    res
      .status(201)
      .json({ message: "Teacher created successfully.", teacher: newTeacher });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating teacher.", error: error.message });
  }
};

// Get All Teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { updatedAt: "desc" },
    });

    res
      .status(200)
      .json({ message: "Teachers fetched successfully.", teachers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching teachers.", error: error.message });
  }
};

// Update Teacher
const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if the teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id },
    });

    if (!existingTeacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    // If a new image is uploaded, delete the old one
    if (imageUrl && existingTeacher.image) {
      const oldImagePath = path.join(__dirname, "..", existingTeacher.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    // Update the teacher
    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: {
        name,
        designation,
        description,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    res.status(200).json({
      message: "Teacher updated successfully.",
      teacher: updatedTeacher,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating teacher.", error: error.message });
  }
};

// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the teacher
    const teacher = await prisma.teacher.findUnique({
      where: { id },
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }

    // Delete the image file (if exists)
    if (teacher.image) {
      const filePath = path.join(__dirname, "..", teacher.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    // Delete the teacher
    await prisma.teacher.delete({
      where: { id },
    });

    res.status(200).json({ message: "Teacher deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting teacher.", error: error.message });
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
};
