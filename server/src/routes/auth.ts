import { Router, Request, Response, NextFunction } from "express";

const router = Router();

// signup route
router.post(
    "/auth/signup",
    (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ message: "Signup successful." });
    }
);

// login route
router.post(
    "/auth/login",
    (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ message: "Login successful" });
    }
);

export { router };
