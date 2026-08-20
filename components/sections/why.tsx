"use client";
import React from "react";

import { Container, SectionHeader } from "@/components/section";
import { MediaFrame } from "@/components/media-frame";
import { Mark } from "@/components/brand/mark";
import { getDictionary } from "@/content/dictionaries";
import { useReducedMotion } from "@/components/ui/interaction";
import { pick, type MediaMap } from "@/lib/media";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const STEP_MS = 6000;

export const Why = ({ locale, media }: { locale: Locale; media?: MediaMap }) => {
  const dict = getDictionary(locale);
  const items = dict.why.items;
  const reduced = useReducedMotion();

  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (reduced || paused) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % items.length),
      STEP_MS
    );
    return () => window.clearTimeout(timer);
  }, [active, paused, reduced, items.length]);

  return (
    <section id="why" className="scroll-mt-24 relative isolate overflow-hidden py-24 md:py-32">
      <Mark spin className="pointer-events-none absolute -left-48 top-1/4 h-[32rem] w-[32rem] opacity-[0.07]" />
      <Container className="relative z-10">
        <SectionHeader eyebrow={dict.why.eyebrow} title={dict.why.title} lead={dict.why.lead} />

        <div
          className="mt-16"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {/* a linha da grelha tem só a lista e o vídeo, para as duas caixas
              terem o mesmo topo e a mesma altura, logo também o mesmo centro */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="border-t border-white/[0.08]">
                {items.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <div
                      key={item.title}
                      onPointerEnter={() => setActive(index)}
                      className="group relative border-b border-white/[0.08]"
                    >
                      <button
                        type="button"
                        onFocus={() => setActive(index)}
                        onClick={() => setActive(index)}
                        aria-pressed={isActive}
                        className="flex w-full items-baseline gap-5 py-6 text-left"
                      >
                        <span
                          className={cn(
                            "font-mono text-xs tracking-[0.2em] transition-colors duration-500",
                            isActive ? "text-brand-300" : "text-white/45"
                          )}
                        >
                          0{index + 1}
                        </span>
                        <span
                          className={cn(
                            "font-display text-2xl transition-colors duration-500 md:text-3xl",
                            isActive ? "text-white" : "text-white/45 group-hover:text-white/75"
                          )}
                        >
                          {item.title}
                        </span>
                      </button>

                      <span className="absolute bottom-0 left-0 h-px w-full overflow-hidden">
                        <span
                          className={cn(
                            "block h-full bg-brand-400 transition-[width] ease-linear",
                            isActive && !reduced && !paused ? "w-full" : "w-0"
                          )}
                          style={{
                            transitionDuration:
                              isActive && !reduced && !paused ? `${STEP_MS}ms` : "250ms",
                          }}
                        />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              {/* h-full copia a altura da coluna do texto; as camadas ficam
                  empilhadas e só muda a opacidade, sem depender de JavaScript */}
              <div className="relative h-full min-h-[20rem] sm:min-h-[24rem]">
                {items.map((item, index) => (
                  <div
                    key={item.title}
                    aria-hidden={index !== active}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500",
                      index === active ? "opacity-100" : "pointer-events-none opacity-0"
                    )}
                  >
                    <MediaFrame
                      fill
                      label={item.title}
                      index={index}
                      className="h-full"
                      {...pick(media, `why-${index + 1}`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* descrição por baixo da linha, com espaço reservado para não empurrar nada */}
          <div className="relative mt-8 min-h-[7rem] md:min-h-[5.5rem] lg:w-1/2">
            {items.map((item, index) => (
              <p
                key={item.title}
                aria-hidden={index !== active}
                className={cn(
                  "absolute inset-x-0 top-0 max-w-lg text-[15px] leading-relaxed text-white/55",
                  "transition-opacity duration-500",
                  index === active ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                {item.description}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
