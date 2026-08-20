import React from "react";

/** Barra de progresso de leitura. Animada pelo scroll em CSS, sem JavaScript. */
export const ScrollProgress = () => (
  <div
    aria-hidden
    className="scroll-progress fixed inset-x-0 top-0 z-[60] h-px bg-gradient-to-r from-brand-500 via-brand-300 to-brand-500"
  />
);
