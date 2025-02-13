import { Router } from 'express';
import { getProfile, getUser, getUsers, updateRole } from '../../controllers/user.controller';
import authenticate from '../../middlewares/authenticate';


const userRouter = Router();

userRouter.get('/',authenticate, getUsers)
userRouter.get('/profile',authenticate, getProfile)
userRouter.get('/:id',authenticate, getUser)
userRouter.put('/:id',authenticate, updateRole)

export default userRouter;