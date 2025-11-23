import { updateAttendance, getClassses } from "../controllers/studentControllers.js";

import express from "express";
const router = express.Router();

router.get("/student/get-classes/:studentID", getClassses);
router.put("/student/update-attendance", updateAttendance);

export default router;