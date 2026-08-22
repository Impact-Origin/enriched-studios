import Image from "next/image";
import React from "react";

import { Container, SectionHeader } from "@/components/section";
import { MediaFrame } from "@/components/media-frame";
import { Bloom, Grain } from "@/components/backdrop";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { getDictionary } from "@/content/dictionaries";
import { filledClients, filledVideos, type ResultClient } from "@/content/results";
import { pick, type MediaMap } from "@/lib/media";
import type { Locale } from "@/lib/i18n";

/**
 * Prova social: alcance por cliente em 90 dias e os vídeos mais vistos.
 * Sem números preenchidos em content/results.ts, a secção não aparece.
 */
export const Results = ({ locale, media }: { locale: Locale; media?: MediaMap }) => {
  const dict = getDictionary(locale);
  const text = dict.results;
  const clients = filledClients();
  const videos = filledVideos();

  if (clients.length === 0) return null;

  const metric = (label: string, value: string) => (
    <div key={label} className="border-t border-white/[0.08] py-4 first:border-t-0 first:pt-0">
      <p className="font-display text-3xl leading-none text-white md:text-4xl">
        <Counter value={value} locale={locale} />
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">{label}</p>
    </div>
  );

  const card = (client: ResultClient) => (
    <Reveal key={client.id}>
      <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-8 md:p-10">
        <header className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          {client.logo ? (
            <Image
              src={`/partners/${client.logo}`}
              alt={client.name}
              width={160}
              height={60}
              className="h-8 w-auto max-w-[120px] object-contain brightness-0 invert"
            />
          ) : (
            <p className="font-display text-2xl text-white">{client.name}</p>
          )}
          <span className="rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-200">
            {text.period}
          </span>
        </header>

        <div className="mt-6">
          {metric(text.metrics.instagram, client.instagram)}
          {metric(text.metrics.facebook, client.facebook)}
          {metric(text.metrics.followers, client.followers)}
        </div>
      </article>
    </Reveal>
  );

  return (
    <section id="results" className="scroll-mt-24 relative isolate overflow-hidden py-24 md:py-32">
      <Bloom className="-right-52 top-10 opacity-60" intensity={0.32} />
      <Grain />
      <Container className="relative z-10">
        <SectionHeader eyebrow={text.eyebrow} title={text.title} lead={text.lead} />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">{clients.map(card)}</div>

        <Reveal delay={0.1}>
          <p className="mt-10 border-l-2 border-brand-400 pl-6 font-display text-xl italic leading-snug text-white/85 md:text-2xl">
            {text.note}
          </p>
        </Reveal>

        {videos.length > 0 ? (
          <div className="mt-16 border-t border-white/[0.08] pt-14">
            <h3 className="eyebrow">{text.topTitle}</h3>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, index) => (
                <Reveal key={video.slot} delay={index * 0.06}>
                  <MediaFrame ratio="9:16" index={index} {...pick(media, video.slot)} />
                  <p className="mt-3 flex items-baseline gap-2 px-1">
                    <span className="font-display text-2xl text-white">
                      <Counter value={video.views} locale={locale} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                      {text.views}
                    </span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
};
