const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
} = require("../controllers/blogController");
const { verifyRole } = require("../controllers/authController");

const blogRouter = express.Router();

// Create a new blog
blogRouter.post(
  "/create",
  verifyRole(["FACULTY", "OFFICIAL"]),
  upload.single("image"),
  createBlog
);

// Get all posts
blogRouter.get("/all", getAllBlogs);

// Get Single post
blogRouter.get("/:id", getSingleBlog);

// Update a blog
blogRouter.put(
  "/:id",
  verifyRole(["FACULTY", "OFFICIAL"]),
  upload.single("image"),
  updateBlog
);

// Delete a blog
blogRouter.delete("/:id", verifyRole(["FACULTY", "OFFICIAL"]), deleteBlog);

module.exports = blogRouter;
