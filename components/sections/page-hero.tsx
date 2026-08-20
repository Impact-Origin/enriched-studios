import React from "react";
import { Container, Eyebrow } from "@/components/section";
import { Bloom, Grain, GridLines } from "@/components/backdrop";
import { Reveal } from "@/components/ui/reveal";

/** Compact hero used on the inner pages. */
export const PageHero = ({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) => (
  <section className="relative isolate overflow-hidden pb-16 pt-36 md:pb-20 md:pt-48">
    <GridLines />
    <Bloom className="-right-40 -top-52 opacity-70" intensity={0.4} />
    <Grain />
    <Container className="relative z-10">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="mt-7 max-w-4xl font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.03em] text-white">
          {title}
        </h1>
      </Reveal>
      {lead ? (
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">{lead}</p>
        </Reveal>
      ) : null}
      {children}
    </Container>
  </section>
);
