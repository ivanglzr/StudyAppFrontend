"use server";

import { revalidatePath } from "next/cache";

import { getAccessToken } from "@/common/services/cookies";
import {
  getCookieHeader,
  handleErrors,
  validateResponse,
} from "@/common/services/utils";

import { IResponse } from "@/common/interfaces";
import {
  ICreateSubject,
  IGetSubjectResponse,
  IGetSubjectsResponse,
  IUpdateSubject,
} from "../interfaces";

import { SUBJECT_ROUTES } from "./subject.routes";
import { ROUTES } from "@/config";

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

export async function postSubject(subject: ICreateSubject) {
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
    const res: IResponse = await petition.json();

    validateResponse(res);

    revalidatePath(ROUTES.LIBRARY);

    return res.message;
  } catch (error) {
    await handleErrors(error);
  }
}

export async function putSubject(subjectId: string, subject: IUpdateSubject) {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(SUBJECT_ROUTES.PUT_SUBJECT(subjectId), {
      method: "PUT",
      headers: {
        ...getCookieHeader(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    });
    const res: IResponse = await petition.json();

    validateResponse(res);

    revalidatePath(ROUTES.LIBRARY);

    return res.message;
  } catch (error) {
    await handleErrors(error);
  }
}

export async function deleteSubject(subjectId: string) {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(SUBJECT_ROUTES.DELETE_SUBJECT(subjectId), {
      method: "DELETE",
      headers: {
        ...getCookieHeader(token),
        "Content-Type": "application/json",
      },
    });
    const res = await petition.json();

    validateResponse(res);

    revalidatePath(ROUTES.LIBRARY);

    return res.message;
  } catch (error) {
    await handleErrors(error);
  }
}