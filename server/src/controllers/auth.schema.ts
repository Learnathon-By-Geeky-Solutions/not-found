import { z } from "zod";

export const nameSchema = z.string().trim().min(3, "Name should be at least 3 character long").max(24, "Name should be at most 24 character long");
export const emailSchema = z.string().email().min(5).max(255);
export const passwordSchema = z.string().min(6, "Password should be at least 6 character long").max(255);
export const nid_pictureSchema = z.string();
export const roleSchema = z.string().min(24).max(24);

export const signupSchema =
    z.object({
        name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: passwordSchema,
        nid_picture: nid_pictureSchema,
        role: roleSchema
    }).refine(
        data => data.password === data.confirmPassword, {
            message: "Password and Confirm Password do not match",
            path: ["confirmPassword"]
        });

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    userAgent: z.string()
})
