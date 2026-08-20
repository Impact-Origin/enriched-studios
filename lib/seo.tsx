import type { Metadata } from "next";
import { site } from "@/content/site";
import { getDictionary } from "@/content/dictionaries";
import { localeLabels, locales, pathFor, type Locale, type RouteKey } from "@/lib/i18n";

export function absoluteUrl(path: string) {
  return `${site.url.replace(/\/$/, "")}${path}`;
}

/** Canonical + hreflang alternates + Open Graph for a given page, in a given language. */
export function buildMetadata({
  locale,
  routeKey,
  title,
  description,
  keywords,
}: {
  locale: Locale;
  routeKey: RouteKey;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const canonical = absoluteUrl(pathFor(locale, routeKey));

  const languages = locales.reduce<Record<string, string>>((acc, current) => {
    acc[localeLabels[current].htmlLang] = absoluteUrl(pathFor(current, routeKey));
    return acc;
  }, {});
  languages["x-default"] = absoluteUrl(pathFor("pt", routeKey));

  return {
    title,
    description,
    keywords,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: localeLabels[locale].ogLocale,
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => localeLabels[item].ogLocale),
      url: canonical,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** LocalBusiness / ProfessionalService structured data, plus the services we offer. */
export function organizationJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    description: dict.pages.home.description,
    url: absoluteUrl(pathFor(locale, "home")),
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/logo.png"),
    email: site.email,
    telephone: site.phone,
    foundingDate: site.founded,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "PT",
    },
    areaServed: site.areaServed.map((area) => ({ "@type": "Place", name: area })),
    sameAs: Object.values(site.socials).filter(
      (value) => typeof value === "string" && value.startsWith("http")
    ),
    knowsLanguage: ["pt-PT", "en"],
    makesOffer: dict.services.items.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        serviceType: service.tagline,
      },
    })),
  };
}

export function faqJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(locale: Locale, routeKey: RouteKey, label: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: site.name,
        item: absoluteUrl(pathFor(locale, "home")),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: absoluteUrl(pathFor(locale, routeKey)),
      },
    ],
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
