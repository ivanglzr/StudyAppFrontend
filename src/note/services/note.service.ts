"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getAccessToken } from "@/common/services/cookies";
import {
  getCookieHeader,
  handleErrors,
  validateResponse,
} from "@/common/services/utils";

import { ICreateNote } from "../interfaces";

import { NOTE_ROUTES } from ".";

import { ROUTES } from "@/config";

export async function getNote(subjectId: string, noteId: string) {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(NOTE_ROUTES.GET_NOTE(subjectId, noteId), {
      method: "GET",
      headers: {
        ...getCookieHeader(token),
      },
    });
    const res = await petition.json();

    validateResponse(res);

    return res.note;
  } catch (error) {
    await handleErrors(error);
  }
}

export async function postNote(subjectId: string, note: ICreateNote) {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(NOTE_ROUTES.POST_NOTE(subjectId), {
      method: "POST",
      headers: {
        ...getCookieHeader(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const res = await petition.json();

    validateResponse(res);

    revalidatePath(ROUTES.SUBJECT_PAGE(subjectId));

    redirect("");
  } catch (error) {
    await handleErrors(error, ROUTES.SUBJECT_PAGE(subjectId));
  }
}

export async function putNote(
  subjectId: string,
  noteId: string,
  note: ICreateNote
) {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(NOTE_ROUTES.PUT_NOTE(subjectId, noteId), {
      method: "PUT",
      headers: {
        ...getCookieHeader(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const res = await petition.json();

    validateResponse(res);

    revalidatePath(ROUTES.SUBJECT_PAGE(subjectId));

    redirect("");
  } catch (error) {
    await handleErrors(error, ROUTES.SUBJECT_PAGE(subjectId));
  }
}
