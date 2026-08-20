import React from "react";
import { Container, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";

export const Process = ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale);

  return (
    <section id="process" className="scroll-mt-24 relative isolate overflow-hidden border-y border-white/[0.08] bg-ink-soft py-24 md:py-32">
      <Container className="relative z-10">
        <SectionHeader
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
          lead={dict.process.lead}
        />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <SpotlightCard className="group relative h-full bg-ink-soft p-8 transition-colors duration-500 hover:bg-ink">
                <span className="font-mono text-xs tracking-[0.24em] text-brand-400">
                  {step.number}
                </span>
                <h3 className="mt-6 font-display text-2xl text-white">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/50">{step.description}</p>
                <span className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-brand-500 transition-transform duration-500 group-hover:scale-x-100" />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
