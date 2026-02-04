import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 3000;

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port at http://localhost:${PORT}`);
});
