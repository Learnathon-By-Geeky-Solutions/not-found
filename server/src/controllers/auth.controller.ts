import catchError from "../utils/catchError";
import {signupSchema} from "./auth.schema";
import {createAccount} from "../services/auth.service";
import {CREATED} from "../constants/httpStatusCode";



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

})

export const logoutController = catchError(async  (req, res) => {

})