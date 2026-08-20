import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { localeLabels, locales, pathFor, routeKeys } from "@/lib/i18n";

const base = site.url.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    routeKeys.map((key) => ({
      url: `${base}${pathFor(locale, key)}`,
      lastModified,
      changeFrequency: key === "portfolio" ? ("weekly" as const) : ("monthly" as const),
      priority: key === "home" ? 1 : key === "contact" ? 0.7 : 0.8,
      alternates: {
        languages: locales.reduce<Record<string, string>>((acc, alt) => {
          acc[localeLabels[alt].htmlLang] = `${base}${pathFor(alt, key)}`;
          return acc;
        }, {}),
      },
    }))
  );
}
