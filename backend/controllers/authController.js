const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prismaClient");
const {
  sendPasswordResetEmail,
  validateTokenAndGetEmail,
  updatePassword,
  invalidateToken,
} = require("../helpers/utils");
const generateToken = require("../utils/generateToken");
const setTokensCookies = require("../utils/setTokensCookies");

/**
 * METHOD: POST
 * API: /api/v1/auth/register
 */
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate user input
  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const data = {
      email,
      password: hashedPassword,
      name,
      role,
    };

    const user = await prisma.user.create({ data });

    // Remove the password field from the user object before sending the response
    delete user.password;

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * METHOD: POST
 * API: /api/v1/auth/login
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { accessToken, accessTokenExp } = await generateToken(user);

    // Remove sensitive data
    const { password: _, ...userWithoutPassword } = user;

    // Set token in cookie
    setTokensCookies(res, accessToken, accessTokenExp);

    res.cookie("user", JSON.stringify(userWithoutPassword), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      accessToken,
      accessTokenExp,
      isAuthenticated: true,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({ message: "Users fetched successfully.", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users.", error: error.message });
  }
};

// Get User by ID
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ message: "Error fetching user.", error: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    // Validate required fields
    if (!name || !email || !role) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Initialize an object to hold the updated data
    const updatedData = {
      name,
      email,
      role,
    };

    // If a new password is provided, hash it and add it to updatedData
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword; // Add hashed password to update data
    }

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData, // Use the updatedData object
    });

    res
      .status(200)
      .json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user.", error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request parameters

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Error deleting user.", error: error.message });
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
  try {
    // Clear the cookies related to authentication
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict", // Adjust based on your application needs
    });

    res.clearCookie("user", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict", // Adjust based on your application needs
    });

    // Optionally, you can clear additional cookies if required
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "An error occurred during logout" });
  }
};

const verifyEditor = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req?.cookies?.accessToken; // Adjust token name if different
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Find user in the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Check if the user's role is EDITOR
    if (user.role !== "EDITOR") {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    // Attach user to the request object (optional)
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    // Get token from cookies
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Find user in the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Check if the user's role is ADMIN
    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    // Attach user to the request object (optional)
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const authorized = (req, res) => {
  res.status(200).json({ message: "Authorized" });
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  verifyEditor,
  verifyAdmin,
  authorized,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
