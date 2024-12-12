"use server";

import { revalidatePath } from "next/cache";

import { getAccessToken } from "../cookies";
import { getCookieHeader, handleErrors, validateResponse } from "../utils";

import { ICreateFlashcard } from "@/interfaces/flashcard.interfaces";

import { FLASHCARD_ROUTES } from "./flashcard.routes";
import { ROUTES } from "@/config";

export async function postFlashcard(
  subjectId: string,
  flashcard: ICreateFlashcard
) {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(FLASHCARD_ROUTES.POST_FLASHCARD(subjectId), {
      method: "POST",
      headers: {
        ...getCookieHeader(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flashcard),
    });
    const res = await petition.json();

    validateResponse(res);

    revalidatePath(ROUTES.SUBJECT_PAGE(subjectId));

    return res.message;
  } catch (error) {
    await handleErrors(error);
  }
}
