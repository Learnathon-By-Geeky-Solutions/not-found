import { Request, Response, NextFunction } from "express";

type asyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchError = (asyncController: asyncController): asyncController => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await asyncController(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}
export default catchError;