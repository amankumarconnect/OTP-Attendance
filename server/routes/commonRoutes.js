import { getClassTitle } from "../controllers/commonControllers.js";

import express from "express";
const router = express.Router();

router.get("/get-class-title/:classID", getClassTitle);

export default router;
