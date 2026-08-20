/**
 * Configuração central da Enriched Studios.
 * TODO (cliente): substituir os valores marcados com PLACEHOLDER pelos dados reais.
 */
export const site = {
  name: "Enriched Studios",
  legalName: "Enriched Studios",
  domain: "enrichedstudio.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://enrichedstudio.com",
  email: "geral@enrichedstudio.com", // PLACEHOLDER: confirmar o endereço real
  phone: "+351 916 244 265",
  phoneHref: "+351916244265",
  whatsapp: "https://wa.me/351916244265",
  city: "Porto",
  /** Cidade com preposição, para frases em português ("no Porto", "em Lisboa"). */
  cityIn: "no Porto",
  region: "Portugal",
  areaServed: [
    "Porto",
    "Vila Nova de Gaia",
    "Matosinhos",
    "Maia",
    "Gondomar",
    "Póvoa de Varzim",
  ],
  founded: "2023", // PLACEHOLDER
  socials: {
    instagram: "https://www.instagram.com/enriched.studios/",
    instagramHandle: "@enriched.studios",
    youtube: "", // PLACEHOLDER
    linkedin: "", // PLACEHOLDER
    tiktok: "", // PLACEHOLDER
  },
  /**
   * Dados legais obrigatórios (Decreto-Lei 7/2004 e RGPD).
   * TODO (cliente): confirmar todos estes campos antes de publicar.
   */
  legal: {
    company: "Enriched Studios", // PLACEHOLDER: denominação social completa
    vat: "PT000000000", // PLACEHOLDER: NIPC
    address: "Porto, Portugal", // PLACEHOLDER: sede social completa
    registry: "Conservatória do Registo Comercial do Porto", // PLACEHOLDER
    updated: "19 de agosto de 2026",
    updatedEn: "19 August 2026",
    complaintsBook: "https://www.livroreclamacoes.pt/inicio",
    /** Entidade de resolução alternativa de litígios competente pela zona da sede. */
    adr: {
      name: "CICAP, Centro de Informação de Consumo e Arbitragem do Porto", // PLACEHOLDER
      url: "https://www.cicap.pt",
    },
    dataProtectionAuthority: {
      name: "CNPD, Comissão Nacional de Proteção de Dados",
      url: "https://www.cnpd.pt",
    },
    processors: [
      { name: "Vercel Inc.", role: "alojamento do site", roleEn: "website hosting" },
      { name: "Resend (Plus Five Five, Inc.)", role: "envio dos emails do formulário", roleEn: "sending the form emails" },
    ],
  },
  /** Estúdio que desenvolveu a plataforma. */
  builtBy: {
    name: "Impact",
    url: "https://impact-origin.com/",
  },
  /** Métricas mostradas no site. PLACEHOLDER: ajustar aos números reais. */
  stats: {
    videos: "+300",
    agents: "+40",
    views: "+2,5M",
    delivery: "48h",
  },
} as const;

export type Site = typeof site;
