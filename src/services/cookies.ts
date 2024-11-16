"use server";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";

import { accessTokenCookieName } from "@/config";
import { cookieOptions } from "./auth/auth.config";

/**
 * Use this function to get the access token.
 * @param redirectToLogin If you want a redirection in case of error put this param to true.
 * @returns The access token stored in a cookie.
 */
export async function getAccessToken(redirectToLogin = false) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(accessTokenCookieName)?.value;

  if (!accessToken && redirectToLogin) redirect("/login");

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
export async function clearAccessToken() {
  const cookieStore = await cookies();

  cookieStore.delete(accessTokenCookieName);

  redirect("/login");
}
