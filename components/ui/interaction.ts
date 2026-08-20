"use client";
import React from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

/** Dispara uma vez quando o elemento entra no ecrã, com rede de segurança. */
export function useInView<T extends HTMLElement>(ref: React.RefObject<T>, fallbackMs = 2500) {
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);

    const timer = window.setTimeout(() => setInView(true), fallbackMs);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [ref, fallbackMs]);

  return inView;
}
