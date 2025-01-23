import { Router } from "express";
const router = Router();
// signup route
router.post("/signup", (req, res, next) => {
    console.log(req.body);
    res.status(200).json({ message: "Signup successful." });
});
// login route
router.post("/login", (req, res, next) => {
    res.status(200).json({ message: "Login successful" });
});
export { router };
