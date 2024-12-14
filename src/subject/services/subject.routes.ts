const BACKEND_URL = process.env.BACKEND_URL;

export const SUBJECT_ROUTES = {
  GET_SUBJECTS: BACKEND_URL + "/user/subject",
  GET_SUBJECT: (subjectId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}`,
  POST_SUBJECT: BACKEND_URL + "/user/subject",
  PUT_SUBJECT: (subjectId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}`,
  DELETE_SUBJECT: (subjectId: string) =>
    `${BACKEND_URL}/user/subject/${subjectId}`,
};
