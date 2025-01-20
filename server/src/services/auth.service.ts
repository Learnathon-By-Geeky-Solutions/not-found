import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import {CONFLICT} from "../constants/httpStatusCode";


type createAccountParams = {
    name: string,
    email: string,
    password: string,
    nid_picture: string,
    role: string
}
export const createAccount = async  (userData: createAccountParams):Promise<void> => {
    // check if email is already in use
    const userExits = await UserModel.exists({email: userData.email});
    appAssert(!userExits, CONFLICT, "Email already exists");
    // create a new user
    const user = await UserModel.create(userData);
    console.log(user);
    // create a verification code
    // skip for now
    // send verification email
    // skip for now
}
