import mongoose from "mongoose";


declare global {
    namespace Express {
        interface Request {
            userId: string | undefined,
            sessionId: string | undefined
        }
    }
}

export {};