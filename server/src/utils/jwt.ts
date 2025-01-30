import jwt, {SignOptions, VerifyOptions} from "jsonwebtoken";
import {JWT_REFRESH_SECRET, JWT_SECRET} from "../constants/env";
import appError from "./AppError";
import {UNAUTHORIZED} from "../constants/httpStatusCode";
import appErrorCode from "../constants/AppErrorCode";


export type AccessTokenType = {
    userId: string;
    sessionId: string;
}
export type RefreshTokenType = {
    sessionId: string;
}

type signOptionsAndSecret = SignOptions & { secret: string };
export const getAccessTokenSignOptions = (): signOptionsAndSecret => ({
    expiresIn: "15m",
    secret: JWT_SECRET
})
export const getRefreshTokenSignOptions = (): signOptionsAndSecret => ({
    expiresIn: "30d",
    secret: JWT_REFRESH_SECRET
})
export const signToken = (payload: AccessTokenType | RefreshTokenType, options: signOptionsAndSecret) => {
    const { secret, ...signOptions } = options;
    return jwt.sign(payload, secret, signOptions);
}

type verifyOptionsAndSecret = VerifyOptions & { secret: string };
export const getAccessTokenVerifyOptions = (): verifyOptionsAndSecret => ({
    secret: JWT_SECRET
})
export const getRefreshTokenVerifyOptions = (): verifyOptionsAndSecret => ({
    secret: JWT_REFRESH_SECRET
})
export const verifyToken = <TPayload extends object>(token: string, options: verifyOptionsAndSecret) => {
    const { secret, ...verifyOptions } = options;
    try{
        const payload = jwt.verify(token, secret, verifyOptions) as TPayload;
        return { payload };
    }
    catch (err: any) {
        return { error: err.message };
    }
}