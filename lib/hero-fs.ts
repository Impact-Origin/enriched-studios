import "server-only";
import fs from "node:fs";
import path from "node:path";

import { heroSlideLabels } from "@/content/hero-slides";

export type HeroSlide = { src: string; label?: string };

const FOLDER = path.join(process.cwd(), "public", "hero");
const IMAGE = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

/**
 * Lê public/hero. Largar uma imagem lá dentro acrescenta um cartão ao carrossel
 * do topo; o nome do ficheiro define a ordem.
 */
export function getHeroSlides(): HeroSlide[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(FOLDER);
  } catch {
    return [];
  }

  return files
    .filter((file) => IMAGE.includes(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => ({
      src: `/hero/${file}`,
      label: heroSlideLabels[path.basename(file, path.extname(file))],
    }));
}
