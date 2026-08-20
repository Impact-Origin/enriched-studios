import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { Work } from "@/components/sections/work";
import { CTA } from "@/components/sections/cta";
import { getMediaMap } from "@/lib/media-fs";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import { JsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return buildMetadata({
    locale: params.locale,
    routeKey: "portfolio",
    title: dict.pages.portfolio.title,
    description: dict.pages.portfolio.description,
  });
}

export default function PortfolioPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const page = getDictionary(locale).pages.portfolio;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, "portfolio", page.eyebrow)} />
      <PageHero eyebrow={page.eyebrow} title={page.heroTitle} lead={page.heroLead} />
      <Work locale={locale} variant="full" showHeader={false} media={getMediaMap()} />
      <CTA locale={locale} />
    </>
  );
}
