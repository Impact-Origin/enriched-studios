import "server-only";
import fs from "node:fs";
import path from "node:path";

import { mediaAliases } from "@/content/media-aliases";
import type { MediaMap } from "./media";

const FOLDER = path.join(process.cwd(), "public", "work");
const VIDEO = [".mp4", ".webm", ".mov"];
const IMAGE = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

/**
 * Lê a pasta public/work e devolve os ficheiros que existem, por nome.
 * Largar `w1.mp4` lá dentro liga o vídeo ao trabalho w1, sem tocar em código.
 * O sufixo #t=0.1 faz o browser mostrar o primeiro fotograma quando não há thumbnail.
 */
export function getMediaMap(): MediaMap {
  let files: string[] = [];
  try {
    files = fs.readdirSync(FOLDER);
  } catch {
    return {};
  }

  const map: MediaMap = {};

  for (const file of files) {
    const extension = path.extname(file).toLowerCase();
    const slot = path.basename(file, extension);
    const url = `/work/${file}`;

    if (VIDEO.includes(extension)) {
      map[slot] = { ...map[slot], src: url };
    } else if (IMAGE.includes(extension)) {
      map[slot] = { ...map[slot], poster: url };
    }
  }

  // lugares servidos por um ficheiro com outro nome
  for (const [slot, source] of Object.entries(mediaAliases)) {
    const origin = map[source];
    if (!origin) continue;
    map[slot] = { ...origin, ...map[slot] };
  }

  for (const slot of Object.keys(map)) {
    const asset = map[slot];
    if (asset.src && !asset.poster) asset.src = `${asset.src}#t=0.1`;
  }

  return map;
}
