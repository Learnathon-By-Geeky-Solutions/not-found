import assert from "node:assert"
import { HttpStatusCodes } from "../constants/httpStatusCode";
import AppErrorCode from "../constants/AppErrorCode";
import AppError from "./AppError";

type AppAssert = (
    condition: any,
    statusCode: HttpStatusCodes,
    message: string,
    appErrorCode?: AppErrorCode
) => asserts condition

const appAssert: AppAssert = (condition, httpStatusCode, message, appErrorCode) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));
export default appAssert;
