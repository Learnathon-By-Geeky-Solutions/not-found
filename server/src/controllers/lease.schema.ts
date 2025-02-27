import { z } from "zod";

export const leaseSchema = z.object({
    apartmentId: z.string(),
    tenantId: z.string(),
    rent: z.number().min(0, "Rent cannot be negetive"),
    startMonth: z.coerce.date()
})

export const updateLeaseSchema = z.object({
    rent: z.number().min(0, "Rent cannot be negetive")
})