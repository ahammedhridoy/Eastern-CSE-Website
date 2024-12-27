const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  verifyAdmin,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  verifyUser,
  verifyEditor,
  verifyRole,
} = require("../controllers/authController");
const adminAuthMiddleware = require("../middleware/adminAuth");

const authRouter = express.Router();

// POST /api/v1/auth/register
authRouter.post("/register", register);

// POST /api/v1/auth/login
authRouter.post("/login", login);

// POST /api/v1/auth/user/all
authRouter.get("/user/all", verifyRole(["ADMIN"]), getAllUsers);

// POST /api/v1/auth/user/:id
authRouter.get("/user/:id", verifyRole(["EDITOR", "ADMIN"]), getSingleUser);

// POST /api/v1/auth/user/update/:id
authRouter.patch("/user/update/:id", verifyRole(["ADMIN"]), updateUser);

// POST /api/v1/auth/user/delete/:id
authRouter.delete("/user/delete/:id", verifyRole(["ADMIN"]), deleteUser);

// POST /api/v1/auth/forgot-password
authRouter.post("/forgot-password", forgotPassword);

// POST /api/v1/auth/reset-password
authRouter.post("/reset-password", resetPassword);

// POST /api/v1/auth/logout
authRouter.post("/logout", logout);

module.exports = authRouter;
