import dotenv from "dotenv";
import express, { urlencoded, json } from "express";

// load env variables
dotenv.config();

// initialise express app
const app = express();

// middleware
app.use(urlencoded({ extended: false }));

app.use(json({}));

// routes

app.get("/", (req, res) => {
    res.json({ message: "HelloWorld" });
});

// error-handling middleware
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;

    const message = err.message;

    const data = err.data;

    res.status(status)
        .set("Content-Type", "application/json")
        .json({ message, data });
});

// run http server
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
