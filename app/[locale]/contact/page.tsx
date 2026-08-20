import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IconArrowUpRight, IconBrandWhatsapp } from "@tabler/icons-react";

import { ContactForm } from "@/components/contact-form";
import { Container, Eyebrow } from "@/components/section";
import { Bloom, Grain, GridLines } from "@/components/backdrop";
import { getDictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
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
    routeKey: "contact",
    title: dict.pages.contact.title,
    description: dict.pages.contact.description,
  });
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const page = getDictionary(params.locale).pages.contact;

  const channels = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Tel.", value: site.phone, href: `tel:${site.phoneHref}` },
    {
      label: "Instagram",
      value: site.socials.instagramHandle,
      href: site.socials.instagram,
      external: true,
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(params.locale, "contact", page.eyebrow)} />

      <section className="relative isolate overflow-hidden pb-28 pt-36 md:pb-36 md:pt-44">
        <GridLines />
        <Bloom className="-right-56 -top-40 opacity-60" intensity={0.38} />
        <Grain />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Eyebrow>{page.eyebrow}</Eyebrow>

                <h1 className="mt-7 font-display text-[clamp(3rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-white">
                  {page.heroTitle}
                </h1>

                <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
                  {page.heroLead}
                </p>

                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/12 px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-brand-400/70 hover:bg-brand-500/10"
                >
                  <IconBrandWhatsapp className="h-4 w-4 text-brand-300" />
                  {page.whatsappLabel}
                </a>

                <dl className="mt-12 border-t border-white/[0.08]">
                  {channels.map((channel) => (
                    <div
                      key={channel.label}
                      className="flex items-baseline justify-between gap-6 border-b border-white/[0.08] py-5"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                        {channel.label}
                      </dt>
                      <dd>
                        <a
                          href={channel.href}
                          {...(channel.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="group inline-flex items-center gap-2 font-display text-lg text-white/85 transition-colors duration-300 hover:text-white"
                        >
                          {channel.value}
                          <IconArrowUpRight className="h-3.5 w-3.5 text-brand-400 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </a>
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/55">
                  {page.availability}
                  <br />
                  {page.coverage}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ContactForm locale={params.locale} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
