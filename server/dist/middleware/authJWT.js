import jwt from "jsonwebtoken";
export const authJWT = (req, res, next) => {
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
