const express = require("express");
const {
  userRegister,
  userLogin,
  getAllUser,
} = require("../controllers/userController");

const userRouter = express.Router();

// Register user
userRouter.post("/user/create", userRegister);
// Login user
userRouter.post("/user/login", userLogin);
// Fetch all user
userRouter.get("/users", getAllUser);

module.exports = userRouter;
