import { BAD_REQUEST, CREATED } from "../constants/httpStatusCode";
import LeaseModel from "../models/lease.model";
import appAssert from "../utils/appAssert";
import catchError from "../utils/catchError";
import { leaseSchema } from "./lease.schema";


export const createLease = catchError(async (req, res) => {
    const request = leaseSchema.parse(req.body);
    const newLease = await LeaseModel.create(request);
    appAssert(newLease, BAD_REQUEST, "Something went wrong while making a new lease");

    res.status(CREATED).json({
        success: true,
        data: newLease
    })
})