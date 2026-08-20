"use client";
import React from "react";
import { Link } from "next-view-transitions";
import { IconArrowUpRight, IconPlayerPauseFilled, IconPlayerPlayFilled, IconPointFilled } from "@tabler/icons-react";

import { Container, SectionHeader } from "@/components/section";
import { MediaFrame } from "@/components/media-frame";
import { Bloom, Grain } from "@/components/backdrop";
import { Button } from "@/components/button";
import { Reveal } from "@/components/ui/reveal";
import { useReducedMotion } from "@/components/ui/interaction";
import { getDictionary } from "@/content/dictionaries";
import { pick, type MediaMap } from "@/lib/media";
import { pathFor, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Larguras dos três clips na faixa, e duração total em décimos de segundo. */
const WEIGHTS = [0.42, 0.34, 0.24];
const TOTAL = 240;
const TICK_MS = 90;

const bounds = WEIGHTS.reduce<{ start: number; end: number }[]>((acc, weight, index) => {
  const start = index === 0 ? 0 : acc[index - 1].end;
  acc.push({ start, end: start + weight });
  return acc;
}, []);

const indexAt = (progress: number) => {
  const found = bounds.findIndex((clip) => progress < clip.end);
  return found === -1 ? bounds.length - 1 : found;
};

const timecode = (tenths: number) => {
  const seconds = Math.floor(tenths / 10);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
};

/** Onda de áudio determinística: a mesma no servidor e no cliente. */
const wave = (clip: number, bars: number) =>
  Array.from({ length: bars }, (_, i) => {
    const noise = Math.abs(Math.sin(i * 1.7 + clip * 2.3)) * 0.6 + Math.abs(Math.sin(i * 0.5)) * 0.4;
    return Math.round(22 + noise * 62);
  });

export const ServicesTimeline = ({ locale, media }: { locale: Locale; media?: MediaMap }) => {
  const dict = getDictionary(locale);
  const items = dict.services.items;
  const labels = dict.services.timeline;
  const reduced = useReducedMotion();

  const [value, setValue] = React.useState(12);
  const [running, setRunning] = React.useState(true);

  const active = indexAt(value / TOTAL);

  React.useEffect(() => {
    if (!running || reduced) return;
    const timer = window.setInterval(() => {
      setValue((current) => (current + 1) % (TOTAL + 1));
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [running, reduced]);

  const takeOver = () => setRunning(false);

  return (
    <section id="services" className="relative isolate scroll-mt-24 overflow-hidden py-24 md:py-32">
      <Bloom className="-left-52 top-24 opacity-70" intensity={0.32} />
      <Grain />
      <Container className="relative z-10">
        <SectionHeader
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
          lead={dict.services.lead}
        />

        <Reveal className="mt-14 md:mt-16">
          {/* barra de transporte */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setRunning((current) => !current)}
                aria-label={running ? labels.pause : labels.play}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white transition-colors duration-300 hover:border-brand-400/70 hover:bg-brand-500/15"
              >
                {running && !reduced ? (
                  <IconPlayerPauseFilled className="h-3.5 w-3.5" />
                ) : (
                  <IconPlayerPlayFilled className="h-3.5 w-3.5 translate-x-[1px]" />
                )}
              </button>
              <span className="font-mono text-[11px] tracking-[0.2em] text-white/55">
                <span className="text-brand-300">{timecode(value)}</span> / {timecode(TOTAL)}
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
              {labels.hint}
            </span>
          </div>

          {/* faixa com os três clips */}
          <div className="relative mt-4 select-none">
            <div className="flex h-24 gap-1 overflow-hidden rounded-xl border border-white/10 bg-ink-soft md:h-32">
              {items.map((service, index) => {
                const isActive = index === active;
                return (
                  <div
                    key={service.id}
                    style={{ width: `${WEIGHTS[index] * 100}%` }}
                    className={cn(
                      "relative isolate flex flex-col justify-between overflow-hidden p-3 transition-all duration-500 md:p-4",
                      isActive
                        ? "bg-gradient-to-b from-brand-700/50 to-brand-950/60"
                        : "bg-white/[0.02] opacity-55"
                    )}
                  >
                    {/* perfurações de película */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-2 opacity-40 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.35)_0_6px,transparent_6px_16px)]"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2 opacity-40 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.35)_0_6px,transparent_6px_16px)]"
                    />

                    <span
                      className={cn(
                        "relative z-10 truncate font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-500 md:text-[10px]",
                        isActive ? "text-white" : "text-white/55"
                      )}
                    >
                      {service.number}
                      {/* em ecrã estreito o clip mais curto não tem largura para o título */}
                      <span className="hidden sm:inline"> {service.title}</span>
                    </span>

                    <span aria-hidden className="relative z-10 flex h-8 items-end gap-[2px] md:h-10">
                      {wave(index, 26).map((height, bar) => (
                        <span
                          key={bar}
                          style={{ height: `${height}%` }}
                          className={cn(
                            "w-full rounded-[1px] transition-colors duration-500",
                            isActive ? "bg-brand-300/70" : "bg-white/20"
                          )}
                        />
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* cursor de leitura */}
            <div
              aria-hidden
              style={{ left: `${(value / TOTAL) * 100}%` }}
              className={cn(
                "pointer-events-none absolute -top-2 bottom-[-0.5rem] z-20 w-px -translate-x-1/2 bg-brand-300",
                "shadow-[0_0_12px_2px_rgba(155,116,251,0.55)]",
                running && !reduced ? "" : "transition-[left] duration-300 ease-out"
              )}
            >
              <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-brand-300" />
            </div>

            {/* o input trata do arrasto, do clique e do teclado */}
            <input
              type="range"
              min={0}
              max={TOTAL}
              step={1}
              value={value}
              onChange={(event) => {
                setValue(Number(event.target.value));
                takeOver();
              }}
              onPointerDown={takeOver}
              aria-label={labels.sliderLabel}
              aria-valuetext={`${items[active].title}, ${timecode(value)}`}
              className="absolute inset-x-0 -top-2 bottom-[-0.5rem] z-30 w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
            />

            {/* régua */}
            <div aria-hidden className="mt-4 flex items-end justify-between">
              {Array.from({ length: 13 }).map((_, tick) => (
                <span key={tick} className="flex flex-col items-center gap-1">
                  <span className={cn("w-px bg-white/20", tick % 3 === 0 ? "h-2.5" : "h-1.5")} />
                  {tick % 3 === 0 ? (
                    <span className="font-mono text-[9px] tracking-[0.15em] text-white/45">
                      {timecode((TOTAL / 12) * tick)}
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>

          {/* painel do clip ativo, com altura reservada */}
          <div className="mt-10 grid grid-cols-1 gap-10 border-t border-white/[0.08] pt-10 lg:grid-cols-12 lg:gap-16">
            <div className="relative min-h-[21rem] sm:min-h-[17rem] lg:col-span-7 lg:min-h-[19rem]">
              {items.map((service, index) => (
                <div
                  key={service.id}
                  aria-hidden={index !== active}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    index === active ? "opacity-100" : "pointer-events-none opacity-0"
                  )}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-xs tracking-[0.2em] text-brand-400">
                      {service.number}
                    </span>
                    <h3 className="font-display text-3xl leading-none tracking-[-0.02em] text-white md:text-5xl">
                      {service.title}
                    </h3>
                  </div>
                  <p className="mt-4 font-display text-lg italic text-brand-200/80 md:text-xl">
                    {service.tagline}
                  </p>
                  <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/55">
                    {service.description}
                  </p>
                  <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                        <IconPointFilled className="mt-1 h-3 w-3 shrink-0 text-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                {items.map((service, index) => (
                  <div
                    key={service.id}
                    aria-hidden={index !== active}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500",
                      index === active ? "opacity-100" : "pointer-events-none opacity-0"
                    )}
                  >
                    <MediaFrame
                      fill
                      label={service.title}
                      index={index + 1}
                      className="h-full"
                      {...pick(media, `service-${service.id}`)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex justify-center border-t border-white/[0.08] pt-14">
            <Button as={Link} href={pathFor(locale, "services")} variant="ghost">
              {dict.services.cta}
              <IconArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
