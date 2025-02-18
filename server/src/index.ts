import "dotenv/config"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import sanitize from 'express-mongo-sanitize';

import connectDB from "./configs/db";
import errorHandler from "./middlewares/errorHandler"
import { OK } from "./constants/httpStatusCode";
import catchError from "./utils/catchError";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import apiRouter from "./routes/api.router";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(sanitize());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: APP_ORIGIN,
    credentials: true
}));
app.use(cookieParser());

console.log(NODE_ENV);
app.get("/health", catchError(
    async (req, res) => {
        res.status(OK)
            .json({
                status: "success",
                message: "Healthy"
            });
    }
))

// routes
app.use("/api", apiRouter);

app.use(errorHandler);
app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await connectDB();
});