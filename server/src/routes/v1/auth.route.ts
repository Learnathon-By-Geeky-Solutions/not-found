import { Router } from 'express';
import {
    loginController,
    logoutController,
    refreshController,
    signupController,
    verifyEmailController
} from "../../controllers/auth.controller";
import authenticate from "../../middlewares/authenticate";

const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.get("/logout", authenticate, logoutController);
authRouter.get("/refresh", refreshController);
authRouter.get("/email/verify/:code", verifyEmailController);

export default authRouter;