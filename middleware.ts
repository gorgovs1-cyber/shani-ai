import { NextResponse, type NextRequest } from "next/server";

// English lives under /en. The same pages serve both languages: /en/<path> is
// rewritten to /<path> with an x-lang header, so the server renders English
// HTML (lang, dir, metadata, text) on the first response.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();
  url.pathname = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const headers = new Headers(req.headers);
  headers.set("x-lang", "en");
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = { matcher: ["/en", "/en/:path*"] };
