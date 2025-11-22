import { getCode } from "../controllers/studentControllers.js";

import express from "express";
const router = express.Router();

router.get("/student/get-code/:classID", getCode);

export default router;