import { Router } from "express";
import { getApartments } from "../../controllers/apartment.controller";
import authenticate from "../../middlewares/authenticate";

const apartmentRouter = Router();


apartmentRouter.get("/", authenticate, getApartments);

export default apartmentRouter;