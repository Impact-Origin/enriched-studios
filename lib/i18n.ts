export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeLabels: Record<Locale, { short: string; long: string; htmlLang: string; ogLocale: string }> = {
  pt: { short: "PT", long: "Português", htmlLang: "pt-PT", ogLocale: "pt_PT" },
  en: { short: "EN", long: "English", htmlLang: "en", ogLocale: "en_GB" },
};

export type RouteKey =
  | "home"
  | "services"
  | "portfolio"
  | "contact"
  | "privacy"
  | "terms"
  | "cookies";

/**
 * Localized slugs. The `en` value doubles as the canonical folder name inside
 * `app/[locale]`, so `/pt/servicos` is rewritten to `/pt/services` by the middleware
 * while the visible URL stays Portuguese (better for SEO).
 */
export const routes: Record<RouteKey, Record<Locale, string>> = {
  home: { pt: "", en: "" },
  services: { pt: "servicos", en: "services" },
  portfolio: { pt: "portfolio", en: "portfolio" },
  contact: { pt: "contactos", en: "contact" },
  privacy: { pt: "politica-de-privacidade", en: "privacy-policy" },
  terms: { pt: "termos-e-condicoes", en: "terms-and-conditions" },
  cookies: { pt: "politica-de-cookies", en: "cookie-policy" },
};

export const routeKeys = Object.keys(routes) as RouteKey[];

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Public, localized path for a route: pathFor("pt", "services") -> "/pt/servicos" */
export function pathFor(locale: Locale, key: RouteKey): string {
  const slug = routes[key][locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

/** Canonical (rewrite target) path: always the English slug. */
export function canonicalPathFor(locale: Locale, key: RouteKey): string {
  const slug = routes[key].en;
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function routeKeyFromSlug(locale: Locale, slug: string): RouteKey | undefined {
  return routeKeys.find((key) => routes[key][locale] === slug);
}

export function routeKeyFromCanonicalSlug(slug: string): RouteKey | undefined {
  return routeKeys.find((key) => routes[key].en === slug);
}

/** Same page, other language. Used by the language switcher. */
export function alternatePath(key: RouteKey, locale: Locale): string {
  return pathFor(locale, key);
}
