const { PrismaClient } = require("@prisma/client");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParse = require("body-parser");
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
const prisma = new PrismaClient();
dotenv.config();

const app = express();
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(bodyParse.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the 'server/uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

async function checkDatabaseConnection() {
  try {
    console.log("Database connected!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}
checkDatabaseConnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Use App

// Auth
app.use("/api/v1/auth", authRouter);
// Slider
app.use("/api/v1/slider", sliderRouter);
// Blogs
app.use("/api/v1/blog", blogRouter);
// Faculty
app.use("/api/v1/faculty", facultyRouter);
// Teacher
app.use("/api/v1/teacher", teacherRouter);
// Alumni
app.use("/api/v1/alumni", alumniRouter);
// Album
app.use("/api/v1/album", albumRouter);
// Gallery
app.use("/api/v1/gallery", galleryRouter);
// About Sliders
app.use("/api/v1/about/slider", aboutSliderRouter);
