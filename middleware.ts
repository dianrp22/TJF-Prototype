import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/dashboard") ||
    pathname.includes(".")
  ) {
    return;
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/en" ? "/" : pathname.slice(3);
    return NextResponse.redirect(url);
  }

  // /id or /id/... → pass through to [lang] pages
  if (pathname === "/id" || pathname.startsWith("/id/")) {
    return;
  }

  // No locale prefix → rewrite to /en/... so [lang] layout receives lang="en"
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
