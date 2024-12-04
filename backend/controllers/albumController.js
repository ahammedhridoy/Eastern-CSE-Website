const prisma = require("../utils/prismaClient"); // Path to your Prisma client
const fs = require("fs");
const path = require("path");
var slugify = require("slugify");

// Create Album
const createAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newAlbum = await prisma.album.create({
      data: {
        name,
        image: imageUrl,
        slug: slugify(name, {
          replacement: "-",
          lower: true,
        }),
      },
    });

    res
      .status(201)
      .json({ message: "Album created successfully.", album: newAlbum });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating album.", error: error.message });
  }
};

// Get All Albums
const getAllAlbums = async (req, res) => {
  try {
    const albums = await prisma.album.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ message: "Albums fetched successfully.", albums });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching albums.", error: error.message });
  }
};

// Update Album
const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // if(!id || !name) {

    const existingAlbum = await prisma.album.findUnique({
      where: { id },
    });

    if (!existingAlbum) {
      return res.status(404).json({ message: "Album not found." });
    }

    // If a new image is uploaded, delete the old one
    if (imageUrl && existingAlbum.image) {
      const oldImagePath = path.join(__dirname, "..", existingAlbum.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    const updatedAlbum = await prisma.album.update({
      where: { id },
      data: {
        name,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    res
      .status(200)
      .json({ message: "Album updated successfully.", album: updatedAlbum });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating album.", error: error.message });
  }
};

// Delete Album
const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the album and associated gallery images
    const album = await prisma.album.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!album) {
      return res.status(404).json({ message: "Album not found." });
    }

    // Delete the album image
    if (album.image) {
      const albumImagePath = path.join(__dirname, "..", album.image);
      fs.unlink(albumImagePath, (err) => {
        if (err) console.error("Error deleting album image:", err);
      });
    }

    // Delete associated gallery images
    for (const gallery of album.images) {
      const galleryImagePath = path.join(__dirname, "..", gallery.image);
      fs.unlink(galleryImagePath, (err) => {
        if (err) console.error("Error deleting gallery image:", err);
      });
    }

    // Delete the album and associated gallery records
    await prisma.album.delete({
      where: { id },
    });

    res.status(200).json({ message: "Album deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting album.", error: error.message });
  }
};

module.exports = {
  createAlbum,
  getAllAlbums,
  updateAlbum,
  deleteAlbum,
};
