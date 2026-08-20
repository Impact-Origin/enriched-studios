"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

import { MediaFrame } from "@/components/media-frame";
import { useReducedMotion } from "@/components/ui/interaction";
import { getDictionary } from "@/content/dictionaries";
import type { HeroSlide } from "@/lib/hero-fs";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const STEP_MS = 5000;

/**
 * Carrossel do topo. Arrasta-se, anda sozinho e pára assim que alguém lhe toca
 * ou passa o rato por cima. Com uma imagem só, não mostra pontos nem contador.
 */
export const HeroCarousel = ({ locale, slides }: { locale: Locale; slides: HeroSlide[] }) => {
  const dict = getDictionary(locale);
  const reduced = useReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start", duration: 28 });
  const [selected, setSelected] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect);
    embla.on("pointerDown", () => setPaused(true));
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  React.useEffect(() => {
    if (!embla || paused || reduced || slides.length < 2) return;

    // com o separador em segundo plano o browser trava as animações, e um avanço
    // disparado aí ficaria a meio do deslize até alguém voltar à página
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") embla.scrollNext();
    }, STEP_MS);

    return () => window.clearInterval(timer);
  }, [embla, paused, reduced, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div ref={emblaRef} className="overflow-hidden rounded-2xl">
        <div className="flex touch-pan-y">
          {slides.map((slide, index) => (
            <div key={slide.src} className="min-w-0 shrink-0 grow-0 basis-full">
              <MediaFrame
                ratio="1:1"
                label={slide.label ?? dict.hero.mediaLabel}
                poster={slide.src}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="mt-5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => {
                  embla?.scrollTo(index);
                  setPaused(true);
                }}
                aria-label={`${dict.ui.goTo} ${index + 1}`}
                aria-current={index === selected}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  index === selected ? "w-8 bg-brand-400" : "w-2.5 bg-white/25 hover:bg-white/50"
                )}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/45">
            {String(selected + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      ) : null}
    </div>
  );
};
