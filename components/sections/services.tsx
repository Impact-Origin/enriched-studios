"use client";
import React from "react";
import { IconPointFilled } from "@tabler/icons-react";

import { Container } from "@/components/section";
import { Reveal } from "@/components/ui/reveal";
import { MediaFrame } from "@/components/media-frame";
import { Bloom, Grain } from "@/components/backdrop";
import { getDictionary } from "@/content/dictionaries";
import { pick, type MediaMap } from "@/lib/media";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Services = ({ locale, media }: { locale: Locale; media?: MediaMap }) => {
  const dict = getDictionary(locale);

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <Bloom className="-left-52 top-24 opacity-70" intensity={0.32} />
      <Grain />
      <Container className="relative z-10">
        <div className="space-y-px">
          {dict.services.items.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.06}>
              <article
                id={service.id}
                className="group grid scroll-mt-32 grid-cols-1 items-center gap-10 border-t border-white/[0.08] py-12 lg:grid-cols-12 lg:gap-16 lg:py-16"
              >
                <div
                  className={cn(
                    "lg:col-span-7",
                    index % 2 === 1 && "lg:order-2 lg:col-start-6"
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
                  <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/55">
                    {service.description}
                  </p>

                  <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                        <IconPointFilled className="mt-1 h-3 w-3 shrink-0 text-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={cn("lg:col-span-4", index % 2 === 1 && "lg:order-1 lg:col-start-1")}>
                  <MediaFrame
                    ratio={index === 1 ? "9:16" : "4:5"}
                    label={service.title}
                    index={index + 1}
                    {...pick(media, `service-${service.id}`)}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </Container>
    </section>
  );
};
