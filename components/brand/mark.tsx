import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

/**
 * Símbolo oficial da marca (diafragma), extraído do logótipo fornecido pelo cliente.
 * Os cortes das lâminas são transparentes, por isso deixam passar o fundo da página.
 */
export const Mark = ({
  className,
  spin = false,
  priority = false,
}: {
  className?: string;
  spin?: boolean;
  priority?: boolean;
}) => (
  <Image
    src="/logo-mark.png"
    alt=""
    aria-hidden
    width={270}
    height={270}
    priority={priority}
    className={cn("select-none", spin && "animate-aperture", className)}
  />
);

/** Logótipo completo (símbolo + wordmark), tal como foi entregue. */
export const LogoLockup = ({ className }: { className?: string }) => (
  <Image
    src="/logo.png"
    alt="Enriched Studios"
    width={352}
    height={343}
    className={cn("select-none", className)}
  />
);
