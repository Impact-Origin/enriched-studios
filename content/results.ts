/**
 * Prova social da home: resultados por cliente e reels mais vistos.
 *
 * TODO (cliente): faltam os números de alcance por cliente. Enquanto estiverem
 * vazios, os cartões de cliente não são desenhados, de propósito: mais vale não
 * ter o bloco do que publicar números inventados sobre empresas reais.
 *
 * Formato dos números: escreva como quer que apareçam, por exemplo "1,2M" ou
 * "480 mil". O contador anima a parte numérica e mantém o resto.
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

export type TopReel = {
  /** código do reel no Instagram, o que aparece no endereço */
  code: string;
  views: string;
  /** capa em public/reels, descarregada do próprio Instagram */
  cover: string;
};

export const resultClients: ResultClient[] = [
  { id: "ja", name: "J&A", logo: "ja.png", instagram: "", facebook: "", followers: "" },
  { id: "livew", name: "Live W", instagram: "", facebook: "", followers: "" },
];

export const topReels: TopReel[] = [
  { code: "DY4lZeXvNX7", views: "1,8M", cover: "01-DY4lZeXvNX7.jpg" },
  { code: "DZhe2gmOoqC", views: "407 mil", cover: "02-DZhe2gmOoqC.jpg" },
  { code: "DZACc8KMaYR", views: "347 mil", cover: "03-DZACc8KMaYR.jpg" },
  { code: "DYxgzf2PL6j", views: "331 mil", cover: "04-DYxgzf2PL6j.jpg" },
  { code: "DX1f9ZtM0fy", views: "330 mil", cover: "05-DX1f9ZtM0fy.jpg" },
];

export const reelUrl = (code: string) => `https://www.instagram.com/reel/${code}/`;

/** Um cliente só conta se tiver as três métricas preenchidas. */
export const filledClients = () =>
  resultClients.filter((client) => client.instagram && client.facebook && client.followers);

export const filledReels = () => topReels.filter((reel) => reel.views && reel.cover);
