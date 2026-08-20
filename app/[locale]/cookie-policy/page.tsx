import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPage } from "@/components/legal-page";
import { getLegal } from "@/content/legal";
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
  const document = getLegal(params.locale).cookies;
  return buildMetadata({
    locale: params.locale,
    routeKey: "cookies",
    title: document.title,
    description: document.description,
  });
}

export default function LegalRoute({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const document = getLegal(params.locale).cookies;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(params.locale, "cookies", document.title)} />
      <LegalPage document={document} />
    </>
  );
}
