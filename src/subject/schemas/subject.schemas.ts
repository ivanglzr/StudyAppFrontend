import { z } from "zod";

const subjectNameSchema = z
  .string()
  .min(1, "Subject name is required")
  .min(3, "Subject name must have atleast 3 characters")
  .max(25, "Subject name can't have more than 25 characters");

const colorSchema = z
  .string({
    required_error: "Color is required",
    invalid_type_error: "Color must be a string",
  })
  .startsWith("#", {
    message: "Color must be a valid hex string",
  })
  .length(7, {
    message: "Color must be 7 characters long",
  });

const createSubjectSchema = z.object({
  subjectName: subjectNameSchema,
  color: colorSchema,
});

export const validateCreateSubjectSchema = (subject: unknown) =>
  createSubjectSchema.safeParse(subject);

export const validateEditSubjectSchema = (subject: unknown) =>
  createSubjectSchema.optional().safeParse(subject);
