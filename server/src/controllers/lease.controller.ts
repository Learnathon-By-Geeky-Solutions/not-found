import { BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND, OK } from "../constants/httpStatusCode";
import ApartmentModel from "../models/apartment.model";
import LeaseModel from "../models/lease.model";
import RoleModel from "../models/role.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import catchError from "../utils/catchError";
import { leaseSchema, updateLeaseSchema } from "./lease.schema";

const isTanantUser = async function (userId: string): Promise<boolean> {
    const tenantRole = await RoleModel.findOne({role: "tenant"}).lean();
    const user = await UserModel.findById(userId).select("role").lean();
    return (user?.role as any).equals(tenantRole?._id);
} 
const isApartmentAvailable = async function (apartmentId: string): Promise<boolean> {
    const lease = await LeaseModel.findOne({apartmentId});
    return !lease;
}

const getApartmentIdByName = async function (apartmentName: string): Promise<string> {
    const apartment = await ApartmentModel.findOne({name: apartmentName}).select("_id").lean();
    appAssert(apartment, NOT_FOUND, "Apartment not found");
    return apartment._id as string;
}
const getTenantIdByName = async function (tenantName: string): Promise<string> {
    const tenant = await UserModel.findOne({name: tenantName}).select("_id").lean();
    appAssert(tenant, NOT_FOUND, "Tenant not found");
    return tenant._id as string;
}

export const createLease = catchError(async (req, res) => {
    const request = leaseSchema.parse(req.body);
    // check if user is tanant
    appAssert(await isTanantUser(request.tenantId), BAD_REQUEST, "User is not a tenant");
    // check if apartment is available
    appAssert(await isApartmentAvailable(request.apartmentId), BAD_REQUEST, "Apartment is not available");

    const lease = await LeaseModel.create(request);
    appAssert(lease, BAD_REQUEST, "Something went wrong while making a new lease");

    res.status(CREATED).json({
        success: true,
        lease
    })
})

export const getLeases = catchError(async (req, res) => {
    let query: { apartmentId?: string, tenantId?: string } = {};
    // check if query has apartment name
    if(req.query.apartmentName) {
        query["apartmentId"] = await getApartmentIdByName(req.query.apartmentName as string);
    } 
    // check if query has tenant name
    if(req.query.tenantName) {
        query["tenantId"] = await getTenantIdByName(req.query.tenantName as string);
    }

    const leases = await LeaseModel.find(query);

    res.status(OK).json({
        success: true,
        leases
    })
})

export const getALease = catchError(async (req, res) => {
    const leaseId = req.params.leaseId;
    const lease = await LeaseModel.findById(leaseId);
    appAssert(lease, NOT_FOUND, "Lease not found");

    res.status(OK).json({
        success: true,
        lease
    })
})

export const updateALease = catchError(async (req, res) => {
    const request = updateLeaseSchema.parse(req.body);
    const leaseId = req.params.leaseId;
    const lease = await LeaseModel.findByIdAndUpdate(leaseId, request, { new: true });
    appAssert(lease, NOT_FOUND, "Lease not found");

    res.status(OK).json({
        success: true,
        lease
    })
})

export const deleteALease = catchError(async (req, res) => {
    const leaseId = req.params.leaseId;
    const lease = await LeaseModel.findByIdAndDelete(leaseId);
    appAssert(lease, NOT_FOUND, "Lease not found");

    res.status(NO_CONTENT).json({
        success: true
    })
})