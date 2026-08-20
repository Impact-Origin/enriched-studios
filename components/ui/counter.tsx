"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "./interaction";

/**
 * Anima um valor como "+300", "+2,5M" ou "48h" a partir de zero.
 * O prefixo e o sufixo ficam intactos; só o número conta.
 */
const parse = (value: string) => {
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!match) return null;

  const [, prefix, rawNumber, suffix] = match;

  // "2,5" é decimal em português, "1.200" e "1,200" são milhares.
  const lastDot = rawNumber.lastIndexOf(".");
  const lastComma = rawNumber.lastIndexOf(",");
  const separator = lastDot > lastComma ? lastDot : lastComma;
  const tail = separator === -1 ? "" : rawNumber.slice(separator + 1);
  const isDecimal = separator !== -1 && tail.length > 0 && tail.length !== 3;

  const decimals = isDecimal ? tail.length : 0;
  const normalised = isDecimal
    ? rawNumber.slice(0, separator).replace(/[.,]/g, "") + "." + tail
    : rawNumber.replace(/[.,]/g, "");
  const numeric = Number(normalised);

  if (Number.isNaN(numeric)) return null;
  return { prefix, suffix, numeric, decimals };
};

export const Counter = ({
  value,
  locale,
  className,
  duration = 1600,
}: {
  value: string;
  locale: string;
  className?: string;
  duration?: number;
}) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const parsed = React.useMemo(() => parse(value), [value]);
  // null significa "mostra o valor final": é assim que o servidor rende,
  // por isso quem não tem JS, ou tem o rAF travado, vê sempre o número certo.
  const [animated, setAnimated] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!parsed || !inView || reduced) return;

    let frame = 0;
    const start = performance.now();
    // desaceleração suave no fim, para o número assentar
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);

    setAnimated(0);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      if (progress >= 1) {
        setAnimated(null);
        return;
      }
      setAnimated(parsed.numeric * ease(progress));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    // rede de segurança: se o rAF nunca correr, o valor final entra na mesma
    const guard = window.setTimeout(() => setAnimated(null), duration + 800);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(guard);
    };
  }, [parsed, inView, reduced, duration]);

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const shown = reduced || animated === null ? parsed.numeric : animated;
  const formatted = new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  }).format(shown);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  );
};
