import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string()
    .email({ message: "Email is invalid" }) // Invalid email message
    .nonempty({ message: "Email is required" }), // Required message
  password: z.string()
    .min(1, { message: "Password is required" }), // Required message for password
});

export const RegisterSchema = z.object({
  name: z.string()
    .min(1, { message: "Name is required" }) // Required name message
    .max(50, { message: "Name must be less than 50 characters" }), // Maximum length validation for name
  email: z.string()
    .email({ message: "Email is invalid" }) // Invalid email message
    .nonempty({ message: "Email is required" }), // Required message
  password: z.string()
    .min(6, { message: "Minimum 6 characters required" }), // Required message for password
});


export const ResetSchema = z.object({
  email: z.string()
    .email({ message: "Email is invalid" }) 
    .nonempty({ message: "Email is required" }), 
});


export const NewPasswordSchema= z.object({
  password: z.string()
    .min(1, { message: "Password is required" }), // Required message for password
});