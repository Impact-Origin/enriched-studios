import React from "react";
import { IconArrowUpRight } from "@tabler/icons-react";

import { Container, Eyebrow } from "@/components/section";
import { Bloom, Grain, GridLines } from "@/components/backdrop";
import { Reveal } from "@/components/ui/reveal";
import type { LegalDocument } from "@/content/legal";

/** Página de texto legal: uma coluna estreita, hierarquia clara e nada mais. */
export const LegalPage = ({ document }: { document: LegalDocument }) => (
  <>
    <section className="relative isolate overflow-hidden pb-12 pt-36 md:pb-16 md:pt-44">
      <GridLines />
      <Bloom className="-right-40 -top-52 opacity-50" intensity={0.3} />
      <Grain />
      <Container className="relative z-10">
        <Reveal>
          <Eyebrow>{document.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-7 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.03em] text-white">
            {document.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55">{document.intro}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
            {document.updated}
          </p>
        </Reveal>
      </Container>
    </section>

    <section className="relative pb-28 md:pb-36">
      <Container>
        <div className="max-w-3xl space-y-12">
          {document.sections.map((section) => (
            <Reveal key={section.heading}>
              <article className="border-t border-white/[0.08] pt-8">
                <h2 className="font-display text-xl text-white md:text-2xl">{section.heading}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="mt-4 text-[15px] leading-relaxed text-white/60">
                    {paragraph}
                  </p>
                ))}

                {section.list ? (
                  <ul className="mt-5 space-y-2.5">
                    {section.list.map((item) => (
                      <li key={item.slice(0, 32)} className="flex gap-3 text-[15px] leading-relaxed text-white/60">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.links ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {section.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition-colors duration-300 hover:border-brand-400/60 hover:text-white"
                      >
                        {link.label}
                        <IconArrowUpRight className="h-3.5 w-3.5 text-brand-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  </>
);
