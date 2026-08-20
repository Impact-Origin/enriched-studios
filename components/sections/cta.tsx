import React from "react";
import { Link } from "next-view-transitions";
import { IconArrowUpRight, IconBrandInstagram } from "@tabler/icons-react";

import { Container, Eyebrow } from "@/components/section";
import { Button } from "@/components/button";
import { Mark } from "@/components/brand/mark";
import { Grain } from "@/components/backdrop";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import { pathFor, type Locale } from "@/lib/i18n";

export const CTA = ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale);

  return (
    <section id="contact-cta" className="scroll-mt-24 relative isolate overflow-hidden py-24 md:py-32">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-brand-400/25 bg-gradient-to-br from-brand-900 via-brand-950 to-black px-8 py-20 md:px-16 md:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-brand-500/25 blur-[120px]"
          />
          <Mark spin className="pointer-events-none absolute -bottom-32 -left-24 h-[26rem] w-[26rem] opacity-25 mix-blend-luminosity" />
          <Grain />

          <div className="relative z-10 max-w-3xl">
            <Reveal>
              <Eyebrow className="text-brand-200">{dict.cta.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-4xl leading-[1.03] tracking-[-0.02em] text-white md:text-6xl">
                {dict.cta.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
                {dict.cta.lead}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button as={Link} href={pathFor(locale, "contact")}>
                  {dict.cta.primary}
                  <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                <Button
                  as="a"
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                >
                  <IconBrandInstagram className="h-4 w-4" />
                  {dict.cta.secondary}
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                {dict.cta.note}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
