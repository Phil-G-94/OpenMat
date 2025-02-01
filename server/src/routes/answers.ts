import { Router } from "express";
import { getAnswers, postAnswer } from "../controllers/answers.js";

const router = Router();

router.get("/answers", getAnswers);

router.post("/answers", postAnswer);

export { router };
