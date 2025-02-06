import { Router } from "express";
import {
    patchUpvotes,
    patchDownvotes,
    postAnswer,
} from "../controllers/answers.js";
const router = Router();
router.post("/answers", postAnswer);
router.patch("/answers/:id/upvotes", patchUpvotes);
router.patch("/answers/:id/downvotes", patchDownvotes);
export { router };
