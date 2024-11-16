import { NextResponse, type NextRequest } from "next/server";
import { accessTokenCookieName, ROUTES } from "./config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!request.cookies.has(accessTokenCookieName))
    return NextResponse.redirect(new URL(ROUTES.LOG_IN, request.url));

  if (pathname === "/")
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
}

export const config = {
  matcher: ["/((?!auth|_next/static|_next/image|favicon.ico).*)"],
};
