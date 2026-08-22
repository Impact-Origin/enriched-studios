/**
 * Prova social da home: resultados por cliente e vídeos mais vistos.
 *
 * TODO (cliente): preencher com os números reais. Enquanto os campos estiverem
 * vazios, a secção não é desenhada, de propósito: mais vale não ter secção do que
 * publicar números inventados sobre empresas reais.
 *
 * Formato dos números: escreva como quer que apareçam, por exemplo "1,2M", "480 mil"
 * ou "12 340". O contador anima o que for numérico e mantém o resto.
 */

export type ResultClient = {
  id: string;
  name: string;
  /** ficheiro em public/partners, sem caminho. Opcional. */
  logo?: string;
  instagram: string;
  facebook: string;
  followers: string;
};

export type TopVideo = {
  /** nome do ficheiro em public/work, sem extensão: w1, w2, ... */
  slot: string;
  views: string;
};

export const resultClients: ResultClient[] = [
  { id: "ja", name: "J&A", logo: "ja.png", instagram: "", facebook: "", followers: "" },
  { id: "livew", name: "Live W", instagram: "", facebook: "", followers: "" },
];

export const topVideos: TopVideo[] = [
  { slot: "w4", views: "" },
  { slot: "w8", views: "" },
  { slot: "w9", views: "" },
];

/** Um cliente só conta se tiver as três métricas preenchidas. */
export const filledClients = () =>
  resultClients.filter((client) => client.instagram && client.facebook && client.followers);

export const filledVideos = () => topVideos.filter((video) => video.views);
