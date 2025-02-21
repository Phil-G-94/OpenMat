import { Question } from "../model/question.js";
import { User } from "../model/user.js";
const getQuestions = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    try {
        const questions = await Question.find()
            .populate("authorId")
            .skip(skip)
            .limit(limit);
        const totalQuestions = await Question.countDocuments();
        res.status(200).json({
            message: "Questions successfully fetched.",
            questions,
            totalPages: Math.ceil(totalQuestions / limit),
            page,
            limit,
        });
    } catch (err) {
        next(err);
    }
};
const getQuestion = async (req, res, next) => {
    const questionId = req.params.questionId;
    try {
        const question = await Question.findById(questionId)
            .populate("authorId")
            .populate({
                path: "answers",
                populate: { path: "authorId" },
            });
        res.status(200).json({ question });
    } catch (err) {
        next(err);
    }
};
const postQuestion = async (req, res, next) => {
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
