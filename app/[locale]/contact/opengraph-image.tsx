import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Enriched Studios";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function OpengraphImage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : "pt";
  const page = getDictionary(locale).pages.contact;
  return renderOgImage({ title: page.heroTitle, subtitle: page.description });
}
