"use server";

import { getAccessToken } from "../cookies";
import { getCookieHeader, handleErrors, validateResponse } from "../utils";

import {
  IGetSubjectResponse,
  IGetSubjectsResponse,
  ISubject,
} from "@/interfaces/subject.interfaces";

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

export async function getSubject(subjectId: string) {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(SUBJECT_ROUTES.GET_SUBJECT(subjectId), {
      method: "GET",
      headers: {
        ...getCookieHeader(token),
        "Content-Type": "application/json",
      },
    });
    const res: IGetSubjectResponse = await petition.json();

    validateResponse(res);

    return res.subject;
  } catch (error) {
    await handleErrors(error);
  }
}

export async function postSubject(subject: ISubject) {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(SUBJECT_ROUTES.POST_SUBJECT, {
      method: "POST",
      headers: {
        ...getCookieHeader(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    });
    const res = await petition.json();

    validateResponse(res);

    return res.message;
  } catch (error) {
    await handleErrors(error);
  }
}
