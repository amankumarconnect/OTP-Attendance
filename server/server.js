import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// function to generate 6 digit random code
function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

let generatedCode = generateRandomCode();
let lastUpdated = Date.now();

setInterval(() => {
  generatedCode = generateRandomCode();
  lastUpdated = Date.now();
}, 15000);

app.get("/", (req, res) => {
  res.json({
    code: generatedCode,
    lastUpdated: lastUpdated,
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});