import dotenv from "dotenv";
import express, {
    urlencoded,
    json,
    Request,
    Response,
    NextFunction,
    Express,
} from "express";
import cors from "cors";
import { CustomError } from "./utils/error.js";
import { router as authRoutes } from "./routes/auth.js";
import { router as questionsRoutes } from "./routes/questions.js";
import { router as answersRoutes } from "./routes/answers.js";
import { router as leaderboardRoute } from "./routes/leaderboard.js";
import connectToDatabase from "./database/connection.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { authJWT } from "./middleware/authJWT.js";

// load env variables
dotenv.config();

// initialise express app
const app: Express = express();

// CORS middleware

const allowedOrigins = ["http://localhost:5173", "https://openmat.onrender.com"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.options("*", cors());

// middleware
app.use(urlencoded({ extended: true }));

app.use(json({}));

app.use(cookieParser());

// routes
app.get("/", (req: Request, res: Response) => {
    res.status(200);
});

app.get("/secure", authJWT, (req: Request, res: Response) => {
    res.status(200).json({ message: "Auth successful" });
});

app.use("/auth", authRoutes);

app.use(questionsRoutes);

app.use(answersRoutes);

app.use(leaderboardRoute);

// error-handling middleware
app.use(
    (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) {
            return next(err);
        }

        const status = err instanceof CustomError ? err.statusCode : 500;

        const message = err.message;

        const data = err instanceof CustomError ? err.data : null;

        res.status(status)
            .set("Content-Type", "application/json")
            .json({ message, data });
    }
);

// start http server
(async function startServer() {
    const PORT = Number(process.env.PORT) || 8080;

    // db uri
    const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_PATH}`;

    try {
        await connectToDatabase(dbUri);
        app.listen(PORT, "0.0.0.0", () => {
            console.log("Server is running on port", process.env.PORT || 8080);
        });
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
})();

// graceful shutdown handling

const handleShutdown = async (signal: string) => {
    console.log(`${signal} received. Closing database connection...`);

    await mongoose.disconnect();

    console.log("Database connection closed. Exiting process.");

    process.exit(0);
};

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
