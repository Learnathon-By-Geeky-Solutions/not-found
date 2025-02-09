import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import roleRouter from "./role.route";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/user", userRouter);
v1Router.use("/role", roleRouter);

export default v1Router;