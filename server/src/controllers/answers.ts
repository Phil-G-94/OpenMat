import { Response, Request, NextFunction } from "express";
import { Question } from "../model/question.js";
import { Answer } from "../model/answer.js";
import mongoose from "mongoose";

const getAnswers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
    } catch (err) {
        next(err);
    }
};

const postAnswer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const questionId = req.body.questionId;
    const authorId = req.body.authorId;
    const content = req.body.content;

    try {
        const question = await Question.findById(questionId);

        const newAnswer = new Answer({
            questionId,
            authorId,
            content,
            upvotes: 0,
            downvotes: 0,
        });

        await newAnswer.save();

        question.answers.push(
            newAnswer._id as mongoose.Types.ObjectId
        );

        await question.save();

        res.status(200).json({
            message: "Posted your answer to the thread!",
        });
    } catch (err) {
        next(err);
    }
};

export { getAnswers, postAnswer };
