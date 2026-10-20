import { NextResponse, type NextRequest } from "next/server";

// English lives under /en. The same pages serve both languages: /en/<path> is
// rewritten to /<path> with an x-lang header, so the server renders English
// HTML (lang, dir, metadata, text) on the first response.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
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

export const config = { matcher: ["/en", "/en/:path*"] };
