const BACKEND_URL = process.env.BACKEND_URL;

export const USER_ROUTES = {
  GET_USER: BACKEND_URL + "/user",
  CHANGE_PASSWORD: BACKEND_URL + "/user/password",
};
