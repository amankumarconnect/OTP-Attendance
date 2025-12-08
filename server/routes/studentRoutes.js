import {
  updateAttendance,
  getClassses,
  getDates,
} from "../controllers/studentControllers.js";

import express from "express";
const router = express.Router();

router.get("/student/get-classes/:studentID", getClassses);
router.get("/student/get-dates/:classID/:studentID", getDates);
router.patch("/student/update-attendance/:classID", updateAttendance);

export default router;
