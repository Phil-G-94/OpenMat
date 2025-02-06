import { Question } from "../model/question.js";
import { Answer } from "../model/answer.js";
const postAnswer = async (req, res, next) => {
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
        question.answers.push(newAnswer._id);
        await question.save();
        res.status(200).json({
            message: "Posted your answer to the thread!",
        });
    } catch (err) {
        next(err);
    }
};
const patchUpvotes = async (req, res, next) => {
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
const patchDownvotes = async (req, res, next) => {
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
export { postAnswer, patchUpvotes, patchDownvotes };
