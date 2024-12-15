const BACKEND_URL = process.env.BACKEND_URL;

export const STATS_ROUTES = {
  GET_STATS: BACKEND_URL + "/user/stats",
  GET_SUBJECTS_STATS: BACKEND_URL + "/user/stats/subject",
  UPDATE_SUBJECT_STUDY_TIME: (subjectId: string) =>
    `${BACKEND_URL}/user/stats/subject/${subjectId}`,
};
