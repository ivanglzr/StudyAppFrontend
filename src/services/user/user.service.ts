"use server";

import { getAccessToken } from "../cookies";
import { getCookieHeader, handleErrors, validateResponse } from "../utils";

import {
  IChangePassword,
  IGetUserResponse,
} from "@/interfaces/user.interfaces";
import { IResponse } from "@/interfaces/response.interfaces";

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

export async function changeUserPassword(passwords: IChangePassword) {
  const token = await getAccessToken(true);

  //? Only to avoid typescript error
  if (!token) return;

  try {
    const petition = await fetch(USER_ROUTES.CHANGE_PASSWORD, {
      method: "PATCH",
      headers: {
        ...getCookieHeader(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwords),
    });
    const res: IResponse = await petition.json();

    validateResponse(res);

    return res.message;
  } catch (error) {
    await handleErrors(error);
  }
}
