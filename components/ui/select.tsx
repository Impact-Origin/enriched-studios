"use client";
import React from "react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

/**
 * Seletor próprio, para o painel não abrir com o estilo do sistema operativo.
 * Segue o padrão combobox e listbox: teclado completo, foco visível e um campo
 * escondido para o valor viajar no FormData como qualquer outro campo.
 */
export const Select = ({
  id,
  name,
  options,
  labelledBy,
  className,
}: {
  id: string;
  name: string;
  options: readonly string[];
  labelledBy?: string;
  className?: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(options[0]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  // O índice ativo também vive numa referência: várias teclas no mesmo ciclo
  // do React leriam o estado antigo e escolheriam a opção errada.
  const activeRef = React.useRef(0);
  const moveActive = (next: number) => {
    activeRef.current = next;
    setActiveIndex(next);
  };

  const listId = `${id}-list`;
  const optionId = (index: number) => `${id}-option-${index}`;

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector(`#${CSS.escape(optionId(activeIndex))}`)?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const choose = (index: number) => {
    setValue(options[index]);
    moveActive(index);
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        const step = event.key === "ArrowDown" ? 1 : -1;
        if (!open) {
          setOpen(true);
          return;
        }
        moveActive((activeRef.current + step + options.length) % options.length);
        return;
      }
      case "Home":
        if (open) {
          event.preventDefault();
          moveActive(0);
        }
        return;
      case "End":
        if (open) {
          event.preventDefault();
          moveActive(options.length - 1);
        }
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) choose(activeRef.current);
        else setOpen(true);
        return;
      case "Escape":
        setOpen(false);
        return;
      case "Tab":
        setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelledBy ? `${labelledBy} ${id}` : undefined}
        aria-activedescendant={open ? optionId(activeIndex) : undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04]",
          "px-4 py-3.5 text-left text-[15px] text-white outline-none transition-all duration-300",
          "hover:border-white/20 focus-visible:border-brand-400 focus-visible:bg-white/[0.07] focus-visible:ring-4 focus-visible:ring-brand-500/15",
          open && "border-brand-400 bg-white/[0.07]"
        )}
      >
        <span className="truncate">{value}</span>
        <IconChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-white/55 transition-transform duration-300",
            open && "rotate-180 text-brand-300"
          )}
        />
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn(
          "absolute inset-x-0 top-[calc(100%+0.5rem)] z-40 max-h-64 overflow-auto rounded-xl border border-white/10 p-1",
          "bg-ink-soft/95 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl",
          "origin-top transition-all duration-200",
          open ? "visible scale-100 opacity-100" : "invisible scale-[0.98] opacity-0"
        )}
      >
        {options.map((option, index) => {
          const selected = option === value;
          return (
            <li
              key={option}
              id={optionId(index)}
              role="option"
              aria-selected={selected}
              onPointerEnter={() => moveActive(index)}
              onClick={() => choose(index)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors duration-150",
                index === activeIndex ? "bg-brand-500/20 text-white" : "text-white/70"
              )}
            >
              {option}
              {selected ? <IconCheck className="h-4 w-4 shrink-0 text-brand-300" /> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
