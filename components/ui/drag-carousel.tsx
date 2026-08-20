"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

/**
 * Carrossel arrastável. O Embla trata do arrasto e da inércia;
 * aqui ficam a barra de progresso, o contador, as setas e o cursor.
 */
export const DragCarousel = ({
  children,
  labels,
  className,
  slideClassName,
}: {
  children: React.ReactNode[];
  labels: { drag: string; prev: string; next: string };
  className?: string;
  slideClassName?: string;
}) => {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });

  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (!embla) return;

    const onSelect = () => {
      setSelected(embla.selectedScrollSnap());
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    const onScroll = () => setProgress(Math.max(0, Math.min(1, embla.scrollProgress())));

    setSnaps(embla.scrollSnapList());
    onSelect();
    onScroll();

    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    embla.on("scroll", onScroll);
    embla.on("pointerDown", () => setTouched(true));

    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
      embla.off("scroll", onScroll);
    };
  }, [embla]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      embla?.scrollPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      embla?.scrollNext();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div
          ref={emblaRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          onKeyDown={onKeyDown}
          className="overflow-hidden focus:outline-none"
        >
          <div className="flex touch-pan-y gap-5">
            {children.map((child, index) => (
              <div
                key={index}
                className={cn("min-w-0 shrink-0 grow-0 basis-[78%] sm:basis-[46%] lg:basis-[28%]", slideClassName)}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

      <div className="mt-8 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            disabled={!canPrev}
            aria-label={labels.prev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white transition-all duration-300 hover:border-brand-400/70 hover:bg-brand-500/15 disabled:opacity-25 disabled:hover:border-white/12 disabled:hover:bg-transparent"
          >
            <IconArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            disabled={!canNext}
            aria-label={labels.next}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white transition-all duration-300 hover:border-brand-400/70 hover:bg-brand-500/15 disabled:opacity-25 disabled:hover:border-white/12 disabled:hover:bg-transparent"
          >
            <IconArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="relative h-px flex-1 bg-white/10">
          <span
            className="absolute inset-y-0 left-0 bg-brand-400 transition-[width] duration-200"
            style={{ width: `${Math.max(progress * 100, 6)}%` }}
          />
        </div>

        <span className="font-mono text-[11px] tracking-[0.2em] text-white/55">
          {String(selected + 1).padStart(2, "0")} / {String(snaps.length || children.length).padStart(2, "0")}
        </span>
      </div>

      <p
        className={cn(
          "pointer-events-none mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 transition-opacity duration-500",
          touched && "opacity-0"
        )}
      >
        {labels.drag}
      </p>
    </div>
  );
};
