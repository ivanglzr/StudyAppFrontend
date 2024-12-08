import { z } from "zod";

const titleSchema = z
  .string({
    required_error: "Title is required",
    invalid_type_error: "Title must be an string",
  })
  .min(3, "Title must be longer than 3 characters")
  .max(50, "Title can't have more than 50 characters");

const answerSchema = z
  .string({
    invalid_type_error: "An answer must be an string",
  })
  .min(1, "An answer must have atleast 1 character")
  .max(150, "An answer can't have more than 50 characters");

const tagSchema = z
  .string({ invalid_type_error: "A tag must be an string" })
  .min(1, "A tag must have atleast 1 character")
  .max(20, "A tag can't have more than 20 characters");

const learnedSchema = z.boolean({
  required_error: "Specify if you have learned the flashcard",
  invalid_type_error: "Learned must be a boolean",
});

const flashcardSchema = z.object({
  title: titleSchema,
  answers: z.array(answerSchema).nonempty(),
  tags: z.array(tagSchema),
  learned: learnedSchema,
});

export const validateFlashcardSchema = (flashcard: unknown) =>
  flashcardSchema.safeParse(flashcard);
