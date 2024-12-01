const BACKEND_URL = process.env.BACKEND_URL;

if (!BACKEND_URL)
  throw new ReferenceError("Backend url is not defined in .env");

export const STATS_ROUTES = {
  GET_STATS: BACKEND_URL + "/user/stats",
  GET_SUBJECTS_STATS: BACKEND_URL + "/user/stats/subject",
};
