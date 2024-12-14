"use server";

import { getAccessToken } from "@/common/services/cookies";
import {
  getCookieHeader,
  handleErrors,
  validateResponse,
} from "@/common/services/utils";

import { IChangePassword, IGetUserResponse } from "../interfaces";
import { IResponse } from "@/common/interfaces";

import { USER_ROUTES } from "./user.routes";

export async function getUser() {
  const token = await getAccessToken({ redirectToLogin: true });

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
  const token = await getAccessToken({ redirectToLogin: true });

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
