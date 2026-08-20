"use client";
import React from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll entrance that can never hide content.
 * The server renders the element visible. On mount, only elements that start below
 * the fold are hidden and then animated in; a timeout is kept as a safety net in case
 * the observer never fires (background tabs, odd viewports).
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<"static" | "hidden" | "shown">("static");

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen at load: leave it alone, no flash.
    if (node.getBoundingClientRect().top < window.innerHeight - 40) return;

    setState("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.01 }
    );
    observer.observe(node);

    const timer = window.setTimeout(() => setState("shown"), 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const style: React.CSSProperties =
    state === "static"
      ? {}
      : {
          opacity: state === "shown" ? 1 : 0,
          transform: state === "shown" ? "none" : `translateY(${y}px)`,
          transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        };

  return (
    <div ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
};

/** Word-by-word headline reveal, used once on the hero. CSS only, no JS needed. */
export const RevealWords = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const words = text.split(" ");
  return (
    <span className={cn("word-rise inline", className)}>
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          {/* the space lives between the wrappers so the line can still break */}
          {index > 0 ? " " : null}
          <span>
            <span style={{ animationDelay: `${delay + index * 0.07}s` }}>{word}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
};
