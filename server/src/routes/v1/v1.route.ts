import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/user", userRouter);

export default v1Router;