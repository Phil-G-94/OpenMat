import { Router } from "express";
const router = Router();
// signup route
router.post("/signup", (req, res, next) => {
    console.log(req.body); // correctly logs user to console.
    // create user with User model
    // save to DB
    res.status(200).json({ message: "Signup successful." });
});
// login route
router.post("/login", (req, res, next) => {
    console.log(req.body);
    // find user in DB
    res.status(200).json({ message: "Login successful" });
});
export { router };
