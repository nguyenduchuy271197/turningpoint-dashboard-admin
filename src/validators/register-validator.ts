import { GENDER_OPTIONS } from "@/constants";
import { z } from "zod";

export const registerValidator = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const registerInputValidator = registerValidator.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const registerCreateSchema = registerValidator
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    categoryId: z.string(),
  });

export type Register = z.infer<typeof registerValidator>;
export type RegisterInput = z.infer<typeof registerInputValidator>;
export type RegisterCreateSchema = z.infer<typeof registerCreateSchema>;
