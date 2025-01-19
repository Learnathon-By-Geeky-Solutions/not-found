import RoleModel from "../models/role.model";


export async function populateDbWithRoles(): Promise<void> {
    const numOfRoles = await RoleModel.countDocuments();
    if(numOfRoles === 4) return
    await RoleModel.create([
        { role: "Owner" },
        { role: "Tenant" },
        { role: "Manager" },
        { role: "Staff" },
    ])
}