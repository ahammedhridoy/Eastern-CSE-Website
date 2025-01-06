const { PrismaClient } = require("@prisma/client");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoutes");
const sliderRouter = require("./routes/sliderRoutes");
const facultyRouter = require("./routes/facultyRoutes");
const blogRouter = require("./routes/blogRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const alumniRouter = require("./routes/alumniRoutes");
const albumRouter = require("./routes/albumRoutes");
const galleryRouter = require("./routes/galleryRoutes");
const aboutSliderRouter = require("./routes/aboutSliderRoutes");

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN_NAME,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

// Database connection check
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}
checkDatabaseConnection();

// Define API routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/slider", sliderRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/faculty", facultyRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/alumni", alumniRouter);
app.use("/api/v1/album", albumRouter);
app.use("/api/v1/gallery", galleryRouter);
app.use("/api/v1/about/slider", aboutSliderRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
