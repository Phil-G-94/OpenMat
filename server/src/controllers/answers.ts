import { Response, Request, NextFunction } from "express";
import { Question } from "../model/question.js";
import { Answer } from "../model/answer.js";
import mongoose from "mongoose";
import { User } from "../model/user.js";

const postAnswer = async (req: Request, res: Response, next: NextFunction) => {
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

        question.answers.push(newAnswer._id as mongoose.Types.ObjectId);

        await question.save();

        await User.findByIdAndUpdate(authorId, {
            $inc: { answerCount: 1 },
        });

        res.status(200).json({
            message: "Posted your answer to the thread!",
        });
    } catch (err) {
        next(err);
    }
};

const postAIAnswer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { questionId } = req.body;

        const question = await Question.findById(questionId);

        const response = await fetch(
            `http://${process.env.OLLAMA_VM_HOST}:${process.env.OLLAMA_VM_PORT}/api/generate`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gemma:7b",
                    prompt: question.description,
                    stream: false,
                }),
            }
        );

        const data = await response.json();

        res.json({ aiAnswer: data.response });
    } catch (err) {
        next(err);
    }
};

const patchUpvotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const answer = await Answer.findByIdAndUpdate(
            id,
            { $inc: { upvotes: 1 } },
            { new: true }
        );

        if (!answer) {
            res.status(404).json({ message: "Answer not found" });
            return;
        }

        const currentUpvotes = answer.upvotes;

        res.status(200).json({ upvotes: currentUpvotes });
    } catch (err) {
        next(err);
    }
};

const patchDownvotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const answer = await Answer.findByIdAndUpdate(
            id,
            { $inc: { downvotes: 1 } },
            { new: true }
        );

        if (!answer) {
            res.status(404).json({ message: "Answer not found" });
            return;
        }

        const currentDownvotes = answer.downvotes;

        res.status(200).json({ downvotes: currentDownvotes });
    } catch (err) {
        next(err);
    }
};

export { postAnswer, postAIAnswer, patchUpvotes, patchDownvotes };
