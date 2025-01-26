import { Router, Request, Response, NextFunction } from "express";
import { User } from "../model/user.js";
import { Question } from "../model/question.js";
import { authJWT } from "../middleware/authJWT.js";

const router = Router();

router.get(
    "/questions",
    (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
            message: "Questions successfully fetched.",
        });
    }
);

router.post(
    "/questions",
    authJWT,
    (req: Request, res: Response, next: NextFunction) => {
        const { post_title, post_body } = req.body;

        const question = new Question({
            title: post_title,
            description: post_body,
            authorId: req.userId,
        });

        question.save();

        res.status(200).json({
            message: "Question successfully posted.",
        });
    }
);
export { router };
