import { NOT_FOUND, OK } from "../constants/httpStatusCode";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import catchError from "../utils/catchError";


export const getProfile = catchError(async (req, res) => {
    const user = await UserModel.findById(req.userId);
    appAssert(user, NOT_FOUND, "User not found");

    res.status(OK).json({
        success: true,
        user: user.omitPassword()
    })
})