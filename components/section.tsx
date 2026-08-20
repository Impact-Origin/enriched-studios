import React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("mx-auto w-full max-w-[88rem] px-6 md:px-10", className)}>{children}</div>;

export const Eyebrow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span className={cn("eyebrow inline-flex items-center gap-3", className)}>
    <span className="h-px w-8 bg-brand-500/70" />
    {children}
  </span>
);

/**
 * Editorial section header: eyebrow + serif display title on the left,
 * supporting copy on the right. Asymmetric on purpose.
 */
export const SectionHeader = ({
  eyebrow,
  title,
  lead,
  align = "split",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "split" | "center";
  className?: string;
}) => {
  if (align === "center") {
    return (
      <div className={cn("mx-auto max-w-3xl text-center", className)}>
        {eyebrow ? (
          <Reveal>
            <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
            {title}
          </h2>
        </Reveal>
        {lead ? (
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-white/55 md:text-lg">{lead}</p>
          </Reveal>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-end", className)}>
      <div className="lg:col-span-7">
        {eyebrow ? (
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-white md:text-[3.7rem]">
            {title}
          </h2>
        </Reveal>
      </div>
      {lead ? (
        <Reveal delay={0.1} className="lg:col-span-5">
          <p className="text-base leading-relaxed text-white/55 md:text-lg">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
};

/** Full-bleed hairline used between sections. */
export const Rule = ({ className }: { className?: string }) => (
  <div className={cn("h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent", className)} />
);
