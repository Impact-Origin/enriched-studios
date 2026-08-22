import React from "react";

import { Container, Eyebrow } from "@/components/section";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";

/**
 * O que fica do nosso lado. De propósito mais seco do que a linha de tempo,
 * para a complementar em vez de competir com ela.
 */
export const Delivery = ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale);
  const text = dict.delivery;

  return (
    <section id="delivery" className="relative isolate overflow-hidden border-y border-white/[0.08] bg-ink-soft py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{text.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
                {text.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-white/55 md:text-lg">{text.lead}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {text.items.map((item, index) => (
            <Reveal key={item} delay={index * 0.06}>
              <div className="group relative h-full bg-ink-soft p-7 transition-colors duration-500 hover:bg-ink">
                <span className="font-mono text-xs tracking-[0.24em] text-brand-400">
                  0{index + 1}
                </span>
                <p className="mt-5 font-display text-lg leading-snug text-white md:text-xl">
                  {item}
                </p>
                <span className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-brand-500 transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
