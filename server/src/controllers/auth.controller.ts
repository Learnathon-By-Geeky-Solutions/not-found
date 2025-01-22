import catchError from "../utils/catchError";
import { loginSchema, signupSchema } from "./auth.schema";
import { createAccount, loginUser } from "../services/auth.service";
import { CREATED, OK } from "../constants/httpStatusCode";
import {setAuthCookies} from "../utils/cookies";



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
    const accessToken = req.cookies.accessToken;
})