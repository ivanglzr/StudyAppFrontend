export const ROUTES = {
  AUTH_ENDPOINT: "/auth",
  LOG_IN: "/auth/login",
  REGISTER: "/auth/register",
  USER_ENDPOINT: "/home",
  HOME: "/user/home",
  LIBRARY: "/user/library",
  SUBJECT_PAGE: (subjectId: string) => `/user/library/${subjectId}`,
  DOCUMENT_PAGE: (subjectId: string, filename: string) =>
    `/user/library/${subjectId}/document/${filename}`,
  PROFILE: "/user/profile",
  CREATE_NOTE_PAGE: (subjectId: string) => `/user/library/${subjectId}/note`,
  EDIT_NOTE_PAGE: (subjectId: string, noteId: string) =>
    `/user/library/${subjectId}/note/${noteId}`,
};

export const accessTokenCookieName = "access_token";
