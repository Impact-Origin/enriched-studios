export type MediaAsset = { src?: string; poster?: string };
export type MediaMap = Record<string, MediaAsset>;

/** Devolve o que existir para um lugar, ou um objeto vazio. Seguro no cliente. */
export const pick = (media: MediaMap | undefined, slot: string): MediaAsset =>
  media?.[slot] ?? {};
