import { Router } from "express";

import { authJWT } from "../middleware/authJWT.js";
import {
    getQuestion,
    getQuestions,
    postQuestion,
} from "../controllers/questions.js";

const router = Router();

router.get("/questions", getQuestions);

router.get("/questions/:questionId", getQuestion);

router.post("/questions", authJWT, postQuestion);

export { router };
