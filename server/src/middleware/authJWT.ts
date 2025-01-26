import jwt from "jsonwebtoken";
import {
    Request,
    Response,
    NextFunction,
    RequestHandler,
} from "express";

export const authJWT: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Unauthorised access." });
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_Secret not set.");
    }

    try {
        const verifiedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        ) as { userId: string };

        req.userId = verifiedToken.userId;

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            err.statusCode = 401;
            err.message = "Session expired. Please log in again.";
        } else if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};
