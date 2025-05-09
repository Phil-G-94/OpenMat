import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
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
export const User = mongoose.model("User", UserSchema);
