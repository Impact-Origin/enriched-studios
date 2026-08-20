import "server-only";
import fs from "node:fs";
import path from "node:path";

import { partnerNames } from "@/content/partners";

export type Partner = { src: string; name: string };

const FOLDER = path.join(process.cwd(), "public", "partners");
const IMAGE = [".png", ".svg", ".webp", ".jpg", ".jpeg"];

/** Lê public/partners. Largar um ficheiro lá dentro chega para aparecer no site. */
export function getPartners(): Partner[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(FOLDER);
  } catch {
    return [];
  }

  return files
    .filter((file) => IMAGE.includes(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => {
      const slug = path.basename(file, path.extname(file));
      return { src: `/partners/${file}`, name: partnerNames[slug] ?? slug.replace(/-/g, " ") };
    });
}
