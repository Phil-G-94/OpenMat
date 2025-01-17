import { Router } from "express";
const router = Router();
// signup route
router.post("/auth/signup", (req, res, next) => {
    res.status(200).json({ message: "Signup successful." });
});
// login route
router.post("/auth/login", (req, res, next) => {
    res.status(200).json({ message: "Login successful" });
});
export { router };
