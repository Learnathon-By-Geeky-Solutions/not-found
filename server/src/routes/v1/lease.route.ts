import { Router } from "express";
import { createLease, deleteALease, getALease, getLeases, updateALease } from "../../controllers/lease.controller";
import authenticate from "../../middlewares/authenticate";

const leaseRouter = Router();


leaseRouter.get("/", authenticate, getLeases);
leaseRouter.get("/:leaseId", authenticate, getALease);
leaseRouter.post("/", authenticate, createLease);
leaseRouter.put("/:leaseId", authenticate, updateALease);
leaseRouter.delete("/:leaseId", authenticate, deleteALease);

export default leaseRouter;