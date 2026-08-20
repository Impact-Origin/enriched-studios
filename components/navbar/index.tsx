"use client";
import React from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/button";
import { LanguageSwitcher } from "./language-switcher";
import { getDictionary } from "@/content/dictionaries";
import { pathFor, type Locale, type RouteKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function NavBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items: { key: RouteKey; label: string }[] = [
    { key: "services", label: dict.nav.services },
    { key: "portfolio", label: dict.nav.portfolio },
    { key: "contact", label: dict.nav.contact },
  ];

  return (
    <>
      <header className="fade-up fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
        <div
          className={cn(
            "mx-auto flex max-w-[88rem] items-center justify-between rounded-full px-4 py-3 transition-all duration-500 md:px-6",
            scrolled
              ? "border border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]"
              : "border border-transparent bg-transparent"
          )}
        >
          <Logo locale={locale} compact />

          <nav className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const href = pathFor(locale, item.key);
              const active = pathname === href;
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={cn(
                    "group/nav relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300",
                    active ? "text-white" : "text-white/55 hover:text-white"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left transition-transform duration-300",
                      active
                        ? "scale-x-100 bg-brand-400"
                        : "scale-x-0 bg-white/40 group-hover/nav:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} className="hidden sm:flex" />
            <Button
              as={Link}
              href={pathFor(locale, "contact")}
              className="hidden px-5 py-2.5 text-[11px] md:inline-flex"
            >
              {dict.nav.cta}
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={dict.nav.menu}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
            >
              <IconMenu2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* menu em ecrã pequeno: abre e fecha com transições CSS */}
      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-ink transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        )}
      >
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-6 py-6">
              <Logo locale={locale} compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={dict.nav.close}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {items.map((item, index) => (
                <div
                  key={item.key}
                  className={cn(
                    "transition-all duration-500",
                    open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                  )}
                  style={{ transitionDelay: open ? `${80 + index * 70}ms` : "0ms" }}
                >
                  <Link
                    href={pathFor(locale, item.key)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/[0.07] py-5"
                  >
                    <span className="font-mono text-[11px] text-brand-400">
                      0{index + 1}
                    </span>
                    <span className="font-display text-4xl text-white">{item.label}</span>
                  </Link>
                </div>
              ))}
            </nav>

            <div className="flex items-center justify-between gap-4 px-6 pb-10">
              <LanguageSwitcher locale={locale} />
              <Button
                as={Link}
                href={pathFor(locale, "contact")}
                onClick={() => setOpen(false)}
              >
                {dict.nav.cta}
              </Button>
            </div>
        </div>
      </div>
    </>
  );
}
