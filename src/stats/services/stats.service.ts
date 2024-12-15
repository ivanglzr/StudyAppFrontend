"use server";

import {
  validateResponse,
  handleErrors,
  getCookieHeader,
} from "@/common/services/utils";

import { getAccessToken } from "@/common/services/cookies";

import { IResponse } from "@/common/interfaces";
import { IGetStatsResponse, IGetSubjectsStatsResponse } from "../interfaces";

import { STATS_ROUTES } from "./stats.routes";

export async function getStats() {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(STATS_ROUTES.GET_STATS, {
      method: "GET",
      headers: {
        ...getCookieHeader(token),
        "Content-Type": "application/json",
      },
    });
    const res: IGetStatsResponse = await petition.json();

    validateResponse(res);

    return res.stats;
  } catch (error) {
    await handleErrors(error);
  }
}

export async function getSubjectsStats() {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(STATS_ROUTES.GET_SUBJECTS_STATS, {
      method: "GET",
      headers: {
        ...getCookieHeader(token),
        "Content-Type": "application/json",
      },
    });
    const res: IGetSubjectsStatsResponse = await petition.json();

    validateResponse(res);

    return res.stats;
  } catch (error) {
    await handleErrors(error);
  }
}

export async function updateSubjectStudyTime(
  subjectId: string,
  studyTime: number
) {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(
      STATS_ROUTES.UPDATE_SUBJECT_STUDY_TIME(subjectId),
      {
        method: "PATCH",
        headers: {
          ...getCookieHeader(token),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studyTime }),
      }
    );
    const res: IResponse = await petition.json();

    validateResponse(res);

    return res.message;
  } catch (error) {
    await handleErrors(error);
  }
}
