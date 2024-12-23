const BACKEND_URL = process.env.BACKEND_URL;

export const NOTE_ROUTES = {
  GET_NOTES: (subjectId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/note`,
  GET_NOTE: (subjectId: string, noteId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/note/${noteId}`,
  POST_NOTE: (subjectId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/note`,
  PUT_NOTE: (subjectId: string, noteId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/note/${noteId}`,
  DELETE_NOTE: (subjectId: string, noteId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/note/${noteId}`,
};
