export const ROUTES = {
  AUTH_ENDPOINT: "/auth",
  LOG_IN: "/auth/login",
  REGISTER: "/auth/register",
  USER_ENDPOINT: "/home",
  HOME: "/user/home",
  LIBRARY: "/user/library",
  SUBJECT_PAGE: (subjectId: string) => `/user/library/${subjectId}`,
  PROFILE: "/user/profile",
};

export const accessTokenCookieName = "access_token";
