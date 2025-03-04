import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import roleRouter from "./role.route";
import leaseRouter from "./lease.route";
import apartmentRouter from "./apartment.route";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/user", userRouter);
v1Router.use("/role", roleRouter);
v1Router.use("/lease", leaseRouter);
v1Router.use("/apartment", apartmentRouter);

export default v1Router;