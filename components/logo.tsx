import { Link } from "next-view-transitions";
import React from "react";
import { Mark } from "@/components/brand/mark";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { pathFor } from "@/lib/i18n";

export const Logo = ({
  locale,
  className,
  compact = false,
}: {
  locale: Locale;
  className?: string;
  compact?: boolean;
}) => {
  return (
    <Link
      href={pathFor(locale, "home")}
      aria-label="Enriched Studios"
      className={cn("group relative z-20 flex items-center gap-3 text-white", className)}
    >
      <Mark
        priority
        className={cn(
          "transition-transform duration-700 group-hover:rotate-[60deg]",
          compact ? "h-9 w-9" : "h-11 w-11"
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-semibold uppercase text-white",
            compact ? "text-[15px] tracking-[0.16em]" : "text-[17px] tracking-[0.18em]"
          )}
        >
          Enriched
        </span>
        <span
          className={cn(
            "font-display uppercase text-white/55",
            compact ? "text-[9px] tracking-[0.42em]" : "text-[10px] tracking-[0.45em]"
          )}
        >
          Studios
        </span>
      </span>
    </Link>
  );
};
