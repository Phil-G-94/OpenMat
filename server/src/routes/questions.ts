import { Router, Request, Response, NextFunction } from "express";
import { authJWT } from "../middleware/authJWT.js";

const router = Router();

router.get(
    "/questions",
    authJWT,
    (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({
            message: "Successfully hit endpoint",
        });
    }
);

export { router };
