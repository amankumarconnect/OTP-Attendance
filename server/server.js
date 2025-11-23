import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import 'dotenv/config'
import facultyRoutes from "./routes/facultyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// use routes for faculty and student
app.use("/api", facultyRoutes);
app.use("/api", studentRoutes);
app.use("/auth", authRoutes);

// function to generate 6 digit random code
function generateRandomCode() {
  let code = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Generated code: ${code}`);
  return code;
}

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
