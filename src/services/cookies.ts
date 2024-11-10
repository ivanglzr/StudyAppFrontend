"use server";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";

import { cookieOptions, accessTokenCookieName } from "./auth/auth.config";

/**
 * Use this function to get the access token
 * @returns The access token stored in a cookie
 */
export async function getAccessToken() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(accessTokenCookieName)?.value;

  return accessToken;
}

/**
 * Function to set the access token
 * ! Use this function along with await to avoid an UnhandledRejection
 * @param accessToken JWT key that the server returned
 */
export async function setAccessToken(accessToken: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: accessTokenCookieName,
    value: accessToken,
    ...cookieOptions,
  });
}

export async function clearAccessToken() {
  const cookieStore = await cookies();

  cookieStore.delete(accessTokenCookieName);

  redirect("/login");
}
