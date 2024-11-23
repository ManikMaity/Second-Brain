import {z} from "zod";

const userSchema = z.object({
    username : z.string({
        required_error : "Username is required",
        invalid_type_error : "Username must be a string"
    }).min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 50 characters long")
    .trim(),

    
    email : z.string({
        required_error : "Email is required",
        invalid_type_error : "Email must be a string"
    }).email("Email must be a valid email address")
    .trim(),

    password : z.string({
        required_error : "Password is required",
        invalid_type_error : "Password must be a string"}
    ).min(6, "Password must be at least 6 characters long")

});


export const userSigninSchema = z.object({
    email : z.string({
        required_error : "Email is required for signin.",
        invalid_type_error : "Email must be a string"
    }).email("Email must be a valid email address"),
    password : z.string({
        required_error : "Password is required for signin.",
        invalid_type_error : "Password must be a string"
    })
    .min(6, "Password must be at least 6 characters long")
})

export type UserSigninSchemaType = z.infer<typeof userSigninSchema>;

export type UserSchemaType  = z.infer<typeof userSchema>;

export default userSchema;
