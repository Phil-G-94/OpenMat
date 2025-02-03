import { Router } from "express";
import { postAnswer } from "../controllers/answers.js";

const router = Router();

router.post("/answers", postAnswer);

export { router };
