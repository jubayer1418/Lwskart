import { z } from "zod";

// Define Zod schema
export const customerSchemaValidator = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and ConfirmPassword don't match",
    path: ["confirmPassword"],
  });

export const formDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6,{
    message: "Invalid password"
  }),
});
