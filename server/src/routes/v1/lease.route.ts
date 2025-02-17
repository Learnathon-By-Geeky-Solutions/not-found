import { Router } from "express";
import { createLease } from "../../controllers/lease.controller";
import authenticate from "../../middlewares/authenticate";

const leaseRouter = Router();


leaseRouter.post("/", authenticate, createLease);

export default leaseRouter;