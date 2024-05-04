const { PrismaClient } = require("@prisma/client");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParse = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const questionRouter = require("./routes/questionRoute");
const prisma = new PrismaClient();
dotenv.config();

const app = express();
app.use(express.json());
const corsOptions = {
  // origin: ["http://localhost:5173"],
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Use App
app.use("/api", userRouter);
app.use("/api", questionRouter);
