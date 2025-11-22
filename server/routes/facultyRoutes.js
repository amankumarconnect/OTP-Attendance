import { createClass, getClasses, getDates, getDay } from "../controllers/facultyControllers.js";

import express from "express";
const router = express.Router();

router.post("/faculty/create-class", createClass);
router.get("/faculty/get-classes/:facultyID", getClasses);
router.get("/faculty/get-dates/:classID", getDates);
router.get("/faculty/get-day/:classID/:date", getDay);

export default router;