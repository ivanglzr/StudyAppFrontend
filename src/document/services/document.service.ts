"use server";

import { revalidatePath } from "next/cache";

import { getAccessToken } from "@/common/services/cookies";
import {
  getCookieHeader,
  handleErrors,
  validateResponse,
} from "@/common/services/utils";

import { DOCUMENT_ROUTES } from ".";

import { ROUTES } from "@/config";

export async function getDocument(subjectId: string, filename: string) {
  const token = await getAccessToken({ redirectToLogin: true });

  try {
    const petition = await fetch(
      DOCUMENT_ROUTES.GET_DOCUMENT(subjectId, filename),
      {
        method: "GET",
        headers: getCookieHeader(token),
      }
    );

    if (!petition.ok) return;

    const res = await petition.blob();

    return res;
  } catch (error) {
    await handleErrors(error);
  }
}

export async function postDocument(subjectId: string, file: File) {
  const token = await getAccessToken({ redirectToLogin: true });

  const formData = new FormData();
  formData.append("file0", file);

  try {
    const petition = await fetch(DOCUMENT_ROUTES.POST_DOCUMENT(subjectId), {
      method: "POST",
      headers: {
        ...getCookieHeader(token),
      },
      body: formData,
    });
    const res = await petition.json();

    validateResponse(res);

    revalidatePath(ROUTES.SUBJECT_PAGE(subjectId));

    return res.message;
  } catch (error) {
    await handleErrors(error);
  }
}
