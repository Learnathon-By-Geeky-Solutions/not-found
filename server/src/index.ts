import "dotenv/config"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./configs/db";
import errorHandler from "./middlewares/errorHandler"
import { OK } from "./constants/httpStatusCode";
import catchError from "./utils/catchError";
import {PORT} from "./constants/env";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.get("/health", catchError(
    async (req, res) => {
        res.status(OK)
            .json({
                status: "success",
                message: "Healthy"
            });
    }
))

app.use(errorHandler);
app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await connectDB();
});