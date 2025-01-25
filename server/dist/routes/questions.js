import { Router } from "express";
import { authJWT } from "../middleware/authJWT.js";
const router = Router();
router.get("/questions", authJWT, (req, res, next) => {
    res.status(200).json({
        message: "Successfully hit endpoint",
    });
});
export { router };
