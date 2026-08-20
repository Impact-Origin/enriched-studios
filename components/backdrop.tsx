import React from "react";
import { cn } from "@/lib/utils";

/** Film grain layer: sits above the background, below the content. */
export const Grain = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute inset-0 z-[1] opacity-[0.22] mix-blend-overlay",
      className
    )}
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />
);

/** Vertical hairlines: a quiet architectural grid behind everything. */
export const GridLines = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn("pointer-events-none absolute inset-0 z-0", className)}
  >
    <div className="mx-auto flex h-full w-full max-w-[88rem] justify-between px-6 md:px-10">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-full w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent"
        />
      ))}
    </div>
  </div>
);

/** Violet bloom. One per section, positioned by the caller. */
export const Bloom = ({
  className,
  intensity = 0.5,
}: {
  className?: string;
  intensity?: number;
}) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute z-0 h-[38rem] w-[38rem] rounded-full blur-[140px]",
      className
    )}
    style={{
      background: `radial-gradient(circle at center, rgba(124,58,237,${intensity}) 0%, rgba(74,26,160,${
        intensity * 0.45
      }) 40%, transparent 70%)`,
    }}
  />
);

export const Backdrop = ({
  children,
  className,
  lines = true,
}: {
  children?: React.ReactNode;
  className?: string;
  lines?: boolean;
}) => (
  <div className={cn("relative isolate overflow-hidden", className)}>
    {lines ? <GridLines /> : null}
    <Grain />
    {children}
  </div>
);
