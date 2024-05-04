const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// User Registration
const userRegister = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    // validate user input
    if (!email || !password || !username || !role) {
      return res.status(400).json({ error: "Please enter all fields" });
    }
    // check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const data = {
      email,
      password: hashedPassword,
      username,
      role,
    };
    const users = await prisma.user.create({
      data,
    });

    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // verify token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
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
    res.status(500).json({ error: "Error logging in" });
  }
};

// Get All User
const getAllUser = async (req, res) => {
  try {
    let users = await prisma.user.findMany();
    // Remove the password field from each user object
    users = users.map((user) => {
      delete user.password;
      return user;
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting all users" });
  }
};

module.exports = { userRegister, userLogin, getAllUser };
