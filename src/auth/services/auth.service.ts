"use server";

import { redirect } from "next/navigation";

import { IResponse, IBadResponse } from "@/common/interfaces";
import { ILogIn, IRegister } from "@/auth/interfaces";

import { handleErrors, validateResponse } from "@/common/services/utils";
import { clearAccessToken, setAccessToken } from "@/common/services/cookies";

import { AUTH_ROUTES } from ".";

import { accessTokenCookieName, ROUTES } from "@/config";

function extractAccessTokenFromHeaders(headers: Headers) {
  const accessToken = headers
    .getSetCookie()
    .find((cookie) => cookie.startsWith(accessTokenCookieName))
    ?.split(";")[0]
    .split("=")[1];

  return accessToken;
}

export async function logIn(loginData: ILogIn) {
  try {
    const petition = await fetch(AUTH_ROUTES.LOG_IN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const accessToken = extractAccessTokenFromHeaders(petition.headers);

    const res: IResponse | IBadResponse = await petition.json();

    if (!accessToken) return res.message;

    validateResponse(res);

    await setAccessToken(accessToken);

    if (res.statusCode === 200) redirect("");

    return res.message;
  } catch (error) {
    await handleErrors(error, ROUTES.HOME);
  }
}

export async function register(
  registerData: IRegister
): Promise<string | void> {
  try {
    const petition = await fetch(AUTH_ROUTES.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const res: IResponse | IBadResponse = await petition.json();

    const accessToken = extractAccessTokenFromHeaders(petition.headers);

    if (!accessToken) return res.message;

    validateResponse(res);

    await setAccessToken(accessToken);

    if (res.statusCode === 201) redirect("");

    return res.message;
  } catch (error) {
    await handleErrors(error, ROUTES.HOME);
  }
}

export async function logOut() {
  await clearAccessToken();
}
