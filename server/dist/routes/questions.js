import { Router } from "express";
import { User } from "../model/user.js";
import { Question } from "../model/question.js";
import { authJWT } from "../middleware/authJWT.js";
const router = Router();
router.get("/questions", async (req, res, next) => {
    try {
        const questions = await Question.find();
        res.status(200).json({
            message: "Questions successfully fetched.",
            questions,
        });
    } catch (err) {
        next(err);
    }
});
router.post("/questions", authJWT, async (req, res, next) => {
    const { post_title, post_body } = req.body;
    try {
        const user = await User.findById(req.userId);
        const question = new Question({
            title: post_title,
            description: post_body,
            authorId: user,
        });
        await question.save();
        res.status(200).json({
            message: "Question successfully posted.",
        });
    } catch (err) {
        next(err);
    }
});
export { router };
