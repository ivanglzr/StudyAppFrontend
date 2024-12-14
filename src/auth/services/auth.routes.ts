const BACKEND_URL = process.env.BACKEND_URL;

export const AUTH_ROUTES = {
  LOG_IN: BACKEND_URL + "/auth/log-in",
  REGISTER: BACKEND_URL + "/auth/register",
};
