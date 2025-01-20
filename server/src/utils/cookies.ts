import { CookieOptions, Response } from "express";
import { NODE_ENV } from "../constants/env";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

export const REFRESH_PATH = "/api/auth/refresh";
const defaultOptions = {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure: NODE_ENV === 'production',
}

const getAccessTokenCookieOptions = (): CookieOptions => {
    return {
        ...defaultOptions,
        expires: fifteenMinutesFromNow()
    }
}

const getRefreshTokenCookieOptions = (): CookieOptions => {
    return {
        ...defaultOptions,
        expires: thirtyDaysFromNow(),
        path: REFRESH_PATH
    }
}

type params = {
    res: Response,
    accessToken: string,
    refreshToken: string
}
export const setAuthCookies = ({res, accessToken, refreshToken }: params) => {
    return res
        .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
        .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions())
}

export const clearAuthCookies = (res: Response) => {
    return res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
}
