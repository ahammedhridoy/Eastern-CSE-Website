const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  verifyRole,
  authorized,
} = require("../controllers/authController");

const authRouter = express.Router();

// POST /api/v1/auth/register
authRouter.post("/register", verifyRole(["OFFICIAL"]), register);

// POST /api/v1/auth/login
authRouter.post("/login", login);

// POST /api/v1/auth/user/all
authRouter.get("/user/all", verifyRole(["OFFICIAL"]), getAllUsers);

// POST /api/v1/auth/user/:id
authRouter.get("/user/:id", verifyRole(["FACULTY", "OFFICIAL"]), getSingleUser);

// POST /api/v1/auth/user/update/:id
authRouter.patch("/user/update/:id", verifyRole(["OFFICIAL"]), updateUser);

// POST /api/v1/auth/user/delete/:id
authRouter.delete("/user/delete/:id", verifyRole(["OFFICIAL"]), deleteUser);

// POST /api/v1/auth/forgot-password
authRouter.post("/forgot-password", forgotPassword);

// POST /api/v1/auth/reset-password
authRouter.post("/reset-password", resetPassword);

// POST /api/v1/auth/logout
authRouter.post("/logout", logout);

// POST /api/v1/auth/logout
authRouter.post("/verify", verifyRole(["FACULTY", "OFFICIAL"]), authorized);

module.exports = authRouter;
