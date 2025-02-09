import { NOT_FOUND, OK } from "../constants/httpStatusCode";
import RoleModel from "../models/role.model";
import appAssert from "../utils/appAssert";
import catchError from "../utils/catchError";


export const getUnassignedRole = catchError(async (req, res) => {
    const unassignedRole = await RoleModel.findOne({role: "unassigned"}).select('-__v');
    appAssert(unassignedRole, NOT_FOUND, "Unassigned role is not found");

    res.status(OK).json({
        success: true,
        unassignedRole
    })
});