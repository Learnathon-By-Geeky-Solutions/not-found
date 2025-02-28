import { BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND, OK } from "../constants/httpStatusCode";
import ApartmentModel from "../models/apartment.model";
import RoleModel from "../models/role.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import catchError from "../utils/catchError";
import { apartmentSchema, updateApertmentSchema } from "./apartment.schema";

const getOwnerIdByName = async function (ownerName: string): Promise<string> {
    const owner = await UserModel.findOne({name: ownerName}).select("_id").lean();
    appAssert(owner, NOT_FOUND, "Owner not found");
    return owner?._id as string;
}

const isOwnerUser = async function (ownerId: string): Promise<boolean> {
    const ownerRole = await RoleModel.findOne({role: "owner"}).lean();
    const user = await UserModel.findById(ownerId).select("role").lean();
    return (user?.role as any).equals(ownerRole?._id);
}

export const getApartments = catchError(async (req, res) => {
    let query: {name?: string, ownerId?: string } = {};
    if(req.query.name) {
        query['name'] = req.query.name as string;
    }
    
    if(req.query.owner) {
        query['ownerId'] = await getOwnerIdByName(req.query.owner as string);
    }

    const apartments = await ApartmentModel.find(query);
    res.status(OK).json({
        success: true,
        apartments
    })
})

export const getAApartment = catchError(async (req, res) => {
    const apartmentId = req.params.apartmentId;
    const apartment = await ApartmentModel.findById(apartmentId);
    appAssert(apartment, NOT_FOUND, "Apartment not found");

    res.status(OK).json({
        success: true,
        apartment
    })
})

export const createApartment = catchError(async (req, res) => {
    const request = apartmentSchema.parse(req.body);
    // check if ownerId is valid
    appAssert(await isOwnerUser(request.ownerId), BAD_REQUEST, "Invalid owner ID");
    

    const apartment = await ApartmentModel.create(request);
    appAssert(apartment, BAD_REQUEST, "Something went wrong while making a new lease");

    res.status(CREATED).json({
        success: true,
        apartment
    })
})

export const updateAApartment = catchError(async (req, res) => {
    const request = updateApertmentSchema.parse(req.body);
    if(request.ownerId) {
        appAssert(await isOwnerUser(request.ownerId), BAD_REQUEST, "Invalid owner ID");
    }
    const apartmentId = req.params.apartmentId;
    const apartment = await ApartmentModel.findByIdAndUpdate(apartmentId, request, { new: true });
    appAssert(apartment, NOT_FOUND, "Apartment not found");

    res.status(OK).json({
        success: true,
        apartment
    })
})

export const deleteAApartment = catchError(async (req, res) => {
    const apartmentId = req.params.apartmentId;
    const apartment = await ApartmentModel.findByIdAndDelete(apartmentId);
    appAssert(apartment, NOT_FOUND, "Apartment not found");

    res.status(NO_CONTENT).json({
        success: true
    })
})