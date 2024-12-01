"use server";

import { validateResponse, handleErrors, getCookieHeader } from "../utils";

import { getAccessToken } from "../cookies";
import { STATS_ROUTES } from "./stats.routes";
import {
  IGetStatsResponse,
  IGetSubjectsStatsResponse,
} from "@/interfaces/stats.interfaces";

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
