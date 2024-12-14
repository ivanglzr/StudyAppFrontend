import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

import { UnauthorizedError } from "@/auth/errors";

import { IBadResponse, IResponse } from "@/common/interfaces";

import { accessTokenCookieName, ROUTES } from "@/config";

export function validateResponse(res: IResponse | IBadResponse) {
  if (res.statusCode === 401) throw new UnauthorizedError(res.message);
}

export async function handleErrors(err: unknown, redirectPath?: string) {
  "use server";

  if (err instanceof UnauthorizedError) redirect(ROUTES.LOG_IN);
  if (redirectPath && isRedirectError(err)) redirect(redirectPath);
}

export const getCookieHeader = (token: string) => ({
  Cookie: `${accessTokenCookieName}=${token}`,
});
