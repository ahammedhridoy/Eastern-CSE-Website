const prisma = require("../utils/prismaClient"); // Path to your Prisma client
const fs = require("fs");
const path = require("path");

// Add Multiple Images to Gallery
const addImagesToGallery = async (req, res) => {
  try {
    const { albumId } = req.body;

    // Check if album exists
    const album = await prisma.album.findUnique({ where: { id: albumId } });
    if (!album) {
      return res.status(404).json({ message: "Album not found." });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "No images provided for upload." });
    }

    // Prepare gallery data for Prisma
    const galleryData = req.files.map((file) => ({
      image: `/uploads/${file.filename}`,
      albumId,
    }));

    // Save all images in the gallery
    const newImages = await prisma.gallery.createMany({
      data: galleryData,
    });

    res.status(201).json({
      message: "Images added to gallery successfully.",
      count: newImages.count,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error adding images to gallery.",
        error: error.message,
      });
  }
};

// Get Images of an Album
const getImagesByAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;

    const images = await prisma.gallery.findMany({
      where: { albumId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ message: "Images fetched successfully.", images });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching images.", error: error.message });
  }
};

// Delete Image from Gallery
const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found." });
    }

    // Delete the image file
    const filePath = path.join(__dirname, "..", image.image);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting image file:", err);
    });

    // Delete the gallery record
    await prisma.gallery.delete({
      where: { id },
    });

    res.status(200).json({ message: "Gallery image deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting gallery image.", error: error.message });
  }
};

module.exports = {
  addImagesToGallery,
  getImagesByAlbum,
  deleteGalleryImage,
};
