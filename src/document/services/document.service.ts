import { getAccessToken } from "@/common/services/cookies";
import { getCookieHeader, handleErrors } from "@/common/services/utils";

import { DOCUMENT_ROUTES } from ".";

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
