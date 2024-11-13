import { redirect } from "next/navigation";

import { UnauthorizedError } from "@/errors/auth/unauthorized.error";

import { IBadResponse, IResponse } from "@/interfaces/response.interfaces";
import { accessTokenCookieName } from "./auth/auth.config";

export function validateResponse(res: IResponse | IBadResponse) {
  if (res.statusCode === 401) throw new UnauthorizedError(res.message);
}

export async function handleErrors(err: unknown) {
  "use server";

  if (err instanceof UnauthorizedError) redirect("/login");
}

export const getCookieHeader = (token: string) => ({
  Cookie: `${accessTokenCookieName}=${token}`,
});
