const BACKEND_URL = process.env.BACKEND_URL;

if (!BACKEND_URL)
  throw new ReferenceError("Backend url is not defined in .env");

export const USER_ROUTES = {
  GET_USER: BACKEND_URL + "/user",
  CHANGE_PASSWORD: BACKEND_URL + "/user/password",
};
