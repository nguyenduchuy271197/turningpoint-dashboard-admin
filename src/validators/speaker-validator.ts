import { GENDER_OPTIONS } from "@/constants";
import { z } from "zod";

export const speakerValidator = z.object({
  id: z.number(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  jobTitle: z.string(),
  gender: z.enum(GENDER_OPTIONS),
  avatarUrl: z.string().optional(),
  categoryId: z.number().positive(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const speakerInputValidator = speakerValidator.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const speakerCreateSchema = speakerValidator
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    categoryId: z.string(),
  });

export type Speaker = z.infer<typeof speakerValidator>;
export type SpeakerInput = z.infer<typeof speakerInputValidator>;
export type SpeakerCreateSchema = z.infer<typeof speakerCreateSchema>;
