import dotenv from "dotenv";
import express, {
    urlencoded,
    json,
    Request,
    Response,
    NextFunction,
} from "express";
import { CustomError } from "./utils/error.js";
import { router as authRoutes } from "./routes/auth.js";

// load env variables
dotenv.config();

// initialise express app
const app = express();

// middleware
app.use(urlencoded({ extended: true }));

app.use(json({}));

// routes
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World" });
});

app.use(authRoutes);

// error-handling middleware
app.use(
    (
        err: Error | CustomError,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const status =
            err instanceof CustomError ? err.statusCode : 500;

        const message = err.message;

        const data = err instanceof CustomError ? err.data : null;

        res.status(status)
            .set("Content-Type", "application/json")
            .json({ message, data });
    }
);

// start http server
(async function startServer() {
    try {
        app.listen(process.env.PORT || 8080, () => {
            console.log(
                "Server is running on port",
                process.env.PORT || 8080
            );
        });
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
})();
