import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.token;

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorised access." });
    }

    try {
        const verifiedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = verifiedToken;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
