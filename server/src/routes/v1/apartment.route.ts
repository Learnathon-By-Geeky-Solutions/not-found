import { Router } from "express";
import { createApartment, deleteAApartment, getAApartment, getApartments, updateAApartment } from "../../controllers/apartment.controller";
import authenticate from "../../middlewares/authenticate";

const apartmentRouter = Router();


apartmentRouter.get("/", authenticate, getApartments);
apartmentRouter.get("/:apartmentId", authenticate, getAApartment);
apartmentRouter.post("/", authenticate, createApartment);
apartmentRouter.put("/:apartmentId", authenticate, updateAApartment);
apartmentRouter.delete("/:apartmentId", authenticate, deleteAApartment);

export default apartmentRouter;