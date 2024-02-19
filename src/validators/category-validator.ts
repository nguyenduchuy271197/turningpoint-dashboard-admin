import { z } from "zod";

export const categoryValidator = z.object({
  id: z.number(),
  title: z
    .string()
    .min(1)
    .max(100)
    .describe("Post title should be 1-100 characters"),
  slug: z.string().transform((val) => val.toLowerCase()),
  description: z.string().optional(),
  thumbnail: z
    .string()
    .url()
    .describe("Thumbnail must be a valid URL")
    .min(10) // min length
    .max(255) // max length
    .regex(/^https?:\/\//, { message: "Thumbnail must be HTTP or HTTPS" }) // require http(s)
    .optional(), // make optional,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const categoryInputValidator = categoryValidator.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const categoryCreateSchema = categoryValidator.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Category = z.infer<typeof categoryValidator>;
export type CategoryInput = z.infer<typeof categoryInputValidator>;
export type CategoryCreateSchema = z.infer<typeof categoryCreateSchema>;
