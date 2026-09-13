import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "btt_admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes, but exclude /admin/login and auth APIs
  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login"
  ) {
    const sessionCookie = request.cookies.get(COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
