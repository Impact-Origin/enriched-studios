import type { Locale } from "@/lib/i18n";
import { legalPt } from "./pt";
import { legalEn } from "./en";
import type { LegalContent, LegalDocument } from "./types";

const documents: Record<Locale, LegalContent> = { pt: legalPt, en: legalEn };

export function getLegal(locale: Locale): LegalContent {
  return documents[locale] ?? documents.pt;
}

export type { LegalContent, LegalDocument };
