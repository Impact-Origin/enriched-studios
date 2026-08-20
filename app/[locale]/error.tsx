"use client";
import React from "react";

import { Container } from "@/components/section";
import { Button } from "@/components/button";
import { Mark } from "@/components/brand/mark";
import { site } from "@/content/site";

/** Página de erro com a marca, em vez do ecrã genérico do Next. */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("[erro]", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-32">
      <Mark className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.1]" />
      <Container className="relative z-10 text-center">
        <p className="eyebrow">Erro</p>
        <h1 className="mt-6 font-display text-4xl text-white md:text-6xl">
          Alguma coisa correu mal
        </h1>
        <p className="mx-auto mt-6 max-w-md text-white/55">
          Something went wrong on our side. Tente novamente ou escreva-nos.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={reset}>Tentar novamente</Button>
          <Button as="a" href={`mailto:${site.email}`} variant="ghost">
            Escrever email
          </Button>
        </div>
      </Container>
    </section>
  );
}
