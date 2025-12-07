import {
  createClass,
  getClasses,
  getDates,
  getDay,
  takeAttendance,
  changeStatus,
  getStudents,
  addStudent,
  deleteStudent,
} from "../controllers/facultyControllers.js";

import express from "express";
const router = express.Router();

router.post("/faculty/create-class", createClass);
router.get("/faculty/get-classes/:facultyID", getClasses);
router.get("/faculty/class/:classID", getDates);
router.get("/faculty/get-day/:classID/:date", getDay);
router.put("/faculty/take-attendance/:classID/:date", takeAttendance);
router.put("/faculty/change-status/:classID/:date/:studentID", changeStatus);
router.get("/faculty/get-students/:classID", getStudents);
router.post("/faculty/add-student/:classID", addStudent);
router.delete("/faculty/delete-student/:classID/:studentID", deleteStudent);

export default router;
