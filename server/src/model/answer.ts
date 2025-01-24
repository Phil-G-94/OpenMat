import mongoose, { Document, Schema, ObjectId } from "mongoose";

interface IAnswer extends Document {
    questionId: ObjectId;
    authorId: ObjectId;
    content: string;
    upvotes: number;
    downvotes: number;
    // createdAt: Date;
    // updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>(
    {
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
    },
    { timestamps: true }
);

export const Answer = mongoose.model<IAnswer>("Answer", AnswerSchema);
