"use server";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";

import { accessTokenCookieName, ROUTES } from "@/config";
import { cookieOptions } from "@/auth/services";

export async function getAccessToken({
  redirectToLogin,
}: {
  redirectToLogin: true;
}): Promise<string | never>;

export async function getAccessToken({
  redirectToLogin,
}: {
  redirectToLogin: false;
}): Promise<string | undefined>;

/**
 * Use this function to get the access token.
 * @param redirectToLogin If you want a redirection in case of error put this param to true.
 * @returns The access token stored in a cookie.
 */
export async function getAccessToken(
  { redirectToLogin } = { redirectToLogin: false }
): Promise<string | never | undefined> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(accessTokenCookieName)?.value;

  if (!accessToken && redirectToLogin) redirect(ROUTES.LOG_IN);

  return accessToken;
}

/**
 * Function to set the access token.
 *
 * ⚠ Use this function along with await to avoid an UnhandledRejection.
 * @param accessToken JWT key that the server returned.
 */
export async function setAccessToken(accessToken: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: accessTokenCookieName,
    value: accessToken,
    ...cookieOptions,
  });
}

/**
 * Function to delete the access token cookie.
 *
 * It also redirects the user to the login page.
 */
export async function clearAccessToken(): Promise<never> {
  const cookieStore = await cookies();

  cookieStore.delete(accessTokenCookieName);

  redirect(ROUTES.LOG_IN);
}
