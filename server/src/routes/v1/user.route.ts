import { Router } from 'express';
import { getProfile } from '../../controllers/user.controller';
import authenticate from '../../middlewares/authenticate';


const userRouter = Router();

userRouter.get('/profile',authenticate, getProfile)

export default userRouter;