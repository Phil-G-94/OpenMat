import mongoose, { Document, Schema, ObjectId } from "mongoose";

interface QuestionInterface extends Document {
    title: string;
    description: string;
    tags: [string];
    authorId: ObjectId;
    answers: [ObjectId];
    // createdAt: Date,
    // updatedAt: Date,
}

const QuestionSchema = new Schema<QuestionInterface>(
    {
        title: { type: "String", required: true },
        description: { type: "String", required: true },
        tags: { type: ["String"], required: true },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        answers: { type: [Schema.Types.ObjectId] },
    },
    { timestamps: true }
);

export const Question = mongoose.model<QuestionInterface>(
    "Question",
    QuestionSchema
);
