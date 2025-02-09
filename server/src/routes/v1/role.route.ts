import { Router } from 'express';
import { getUnassignedRole } from '../../controllers/role.controller';


const roleRouter = Router();

roleRouter.get('/unassigned', getUnassignedRole);

export default roleRouter;