import { NextResponse, type NextRequest } from "next/server";

// English lives under /en. The same pages serve both languages: /en/<path> is
// rewritten to /<path> with an x-lang header, so the server renders English
// HTML (lang, dir, metadata, text) on the first response.

// The performance dashboard (page + JSON) is private. It is served only with HTTP Basic Auth
// (any user name, password = DASHBOARD_PASSWORD). Until that variable is set in Vercel it answers 404,
// so nothing is exposed. No data is deleted; the files and the API route stay in place.
const PRIVATE_HEADERS = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "private, no-store" };

function dashboardGate(req: NextRequest): NextResponse | null {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
  const header = req.headers.get("authorization") || "";
  if (header.startsWith("Basic ")) {
    try {
      const given = atob(header.slice(6)).split(":").slice(1).join(":");
      if (given.length === password.length && given === password) return null;
    } catch {
      /* fall through to the challenge */
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { ...PRIVATE_HEADERS, "WWW-Authenticate": 'Basic realm="Shani AI dashboard", charset="UTF-8"' },
  });
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/dashboard.html" || pathname === "/api/dashboard") {
    const blocked = dashboardGate(req);
    if (blocked) return blocked;
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }
  const url = req.nextUrl.clone();
  // /audit is a static page; its English twin (built by scripts/build-audit-en.js) carries English share tags.
  if (/^\/en\/audit\/?$/.test(pathname)) {
    url.pathname = "/audit-en.html";
    return NextResponse.rewrite(url);
  }
  url.pathname = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const headers = new Headers(req.headers);
  headers.set("x-lang", "en");
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = { matcher: ["/en", "/en/:path*", "/dashboard.html", "/api/dashboard"] };
