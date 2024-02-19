import { z } from "zod";
import { categoryValidator } from "./category-validator";
import { speakerValidator } from "./speaker-validator";

export const courseValidator = z.object({
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
    .optional()
    .nullable(),
  categoryId: z.number(),
  category: categoryValidator.optional().nullable(),
  speakerId: z.number(),
  speaker: speakerValidator.optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const courseInputValidator = courseValidator.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  category: true,
  speaker: true,
});

export const courseCreateSchema = courseValidator
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    categoryId: z.string(),
    speakerId: z.string(),
  });

export type Course = z.infer<typeof courseValidator>;
export type CourseInput = z.infer<typeof courseInputValidator>;
export type CourseCreateSchema = z.infer<typeof courseCreateSchema>;
