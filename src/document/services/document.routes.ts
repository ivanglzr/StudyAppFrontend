const BACKEND_URL = process.env.BACKEND_URL;

export const DOCUMENT_ROUTES = {
  GET_DOCUMENTS: (subjectId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/document`,
  GET_DOCUMENT: (subjectId: string, filename: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/document/${filename}`,
  POST_DOCUMENT: (subjectId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}/document`,
};
