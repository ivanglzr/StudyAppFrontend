const BACKEND_URL = process.env.BACKEND_URL;

if (!BACKEND_URL)
  throw new ReferenceError("Backend url is not defined in .env");

export const FLASHCARD_ROUTES = {
  GET_FLASHCARDS: (subjectId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/flashcard`,
  GET_FLASHCARD: (subjectId: string, flashcardId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/flashcard/${flashcardId}`,
  POST_FLASHCARD: (subjectId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/flashcard`,
  PUT_FLASHCARD: (subjectId: string, flashcardId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/flashcard/${flashcardId}`,
  DELETE_FLASHCARD: (subjectId: string, flashcardId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/flashcard/${flashcardId}`,
};
