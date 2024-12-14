import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const cookieOptions: Partial<ResponseCookie> = {
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "lax",
  expires: new Date(Date.now() + 1000 * 60 * 60),
};
