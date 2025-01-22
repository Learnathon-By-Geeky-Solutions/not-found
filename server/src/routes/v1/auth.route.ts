import { Router } from 'express';
import {loginController, logoutController, signupController} from "../../controllers/auth.controller";
import authenticate from "../../middlewares/authenticate";

const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", authenticate, logoutController);

export default authRouter;