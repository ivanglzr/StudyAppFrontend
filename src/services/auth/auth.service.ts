"use server";

import { redirect } from "next/navigation";

import { IResponse, IBadResponse } from "@/interfaces/response.interfaces";
import { ILogIn, IRegister } from "@/interfaces/auth.interfaces";

import { handleErrors, validateResponse } from "../utils";
import { clearAccessToken, setAccessToken } from "../cookies";

import { AUTH_ROUTES } from "./auth.routes";

import { accessTokenCookieName } from "./auth.config";

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

    return res.message;
  } catch (error) {
    await handleErrors(error);
  }
}

export async function register(registerData: IRegister) {
  try {
    const petition = await fetch(AUTH_ROUTES.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const res = await petition.json();

    const accessToken = extractAccessTokenFromHeaders(petition.headers);

    if (!accessToken) return res.message;

    validateResponse(res);

    await setAccessToken(accessToken);

    return res.message;
  } catch (error) {
    await handleErrors(error);
  }
}

export async function logOut() {
  await clearAccessToken();

  redirect("/login");
}
