const bcrypt = require("bcryptjs");
const { verify, decode, sign } = require("jsonwebtoken");
const prisma = require("../utils/prismaClient");
const {
  sendPasswordResetEmail,
  validateTokenAndGetEmail,
  updatePassword,
  invalidateToken,
} = require("../helpers/utils");

/**
 * METHOD: POST
 * API: /api/v1/auth/register
 */
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  // validate user input
  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const data = {
      email,
      password: hashedPassword,
      name,
      role,
    };
    const user = await prisma.user.create({
      data,
    });

    // Remove the password field from the user object
    delete user?.password;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * METHOD: POST
 * API: /api/v1/auth/login
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // compare passwords
    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // verify token
    const token = sign(
      { userId: user.id, email: user?.email, role: user?.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    // Remove the password field from the user object
    delete user.password;
    // set token in cookie
    res.cookie("token", token, { httpOnly: true });
    res.cookie("user", user, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

/**
 * METHOD: POST
 * API: /api/v1/auth/forgot-password
 */
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(404).json({ message: "No email found!" });
  try {
    // Check if the email exists in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const encoded = sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await prisma.resetToken.create({
      data: {
        email,
        token: encoded,
      },
    });

    // Send password reset email
    await sendPasswordResetEmail(email, encoded);

    res.status(200).json({ message: "Password reset email sent", encoded });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error on forgot password" });
  }
};

/**
 * METHOD: POST
 * API: /api/v1/auth/reset-password
 */
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword)
    return res
      .status(400)
      .json({ message: "Please provide both token and new password" });

  try {
    const email = await validateTokenAndGetEmail(token);
    if (!email) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    await updatePassword(email, newPassword);
    await invalidateToken(token);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error on reset password" });
  }
};

const logout = async (req, res) => {
  if (!req.cookies?.token)
    return res.status(204).json({ message: "Request cookies not found!" });

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("user", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "You are logged out" });
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
};
