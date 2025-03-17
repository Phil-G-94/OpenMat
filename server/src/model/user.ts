import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    reputation?: number;
    rank: string;
    answerCount: number;
}

const UserSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        reputation: { type: Number, default: 0 },
        rank: { type: String, default: "Rookie" },
        answerCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
