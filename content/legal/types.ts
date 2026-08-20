export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  links?: { label: string; href: string }[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

/** Os três documentos, na mesma forma nas duas línguas. */
export type LegalContent = {
  privacy: LegalDocument;
  terms: LegalDocument;
  cookies: LegalDocument;
};
