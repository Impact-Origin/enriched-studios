"use client";
import React from "react";
import { Link } from "next-view-transitions";
import { IconArrowUpRight } from "@tabler/icons-react";

import { Container, SectionHeader } from "@/components/section";
import { MediaFrame } from "@/components/media-frame";
import { Button } from "@/components/button";
import { Bloom, Grain } from "@/components/backdrop";
import { DragCarousel } from "@/components/ui/drag-carousel";
import { getDictionary } from "@/content/dictionaries";
import { pick, type MediaMap } from "@/lib/media";
import { pathFor, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type WorkItem = ReturnType<typeof getDictionary>["work"]["items"][number];

export const Work = ({
  locale,
  variant = "carousel",
  showHeader = true,
  media,
}: {
  locale: Locale;
  variant?: "carousel" | "full";
  showHeader?: boolean;
  media?: MediaMap;
}) => {
  const dict = getDictionary(locale);
  const [active, setActive] = React.useState("all");

  const labelFor = (item: WorkItem) =>
    dict.work.filters.find((filter) => filter.id === item.category)?.label ?? item.category;

  const filtered =
    active === "all" ? dict.work.items : dict.work.items.filter((item) => item.category === active);

  const card = (item: WorkItem, index: number, ratio: "9:16" | "4:5") => (
    <div key={item.id}>
      <MediaFrame
        ratio={ratio}
        label={labelFor(item)}
        title={item.title}
        duration={item.duration}
        index={index}
        {...pick(media, item.id)}
      />
      <p className="mt-3 px-1 text-sm leading-relaxed text-white/45">{item.description}</p>
    </div>
  );

  return (
    <section
      id="work"
      className={cn(
        "scroll-mt-24 relative isolate overflow-hidden pb-24 md:pb-32",
        showHeader ? "pt-24 md:pt-32" : "pt-2"
      )}
    >
      <Bloom className="-right-40 bottom-0 opacity-60" intensity={0.3} />
      <Grain />
      <Container className="relative z-10">
        {showHeader ? (
          <SectionHeader eyebrow={dict.work.eyebrow} title={dict.work.title} lead={dict.work.lead} />
        ) : null}

        {variant === "carousel" ? (
          <div className="mt-12">
            <DragCarousel labels={{ drag: dict.ui.drag, prev: dict.ui.prev, next: dict.ui.next }}>
              {dict.work.items.map((item, index) => card(item, index, "9:16"))}
            </DragCarousel>
          </div>
        ) : (
          <>
            <div className="mt-2">
              <p className="eyebrow mb-6">{dict.work.featured}</p>
              <DragCarousel labels={{ drag: dict.ui.drag, prev: dict.ui.prev, next: dict.ui.next }}>
                {dict.work.items.slice(0, 4).map((item, index) => card(item, index, "9:16"))}
              </DragCarousel>
            </div>

            <div className="mt-20 flex flex-wrap gap-2 border-t border-white/[0.08] pt-14">
              {dict.work.filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActive(filter.id)}
                  aria-pressed={active === filter.id}
                  className={cn(
                    "rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300",
                    active === filter.id
                      ? "border-brand-400/60 bg-brand-500/15 text-white"
                      : "border-white/10 text-white/45 hover:border-white/25 hover:text-white"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* grelha uniforme: sem colunas de altura variável, não salta ao filtrar */}
            <div key={active} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, index) => (
                <div
                  key={item.id}
                  className="fade-up"
                  style={{ animationDelay: `${Math.min(index * 60, 360)}ms` }}
                >
                  {card(item, index, "4:5")}
                </div>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="mt-16 text-center text-sm text-white/55">{dict.work.empty}</p>
            ) : null}
          </>
        )}

        <div className="mt-16 flex justify-center border-t border-white/[0.08] pt-14">
          <Button
            as={Link}
            href={variant === "carousel" ? pathFor(locale, "portfolio") : pathFor(locale, "contact")}
            variant={variant === "carousel" ? "ghost" : "primary"}
          >
            {variant === "carousel" ? dict.actions.allWork : dict.work.cta}
            <IconArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
};
