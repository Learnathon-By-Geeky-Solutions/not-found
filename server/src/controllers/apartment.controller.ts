import { OK } from "../constants/httpStatusCode";
import ApartmentModel from "../models/apartment.model";
import catchError from "../utils/catchError";


export const getApartments = catchError(async (req, res) => {
    const apartments = await ApartmentModel.find({});
    res.status(OK).json({
        success: true,
        apartments
    })
})