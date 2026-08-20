import React from "react";
import { Link } from "next-view-transitions";
import { Logo } from "@/components/logo";
import { Container } from "@/components/section";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Mark } from "@/components/brand/mark";
import { getDictionary } from "@/content/dictionaries";
import { getLegal } from "@/content/legal";
import { site } from "@/content/site";
import { pathFor, type Locale, type RouteKey } from "@/lib/i18n";

export const Footer = ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  const legal = getLegal(locale);
  const legalLinks: { key: RouteKey; label: string }[] = [
    { key: "privacy", label: legal.privacy.title },
    { key: "terms", label: legal.terms.title },
    { key: "cookies", label: legal.cookies.title },
  ];

  const nav: { key: RouteKey; label: string }[] = [
    { key: "services", label: dict.nav.services },
    { key: "portfolio", label: dict.nav.portfolio },
    { key: "contact", label: dict.nav.contact },
  ];

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.08] bg-ink">
      <Mark className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] opacity-[0.12]" />
      <Container className="relative z-10 py-20 md:py-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Logo locale={locale} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/45">
              {dict.footer.tagline}
            </p>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-brand-400/60 hover:text-white"
            >
              {site.socials.instagramHandle}
            </a>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow">{dict.footer.navTitle}</h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={pathFor(locale, item.key)}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {item.label}
                    <IconArrowUpRight className="h-3.5 w-3.5 -translate-x-1 text-brand-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow">{dict.footer.servicesTitle}</h3>
            <ul className="mt-5 space-y-3">
              {dict.footer.services.map((service) => (
                <li key={service} className="text-sm text-white/55">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow">{dict.footer.legalTitle}</h3>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={pathFor(locale, item.key)}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {item.label}
                    <IconArrowUpRight className="h-3.5 w-3.5 -translate-x-1 text-brand-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.legal.complaintsBook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
                >
                  {dict.footer.complaints}
                  <IconArrowUpRight className="h-3.5 w-3.5 -translate-x-1 text-brand-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow">{dict.footer.contactTitle}</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                {site.city}, {site.region}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.07] pt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 md:flex-row md:items-center">
          <span>
            © {year} {site.legalName} · {dict.footer.rights}
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{dict.footer.madeIn}</span>
            <span>
              {dict.footer.builtBy}{" "}
              <a
                href={site.builtBy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 underline-offset-4 transition-colors duration-300 hover:text-brand-300 hover:underline"
              >
                {site.builtBy.name}
              </a>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
