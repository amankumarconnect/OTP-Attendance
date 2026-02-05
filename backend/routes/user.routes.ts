import { Router } from "express";
import { signUp } from "../controllers/user.controllers";

const router = Router();

router.post("/", signUp);

export default router;
