const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { verifyAdmin } = require("../controllers/authController");

const blogRouter = express.Router();

// Create a new blog
blogRouter.post("/create", verifyAdmin, upload.single("image"), createBlog);

// Get all posts
blogRouter.get("/all", getAllBlogs);

// Update a blog
blogRouter.put("/:id", updateBlog);

// Delete a blog
blogRouter.delete("/:id", deleteBlog);

module.exports = blogRouter;
