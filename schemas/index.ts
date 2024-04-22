import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid Email."
    }),
    password: z.string().min(1, {
        message: "Password is required."
    })
})

export const RegisterSchema = z.object({
    name: z.string().min(3, {
        message: "Username should be longer than 3 letters."
    }),
    email: z.string().email({
        message: "Invalid Email."
    }),
    password: z.string().min(6, {
        message: "Password must be 6+ symbols."
    })
})