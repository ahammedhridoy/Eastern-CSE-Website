const express = require("express");
const { upload } = require("../helpers/multer");
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
} = require("../controllers/blogController");
const {
  verifyAdmin,
  verifyUser,
  verifyEditor,
} = require("../controllers/authController");

const blogRouter = express.Router();

// Create a new blog
blogRouter.post(
  "/create",
  verifyUser,
  verifyEditor,
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
  verifyUser,
  verifyEditor,
  upload.single("image"),
  updateBlog
);

// Delete a blog
blogRouter.delete("/:id", verifyUser, verifyEditor, deleteBlog);

module.exports = blogRouter;
