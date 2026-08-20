"use client";
import React from "react";
import { cn } from "@/lib/utils";

/** Cartão com brilho violeta que acompanha o ponteiro. */
export const SpotlightCard = ({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) => {
  const ref = React.useRef<HTMLElement>(null);

  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref as never}
      onPointerMove={onMove}
      className={cn("group/spot relative isolate overflow-hidden", className)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), rgba(124,58,237,0.18), transparent 65%)",
        }}
      />
      {children}
    </Tag>
  );
};
