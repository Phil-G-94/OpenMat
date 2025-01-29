import mongoose, { Schema } from "mongoose";
const AnswerSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: { type: String, required: true },
    upvotes: { type: Number },
    downvotes: { type: Number },
}, { timestamps: true });
export const Answer = mongoose.model("Answer", AnswerSchema);
