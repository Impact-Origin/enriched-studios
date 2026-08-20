import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero } from "@/components/hero";
import { Clients } from "@/components/clients";
import { ServicesTimeline } from "@/components/sections/services-timeline";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { Why } from "@/components/sections/why";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { getMediaMap } from "@/lib/media-fs";
import { getPartners } from "@/lib/partners-fs";
import { getHeroSlides } from "@/lib/hero-fs";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import { JsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

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
    routeKey: "home",
    title: dict.pages.home.title,
    description: dict.pages.home.description,
    keywords:
      params.locale === "pt"
        ? [
            "vídeo imobiliário",
            "produtora de vídeo imobiliário",
            "tour de imóvel vídeo",
            "reels imobiliário",
            "marca pessoal consultor imobiliário",
            "drone imobiliário",
            "vídeo para agências imobiliárias",
          ]
        : [
            "real estate video",
            "real estate video production",
            "property tour video",
            "real estate reels",
            "personal branding for realtors",
            "drone real estate video",
            "video for real estate agencies",
          ],
  });
}

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const media = getMediaMap();
  const partners = getPartners();
  const heroSlides = getHeroSlides();

  return (
    <>
      <JsonLd data={faqJsonLd(locale)} />
      <Hero locale={locale} slides={heroSlides} />
      <Clients locale={locale} partners={partners} />
      <ServicesTimeline locale={locale} media={media} />
      <Process locale={locale} />
      <Work locale={locale} media={media} />
      <Why locale={locale} media={media} />
      <FAQ locale={locale} />
      <CTA locale={locale} />
    </>
  );
}
