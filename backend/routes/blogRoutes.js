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
  verifyRole,
} = require("../controllers/authController");

const blogRouter = express.Router();

// Create a new blog
blogRouter.post(
  "/create",
  verifyRole(["EDITOR", "ADMIN"]),
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
  verifyRole(["EDITOR", "ADMIN"]),
  upload.single("image"),
  updateBlog
);

// Delete a blog
blogRouter.delete("/:id", verifyRole(["EDITOR", "ADMIN"]), deleteBlog);

module.exports = blogRouter;
