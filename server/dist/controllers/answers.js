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
export { postAnswer };
