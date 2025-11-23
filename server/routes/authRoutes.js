import { exchangeCodeForTokens, refreshTheToken} from "../controllers/authControllers.js";

import express from "express";
const router = express.Router();

router.post("/google", exchangeCodeForTokens);
router.post("/google/refresh-token", refreshTheToken);

export default router;