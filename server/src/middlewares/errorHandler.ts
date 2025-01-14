import { ErrorRequestHandler} from "express";
import {INTERNAL_SERVER_ERROR} from "../constants/httpStatusCode";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    res.status(INTERNAL_SERVER_ERROR)
        .json({
            "status": "fail",
            "message": "Something broke!"
        })
    next();
}

export default errorHandler;