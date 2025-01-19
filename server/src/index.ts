import "dotenv/config"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import connectDB from "./configs/db";
import errorHandler from "./middlewares/errorHandler"
import { OK } from "./constants/httpStatusCode";
import catchError from "./utils/catchError";
import { APP_ORIGIN, PORT } from "./constants/env";
import {populateDbWithRoles} from "./configs/populateDb";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: APP_ORIGIN
}));
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
    await populateDbWithRoles();
});