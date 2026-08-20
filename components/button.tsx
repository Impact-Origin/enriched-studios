import { cn } from "@/lib/utils";
import React from "react";

type Variant = "primary" | "ghost" | "outline" | "link";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white border border-brand-400/60 shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_18px_40px_-18px_rgba(124,58,237,0.9)] hover:bg-brand-400",
  ghost:
    "bg-white/[0.03] text-white border border-white/10 backdrop-blur hover:border-brand-400/60 hover:bg-white/[0.06]",
  outline:
    "bg-transparent text-white border border-white/20 hover:border-white/50",
  link: "bg-transparent text-white border-0 px-0 py-0 underline-offset-8 hover:underline",
};

export const Button: React.FC<{
  children?: React.ReactNode;
  className?: string;
  variant?: Variant;
  as?: React.ElementType;
  [x: string]: any;
}> = ({ children, className, variant = "primary", as: Tag = "button", ...props }) => {
  return (
    <Tag
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3",
        "font-sans text-[13px] font-semibold uppercase tracking-[0.12em]",
        "transition-all duration-300 ease-out active:scale-[0.98] hover:-translate-y-0.5",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
