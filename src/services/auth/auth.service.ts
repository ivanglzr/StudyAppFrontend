"use server";

import { redirect } from "next/navigation";

import { IResponse, IBadResponse } from "@/interfaces/response.interfaces";
import { ILogIn } from "@/interfaces/auth.interfaces";

import { handleErrors, validateResponse } from "../utils";
import { clearAccessToken, setAccessToken } from "../cookies";

import { AUTH_ROUTES } from "./auth.routes";

export async function logIn(loginData: ILogIn) {
  try {
    const petition = await fetch(AUTH_ROUTES.LOG_IN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const accessToken = petition.headers
      .get("Set-Cookie")
      ?.split(";")[0]
      .split("=")[1];

    const res: IResponse | IBadResponse = await petition.json();

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
