export const BACKEND_URL = process.env.BACKEND_URL;

if (!BACKEND_URL)
  throw new ReferenceError("Backend url is not defined in .env");

export const AUTH_ROUTES = {
  LOG_IN: BACKEND_URL + "/auth/log-in",
  REGISTER: BACKEND_URL + "/auth/register",
};
