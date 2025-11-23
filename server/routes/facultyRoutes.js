import { createClass, getClasses, getDates, getDay, updateCode, changeStatus} from "../controllers/facultyControllers.js";

import express from "express";
const router = express.Router();

router.post("/faculty/create-class", createClass);
router.get("/faculty/get-classes/:facultyID", getClasses);
router.get("/faculty/class/:classID", getDates);
router.get("/faculty/get-day/:classID/:date", getDay);
router.put("/faculty/update-code/:classID", updateCode);
router.put("/faculty/change-status/:classID/:date/:studentID", changeStatus);

export default router;