const prisma = require("../utils/prismaClient"); // Path to your Prisma client
const fs = require("fs");
const path = require("path");

// Create Blog
const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newBlog = await prisma.blog.create({
      data: {
        title,
        description,
        image: imageUrl,
      },
    });

    res
      .status(201)
      .json({ message: "Blog created successfully.", blog: newBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating blog.", error: error.message });
  }
};

// Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    // Fetch all blogs from the database
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ message: "Blogs fetched successfully.", blogs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs.", error: error.message });
  }
};

// Fetch single blog by ID
const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res
      .status(500)
      .json({ message: "Error fetching blog.", error: error.message });
  }
};

// Update Blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if the blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // If a new image is uploaded, delete the old one
    if (imageUrl && existingBlog.image) {
      const oldImagePath = path.join(__dirname, "..", existingBlog.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    // Update the blog
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        description,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    if (!updatedBlog) {
      return res
        .status(500)
        .json({ message: "Error updating blog.", error: error.message });
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully.", blog: updatedBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating blog.", error: error.message });
  }
};

// Delete Blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // Delete the image file (if exists)
    if (blog.image) {
      const filePath = path.join(__dirname, "..", blog.image);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err.message); // Log specific error message
        }
      });
    }

    // Delete the blog
    await prisma.blog.delete({
      where: { id },
    });

    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting blog.", error: error.message });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
};
