import {RequestHandler} from "express";
import appAssert from "../utils/appAssert";
import {UNAUTHORIZED} from "../constants/httpStatusCode";
import appErrorCode from "../constants/AppErrorCode";
import AppErrorCode from "../constants/AppErrorCode";
import {AccessTokenType, getAccessTokenVerifyOptions, verifyToken} from "../utils/jwt";


const authenticate: RequestHandler = (req, res, next) => {
    const accessToken = req.cookies.accessToken as string | undefined;
    appAssert(accessToken, UNAUTHORIZED, "Not authorized", appErrorCode.InvalidAccessToken);

    const { error, payload } = verifyToken<AccessTokenType>(accessToken, getAccessTokenVerifyOptions());
    appAssert(
        payload,
        UNAUTHORIZED,
        error.message === "jwt expired" ? "Token expired" : "Invalid Token",
        AppErrorCode.InvalidAccessToken
    );

    req.userId = payload.userId;
    req.sessionId = payload.sessionId;

    next();
}

export default authenticate;