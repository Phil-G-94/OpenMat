import { Router } from "express";
import {
    patchUpvotes,
    patchDownvotes,
    postAnswer,
    postAIAnswer,
} from "../controllers/answers.js";
const router = Router();
router.post("/answers", postAnswer);
router.post("/answers/ai-answer", postAIAnswer);
router.patch("/answers/:id/upvotes", patchUpvotes);
router.patch("/answers/:id/downvotes", patchDownvotes);
export { router };
