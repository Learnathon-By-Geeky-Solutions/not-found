import { z } from "zod";

export const apartmentSchema = z.object({
    name: z.string().min(2, "Apartment name is too short").max(16, "Apartment name is too long"),
    ownerId: z.string()
})

export const updateApertmentSchema = z.object({
    name: z.string().min(2, "Apartment name is too short").max(16, "Apartment name is too long").optional(),
    ownerId: z.string().optional()
})