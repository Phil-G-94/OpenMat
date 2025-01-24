import { Router } from "express";
import { postSignup, postLogin } from "../controllers/auth.js";
const router = Router();
// signup route
router.post("/signup", postSignup);
// login route
router.post("/login", postLogin);
export { router };
