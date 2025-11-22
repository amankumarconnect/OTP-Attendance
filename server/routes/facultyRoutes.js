import { createClass, getClasses } from "../controllers/facultyControllers.js";

import express from "express";
const router = express.Router();

router.post("/faculty/create-class", createClass);
router.get("/faculty/get-classes/:facultyID", getClasses);

export default router;