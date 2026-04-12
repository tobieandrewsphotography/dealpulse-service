import { NextRequest, NextResponse } from "next/server";

// Routes the hostname to the correct route group.
// dealpulseagent.com -> /(onboarding)
// dealpulsescore.com -> /(marketing)
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/api") || url.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (host.includes("dealpulseagent")) {
    url.pathname = `/agent${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
