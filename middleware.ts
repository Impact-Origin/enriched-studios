import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  locales,
  routeKeyFromCanonicalSlug,
  routeKeyFromSlug,
  routes,
  type Locale,
} from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => {
        const [tag, q] = part.trim().split(";q=");
        return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
      })
      .sort((a, b) => b.q - a.q);

    for (const { tag } of preferred) {
      const base = tag.split("-")[0];
      if (isLocale(base)) return base;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const [first, ...rest] = segments;

  // No locale prefix -> send the visitor to their language.
  if (!isLocale(first)) {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    url.search = search;
    return NextResponse.redirect(url);
  }

  const locale = first;
  const slug = rest.join("/");

  // pass the active language on to the app (used by the 404 page)
  const withLocale = () => {
    const headers = new Headers(request.headers);
    headers.set("x-locale", locale);
    return headers;
  };

  if (!slug) return NextResponse.next({ request: { headers: withLocale() } });

  // /pt/servicos -> render /pt/services, URL stays Portuguese.
  const key = routeKeyFromSlug(locale, slug);
  if (key) {
    const canonical = routes[key].en;
    if (canonical === slug) {
      return NextResponse.next({ request: { headers: withLocale() } });
    }
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/${canonical}`;
    return NextResponse.rewrite(url, { request: { headers: withLocale() } });
  }

  // /pt/services -> permanent redirect to the localized slug (avoids duplicate content).
  const canonicalKey = routeKeyFromCanonicalSlug(slug);
  if (canonicalKey) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/${routes[canonicalKey][locale]}`;
    return NextResponse.redirect(url, 308);
  }

  // /en/servicos -> /en/services: a slug from the other language still lands right.
  const foreignKey = locales
    .filter((item) => item !== locale)
    .map((item) => routeKeyFromSlug(item, slug))
    .find(Boolean);
  if (foreignKey) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/${routes[foreignKey][locale]}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next({ request: { headers: withLocale() } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
