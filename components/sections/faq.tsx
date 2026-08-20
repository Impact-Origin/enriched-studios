"use client";
import React from "react";
import { IconPlus } from "@tabler/icons-react";

import { Container, SectionHeader } from "@/components/section";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const FAQ = ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale);
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 relative isolate overflow-hidden py-24 md:py-32">
      <Container className="relative z-10">
        <SectionHeader eyebrow={dict.faq.eyebrow} title={dict.faq.title} lead={dict.faq.lead} />

        <div className="mt-14 border-t border-white/[0.08]">
          {dict.faq.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className="border-b border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-brand-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-xl transition-colors duration-300 md:text-2xl",
                        isOpen ? "text-white" : "text-white/75"
                      )}
                    >
                      {item.q}
                    </span>
                  </span>
                  <IconPlus
                    className={cn(
                      "mt-1 h-5 w-5 shrink-0 text-white/55 transition-transform duration-300",
                      isOpen && "rotate-45 text-brand-400"
                    )}
                  />
                </button>
                {/* abrir e fechar com grid-template-rows: anima a altura sem JavaScript */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-400 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-8 pl-[3.4rem] text-[15px] leading-relaxed text-white/55">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
