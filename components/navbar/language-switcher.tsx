"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  isLocale,
  localeLabels,
  locales,
  pathFor,
  routeKeyFromSlug,
  type Locale,
} from "@/lib/i18n";

/** Switches language while staying on the same page (and remembers the choice). */
export const LanguageSwitcher = ({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) => {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  const targetFor = (next: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    const [first, ...rest] = segments;
    const current = isLocale(first) ? first : locale;
    const key = rest.length ? routeKeyFromSlug(current, rest.join("/")) : "home";
    return pathFor(next, key ?? "home");
  };

  const onSelect = (next: Locale) => {
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(targetFor(next));
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 font-mono text-[10px] tracking-[0.18em]",
        className
      )}
    >
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          aria-current={item === locale}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition-colors duration-300",
            item === locale
              ? "bg-brand-500 text-white"
              : "text-white/45 hover:text-white"
          )}
        >
          {localeLabels[item].short}
        </button>
      ))}
    </div>
  );
};
