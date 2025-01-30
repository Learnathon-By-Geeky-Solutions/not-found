import { Router } from "express";
import v1Router from "./v1/v1.route";

const apiRouter = Router();

apiRouter.use("/v1", v1Router);

export default apiRouter;