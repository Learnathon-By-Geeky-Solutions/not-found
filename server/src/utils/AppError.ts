import AppErrorCode from "../constants/AppErrorCode";
import { HttpStatusCodes } from "../constants/httpStatusCode";

class AppError extends Error {
    constructor(
        public statusCode: HttpStatusCodes,
        public message: string,
        public errorCode?: AppErrorCode
    ) {
        super(message);
    }

    captureStackTrace() {
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;