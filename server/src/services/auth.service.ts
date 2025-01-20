import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "../constants/httpStatusCode";
import { comparePassword } from "../utils/bcrypt";
import SessionModel from "../models/session.model";
import {accessTokenSignOptions, refreshTokenSignOptions, signToken} from "../utils/jwt";

type createAccountParams = {
    name: string,
    email: string,
    password: string,
    nid_picture: string,
    role: string
}
export const createAccount = async  (userData: createAccountParams):Promise<void> => {
    // check if email is already in use
    const userExits = await UserModel.exists({email: userData.email});
    appAssert(!userExits, CONFLICT, "Email already exists");
    // create a new user
    const user = await UserModel.create(userData);
    console.log(user);
    // create a verification code
    // skip for now
    // send verification email
    // skip for now
}

type loginParams = {
    email: string,
    password: string,
    userAgent: string
}
export const loginUser = async  (userData: loginParams) => {
    // find the user
    const user = await UserModel.findOne({email: userData.email}).lean();
    appAssert(user, UNAUTHORIZED, "Invalid email or password");
    //check if verified or not, if not verified send verification email with new verification code
    // skip for now
    // validate password
    const isValid = await comparePassword(userData.password, user.password);
    appAssert(isValid, UNAUTHORIZED, "Invalid email or password");
    // create session
    const session = await SessionModel.create({userId: user._id, userAgent: userData.userAgent});
    // create access token and refresh token
    const accessToken = signToken({
        userId: user._id as string,
        sessionId: session._id as string },
        accessTokenSignOptions()
    );
    const refreshToken = signToken({
        sessionId: session._id as string },
        refreshTokenSignOptions()
    );
    // return tokens
    return { accessToken, refreshToken };
}
