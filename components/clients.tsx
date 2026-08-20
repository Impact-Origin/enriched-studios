import Image from "next/image";
import React from "react";

import { Container } from "@/components/section";
import { getDictionary } from "@/content/dictionaries";
import type { Partner } from "@/lib/partners-fs";
import type { Locale } from "@/lib/i18n";

/**
 * Faixa das empresas com que trabalhamos.
 * Os logótipos vêm em cores diferentes e alguns são escuros, por isso são
 * normalizados a branco e recuperam a cor original ao passar o rato.
 */
export const Clients = ({ locale, partners }: { locale: Locale; partners: Partner[] }) => {
  const dict = getDictionary(locale);
  if (partners.length === 0) return null;

  return (
    <section className="border-y border-white/[0.08] bg-ink-soft py-14 md:py-16">
      <Container>
        <p className="eyebrow text-center text-white/55">{dict.ui.clients}</p>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-10 md:gap-x-16">
          {partners.map((partner) => (
            <li key={partner.src}>
              <Image
                src={partner.src}
                alt={partner.name}
                width={200}
                height={80}
                className="h-9 w-auto max-w-[130px] object-contain opacity-70 brightness-0 invert transition-all duration-500 hover:opacity-100 hover:brightness-100 hover:invert-0 md:h-11 md:max-w-[160px]"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
