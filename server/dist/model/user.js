import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
    {
        username: { type: "String", required: true, unique: true },
        email: { type: "String", required: true, unique: true },
        password: { type: "String", required: true },
        reputation: { type: "Number" },
        rank: { type: "String", default: "Rookie" },
    },
    { timestamps: true }
);
export const User = mongoose.model("User", UserSchema);
