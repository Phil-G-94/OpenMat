import { Request, Response, NextFunction } from "express";
import { Question } from "../model/question.js";
import { User } from "../model/user.js";
import { ObjectId } from "mongodb";

const getQuestions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const questions = await Question.find().populate("authorId");

        res.status(200).json({
            message: "Questions successfully fetched.",
            questions,
        });
    } catch (err) {
        next(err);
    }
};

const getQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const questionId = req.params.questionId;

    try {
        const question = await Question.findById(questionId)
            .populate("authorId")
            .populate("answers");

        res.status(200).json({ question });
    } catch (err) {
        next(err);
    }
};

const postQuestion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
};

export { getQuestions, getQuestion, postQuestion };
