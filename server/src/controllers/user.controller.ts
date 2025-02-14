import { NOT_FOUND, OK } from "../constants/httpStatusCode";
import RoleModel from "../models/role.model";
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


export const getUsers = catchError(async (req, res) => {
    const users = await UserModel.find({});
    
    res.status(OK).json({
        success: true,
        users
    })
})

export const getUser = catchError(async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    appAssert(user, NOT_FOUND, "User not found")

    res.status(OK).json({
        success: true,
        user
    })
})

export const updateRole = catchError(async (req, res) => {
    const id = req.params.id;
    const { roleTitle } = req.body;
    const query = {role: roleTitle.toString()};
    const role = await RoleModel.findOne(query);
    appAssert(role, NOT_FOUND, "Role not found");
    const roleId = role._id;
    const user = await UserModel.findByIdAndUpdate(id, { role: roleId });
    appAssert(user, NOT_FOUND, "User not found")

    res.status(OK).json({
        success: true
    })
})

