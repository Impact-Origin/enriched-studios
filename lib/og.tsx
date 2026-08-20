import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const markDataUri = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "public", "logo-mark.png"))
  .toString("base64")}`;

/** Cartão de partilha partilhado por todas as páginas, com o título de cada uma. */
export function renderOgImage({ title, subtitle }: { title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#08080a",
          backgroundImage:
            "radial-gradient(circle at 85% 12%, rgba(124,58,237,0.55) 0%, rgba(8,8,10,0) 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUri} width={64} height={64} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, letterSpacing: 6, fontWeight: 700 }}>ENRICHED</span>
            <span style={{ fontSize: 15, letterSpacing: 12, color: "rgba(255,255,255,0.55)" }}>
              STUDIOS
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 60, lineHeight: 1.05, maxWidth: 940 }}>{title}</span>
          <span style={{ fontSize: 26, color: "rgba(255,255,255,0.6)", maxWidth: 900 }}>
            {subtitle}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "rgba(255,255,255,0.45)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 24,
          }}
        >
          <span>{site.socials.instagramHandle}</span>
          <span>{site.domain}</span>
        </div>
      </div>
    ),
    ogSize
  );
}
