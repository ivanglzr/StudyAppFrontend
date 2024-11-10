"use server";

import { getAccessToken } from "../cookies";
import { getCookieHeader, handleErrors, validateResponse } from "../utils";

import { IGetUserResponse } from "@/interfaces/user.interfaces";

import { USER_ROUTES } from "./user.routes";

export async function getUser() {
  const token = await getAccessToken(true);

  //? Only to avoid typescript error
  if (!token) return;

  try {
    const petition = await fetch(USER_ROUTES.GET_USER, {
      method: "GET",
      headers: getCookieHeader(token),
    });
    const res: IGetUserResponse = await petition.json();

    validateResponse(res);

    return res.user;
  } catch (error) {
    await handleErrors(error);
  }
}
