import React from "react";
import { Link } from "next-view-transitions";
import { IconArrowUpRight, IconBrandInstagram } from "@tabler/icons-react";

import { Button } from "@/components/button";
import { Container, Eyebrow } from "@/components/section";
import { HeroCarousel } from "@/components/hero-carousel";
import { Bloom, Grain, GridLines } from "@/components/backdrop";
import { RevealWords } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { getDictionary } from "@/content/dictionaries";
import type { HeroSlide } from "@/lib/hero-fs";
import { site } from "@/content/site";
import { pathFor, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Hero = ({ locale, slides }: { locale: Locale; slides: HeroSlide[] }) => {
  const dict = getDictionary(locale);

  return (
    <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <GridLines />
      <Bloom className="-right-40 -top-40 opacity-80" intensity={0.55} />
      <Bloom className="-left-56 top-1/3 h-[26rem] w-[26rem] opacity-60" intensity={0.28} />
      <Grain />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="fade-up">
              <Eyebrow>{dict.hero.eyebrow}</Eyebrow>
            </div>

            <h1 className="mt-8 font-display text-[clamp(2.75rem,7vw,5.6rem)] font-normal leading-[0.98] tracking-[-0.03em] text-white">
              <span className="block">
                <RevealWords text={dict.hero.titleLine1} delay={0.15} />
              </span>
              <span className="block text-white/85">
                <RevealWords text={dict.hero.titleLine2} delay={0.35} />{" "}
                <span className="relative inline-block italic text-brand-300">
                  <RevealWords text={dict.hero.titleAccent} delay={0.5} />
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_1.05s_both] bg-gradient-to-r from-brand-400 to-transparent" />
                </span>
              </span>
            </h1>

            <p
              className="fade-up mt-8 max-w-xl text-base leading-relaxed text-white/55 md:text-lg"
              style={{ animationDelay: "0.55s" }}
            >
              {dict.hero.lead}
            </p>

            <div
              className="fade-up mt-10 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "0.7s" }}
            >
              <Button as={Link} href={pathFor(locale, "contact")}>
                {dict.actions.bookCall}
                <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <Button as={Link} href={pathFor(locale, "portfolio")} variant="ghost">
                {dict.actions.seeWork}
              </Button>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all duration-300 hover:border-brand-400/60 hover:text-white"
              >
                <IconBrandInstagram className="h-5 w-5" />
              </a>
            </div>

            <p
              className="fade-up mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50"
              style={{ animationDelay: "0.85s" }}
            >
              {dict.hero.note}
            </p>
          </div>

          <div className="relative lg:col-span-5">
            <div
              className="fade-up relative z-20 mx-auto w-[92%] sm:w-[78%] lg:w-[96%]"
              style={{ animationDelay: "0.3s" }}
            >
              <div style={{ transform: "rotate(1.5deg)" }}>
                <div className="parallax" style={{ "--parallax-from": "40px", "--parallax-to": "-50px" } as React.CSSProperties}>
<HeroCarousel locale={locale} slides={slides} />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 border-t border-white/[0.08] md:grid-cols-4">
          {dict.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "reveal group relative px-1 py-8 md:px-8",
                "border-b border-white/[0.08] md:border-b-0",
                index % 2 === 0 ? "md:border-r" : "md:border-r",
                index === dict.stats.length - 1 && "md:border-r-0",
                index % 2 === 1 && "border-l border-white/[0.08] md:border-l-0"
              )}
            >
              <p className="font-display text-4xl leading-none text-white md:text-6xl">
                <Counter value={stat.value} locale={locale} />
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-white/70">
                {stat.label}
              </p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-brand-400 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
