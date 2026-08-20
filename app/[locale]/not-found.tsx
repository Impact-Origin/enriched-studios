import { headers } from "next/headers";
import { Link } from "next-view-transitions";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";

import { Container, Eyebrow } from "@/components/section";
import { Button } from "@/components/button";
import { Bloom, Grain, GridLines } from "@/components/backdrop";
import { Mark } from "@/components/brand/mark";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, pathFor, type Locale, type RouteKey } from "@/lib/i18n";

/** Barras de teste, como as de um monitor sem sinal, nos tons da marca. */
const bars = [
  "#b79bff",
  "#9b74fb",
  "#7c3aed",
  "#551bb0",
  "#33146a",
  "#1d0942",
  "#0e0e12",
  "#08080a",
];

export default function NotFound() {
  const headerLocale = headers().get("x-locale");
  const locale: Locale = isLocale(headerLocale) ? headerLocale : "pt";
  const dict = getDictionary(locale);
  const text = dict.notFound;

  const links: { key: RouteKey; label: string }[] = [
    { key: "services", label: dict.nav.services },
    { key: "portfolio", label: dict.nav.portfolio },
    { key: "contact", label: dict.nav.contact },
  ];

  return (
    <section className="relative isolate overflow-hidden pb-28 pt-36 md:pb-36 md:pt-44">
      <GridLines />
      <Bloom className="-right-40 -top-40 opacity-60" intensity={0.4} />
      <Grain />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>{text.eyebrow}</Eyebrow>

            <h1 className="mt-7 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-white">
              {text.title}
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/55">{text.lead}</p>

            <div className="mt-10">
              <Button as={Link} href={pathFor(locale, "home")}>
                {text.cta}
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            </div>

            <div className="mt-14 border-t border-white/[0.08] pt-8">
              <h2 className="eyebrow">{text.helpTitle}</h2>
              <ul className="mt-5 space-y-3">
                {links.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={pathFor(locale, item.key)}
                      className="group inline-flex items-baseline gap-2 font-display text-xl text-white/75 transition-colors duration-300 hover:text-white md:text-2xl"
                    >
                      {item.label}
                      <IconArrowUpRight className="h-4 w-4 shrink-0 text-brand-400 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* monitor sem sinal, com o número do erro em vez da imagem */}
          <div className="lg:col-span-5 lg:col-start-8">
            <figure className="relative isolate aspect-video overflow-hidden rounded-2xl border border-white/10 bg-ink-soft">
              <div aria-hidden className="absolute inset-0 flex">
                {bars.map((color) => (
                  <span key={color} className="h-full flex-1" style={{ backgroundColor: color }} />
                ))}
              </div>

              <div
                aria-hidden
                className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.6)_0_2px,transparent_2px_4px)]"
              />
              <Grain className="opacity-40" />

              <Mark className="absolute -bottom-12 -right-10 h-40 w-40 opacity-25 mix-blend-luminosity" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/80 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                  {text.signal}
                </span>
                <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-white/80 backdrop-blur">
                  00:00:404
                </span>
              </div>

              <figcaption className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-display text-[clamp(4rem,12vw,7rem)] leading-none text-white"
                  style={{ textShadow: "0 6px 30px rgba(8,8,10,0.65)" }}
                >
                  404
                </span>
              </figcaption>

              <div className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-2.5 backdrop-blur">
                <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                  {text.eyebrow} · {text.signal}
                </p>
              </div>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
