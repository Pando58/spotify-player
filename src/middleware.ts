import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  const { pathname } = req.nextUrl;

  /* if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  } */

  if (pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!pathname.startsWith("/login") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
  ],
};
