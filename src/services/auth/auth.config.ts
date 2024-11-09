import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const accessTokenCookieName = "access_token";

export const cookieOptions: Partial<ResponseCookie> = {
  secure: true,
  httpOnly: true,
  sameSite: "lax",
  expires: 1000 * 60 * 1000,
};
