import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";
const postSignup = async (req, res, next) => {
    try {
        const { signup_username, signup_email, signup_password } = req.body;
        const existingUser = await User.findOne({
            email: signup_email,
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists. Please log in.",
            });
        }
        // hash user password
        const hashedPassword = await bcrypt.hash(signup_password, 10);
        // create user with User model
        const user = new User({
            username: signup_username,
            email: signup_email,
            password: hashedPassword,
            reputation: 0,
            rank: "Rookie",
        });
        // save to DB
        await user.save();
        res.status(200).json({ message: "Signup successful." });
    } catch (err) {
        next(err);
    }
};
const postLogin = async (req, res, next) => {
    const { login_username, login_password } = req.body;
    try {
        // find user in DB
        const existingUser = await User.findOne({
            username: login_username,
        });
        if (!existingUser) {
            return res
                .status(400)
                .json({ message: "User not found. Please sign up." });
        }
        // password comparison
        const isValidPassword = await bcrypt.compare(
            login_password,
            existingUser.password
        );
        if (!isValidPassword) {
            return res.status(400).json({ message: "Incorrect credentials." });
        }
        // sign token
        const token = jwt.sign(
            { userId: existingUser._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        // set token through cookies
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });
        res.status(200).json({
            message: "Login successful",
        });
    } catch (err) {
        next(err);
    }
};
export { postSignup, postLogin };
