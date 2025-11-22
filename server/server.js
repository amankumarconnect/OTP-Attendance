import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import 'dotenv/config'
import facultyRoutes from "./routes/facultyRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// use routes from facultyRoutes.js
app.use("/api", facultyRoutes);

// function to generate 6 digit random code
function generateRandomCode() {
  let code = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Generated code: ${code}`);
  return code;
}

let generatedCode = "000000";
let lastUpdated = Date.now();

let generating = false;
let intervalId;

app.post("/code", (req, res) => {
  if (generating) {
    clearInterval(intervalId);
    console.log("Stopped code generation");
    generating = false;
  } else {
    generatedCode = generateRandomCode();
    lastUpdated = Date.now();

    intervalId = setInterval(() => {
      generatedCode = generateRandomCode();
      lastUpdated = Date.now();
    }, 15000);
    generating = true;
  }
  res.sendStatus(200);
});

app.get("/code", (req, res) => {
  res.json({
    code: generatedCode,
    lastUpdated: lastUpdated,
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
