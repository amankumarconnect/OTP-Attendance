import { updateAttendance } from "../controllers/studentControllers.js";

import express from "express";
const router = express.Router();

router.put("/student/update-attendance", updateAttendance);

export default router;