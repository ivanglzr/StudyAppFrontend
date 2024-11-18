"use server";

import { getAccessToken } from "../cookies";
import { getCookieHeader, handleErrors, validateResponse } from "../utils";

import { IGetSubjectsResponse } from "@/interfaces/subject.interfaces";

import { SUBJECT_ROUTES } from "./subject.routes";

export async function getSubjects() {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(SUBJECT_ROUTES.GET_SUBJECTS, {
      method: "GET",
      headers: {
        ...getCookieHeader(token),
        "Content-Type": "application/json",
      },
    });
    const res: IGetSubjectsResponse = await petition.json();

    validateResponse(res);

    return res.subjects;
  } catch (error) {
    await handleErrors(error);
  }
}
