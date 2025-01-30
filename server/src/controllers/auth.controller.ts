import catchError from "../utils/catchError";
import { loginSchema, signupSchema, verificationCodeSchema } from "./auth.schema";
import {createAccount, loginUser, refreshAccessToken, verifyEmail} from "../services/auth.service";
import {CREATED, OK, UNAUTHORIZED} from "../constants/httpStatusCode";
import {
    clearAuthCookies,
    getAccessTokenCookieOptions,
    getRefreshTokenCookieOptions,
    setAuthCookies
} from "../utils/cookies";
import SessionModel from "../models/session.model";
import appAssert from "../utils/appAssert";



export const signupController = catchError(async  (req, res) => {
    // validate the request body
    const request = signupSchema.parse(req.body);
    // call service to create a new user
    await createAccount(request);
    // return response
    return res.status(CREATED).send({
        success: true,
        message: "Sign up successfully"
    })
})

export const loginController = catchError(async  (req, res) => {
    // validate the request body
    const request = loginSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"]
    });
    // call login service
    const { accessToken, refreshToken } = await loginUser(request);
    // set cookies and send response
    return setAuthCookies({res, accessToken, refreshToken}).status(OK).send({
        success: true
    })
})

export const logoutController = catchError(async  (req, res) => {
    const sessionId = req.sessionId;
    await SessionModel.findByIdAndDelete(sessionId);

    return clearAuthCookies(res).status(OK).send({
            success: true,
            message: "Logged out successfully"
        })
})

export const refreshController = catchError(async  (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    appAssert(refreshToken, UNAUTHORIZED, "Refresh token not found");
    const {accessToken, newRefreshToken} = await refreshAccessToken(refreshToken);
    if(newRefreshToken){
        res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
    }
    return res.status(OK)
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
        .json({
            success: true,
            message: "Access token refreshed"
        })
})

export const verifyEmailController = catchError(async (req, res) => {
    const verificationCode = verificationCodeSchema.parse(req.params.code);
    const { user }  = await verifyEmail(verificationCode);
    
    res.status(OK).json({
        success: true,
        user
    })
})