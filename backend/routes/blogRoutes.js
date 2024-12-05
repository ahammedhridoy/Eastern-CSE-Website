const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
} = require("../controllers/blogController");
const { verifyAdmin } = require("../controllers/authController");

const blogRouter = express.Router();

// Create a new blog
blogRouter.post("/create", verifyAdmin, upload.single("image"), createBlog);

// Get all posts
blogRouter.get("/all", getAllBlogs);

// Get Single post
blogRouter.get("/:id", getSingleBlog);

// Update a blog
blogRouter.put("/:id", verifyAdmin, upload.single("image"), updateBlog);

// Delete a blog
blogRouter.delete("/:id", verifyAdmin, deleteBlog);

module.exports = blogRouter;
