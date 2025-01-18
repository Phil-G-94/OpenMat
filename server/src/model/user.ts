import mongoose, { Document, Schema } from "mongoose";

interface UserInterface extends Document {
    username: string;
    email: string;
    password: string;
    reputation: number;
    rank: string;
}

const UserSchema = new Schema<UserInterface>(
    {
        username: { type: "String", required: true, unique: true },
        email: { type: "String", required: true, unique: true },
        password: { type: "String", required: true },
        reputation: { type: "Number" },
        rank: { type: "String", default: "Rookie" },
    },
    { timestamps: true }
);

export const User = mongoose.model<UserInterface>("User", UserSchema);
