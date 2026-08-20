import type { Locale } from "@/lib/i18n";
import { pt, type Dictionary } from "./pt";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.pt;
}

export type { Dictionary };
