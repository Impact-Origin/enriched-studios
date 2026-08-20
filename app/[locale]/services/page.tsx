import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { IconArrowUpRight, IconPointFilled } from "@tabler/icons-react";

import { PageHero } from "@/components/sections/page-hero";
import { Services } from "@/components/sections/services";
import { getMediaMap } from "@/lib/media-fs";
import { Process } from "@/components/sections/process";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Container, Eyebrow } from "@/components/section";
import { Button } from "@/components/button";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales, pathFor } from "@/lib/i18n";
import { JsonLd, breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

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
    routeKey: "services",
    title: dict.pages.services.title,
    description: dict.pages.services.description,
  });
}

export default function ServicesPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDictionary(locale);
  const page = dict.pages.services;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, "services", page.eyebrow)} />
      <JsonLd data={faqJsonLd(locale)} />
      <PageHero eyebrow={page.eyebrow} title={page.heroTitle} lead={page.heroLead} />

      <Services locale={locale} media={getMediaMap()} />

      <section className="relative border-y border-white/[0.08] bg-ink-soft py-24 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>{page.addonsTitle}</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 font-display text-3xl leading-tight text-white md:text-5xl">
                  {page.pricingTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
                  {page.pricingLead}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <Button as={Link} href={pathFor(locale, "contact")} className="mt-8">
                  {page.pricingCta}
                  <IconArrowUpRight className="h-4 w-4" />
                </Button>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2">
                {page.addons.map((addon, index) => (
                  <Reveal key={addon} delay={index * 0.05}>
                    <li className="flex h-full items-start gap-3 bg-ink-soft p-6 text-sm text-white/70">
                      <IconPointFilled className="mt-1 h-3 w-3 shrink-0 text-brand-500" />
                      {addon}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Process locale={locale} />
      <FAQ locale={locale} />
      <CTA locale={locale} />
    </>
  );
}
