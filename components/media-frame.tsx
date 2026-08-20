"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Mark } from "@/components/brand/mark";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

type Ratio = "9:16" | "16:9" | "4:5" | "1:1";

const ratioClass: Record<Ratio, string> = {
  "9:16": "aspect-[9/16]",
  "16:9": "aspect-video",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
};

/**
 * Video slot. Drop a poster image or an mp4 in /public/work and pass `poster` / `src`;
 * until then it renders a designed placeholder instead of a broken image.
 */
export const MediaFrame = ({
  ratio = "9:16",
  label,
  title,
  duration,
  poster,
  src,
  className,
  index,
  fill = false,
  playLabel,
}: {
  ratio?: Ratio;
  label?: string;
  title?: string;
  duration?: string;
  poster?: string;
  src?: string;
  className?: string;
  index?: number;
  /** ignora o rácio e ocupa a altura do contentor */
  fill?: boolean;
  /** texto do botão de play, quando há vídeo */
  playLabel?: string;
}) => {
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <figure
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-ink-soft",
        "transition-all duration-500 hover:border-brand-400/50",
        fill ? "h-full w-full" : ratioClass[ratio],
        className
      )}
    >
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onClick={toggle}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
        />
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt={title ?? ""}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <PlaceholderArt index={index ?? 0} />
      )}

      {/* legibility scrim */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25" />

      {/* o play só é um controlo quando existe vídeo; sem ficheiro é apenas desenho */}
      {src ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={playLabel ?? title ?? "play"}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <span className={playCircle(playing)}>
            <IconPlayerPlayFilled className="h-4 w-4 translate-x-[1px] text-white" />
          </span>
        </button>
      ) : poster ? null : (
        <span aria-hidden className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <span className={playCircle(false)}>
            <IconPlayerPlayFilled className="h-4 w-4 translate-x-[1px] text-white" />
          </span>
        </span>
      )}

      {/* top chips */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4">
        {label ? (
          <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/80 backdrop-blur">
            {label}
          </span>
        ) : (
          <span />
        )}
        {duration ? (
          <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
            {duration}
          </span>
        ) : null}
      </div>

      {title ? (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5">
          <p className="font-display text-lg leading-tight text-white">{title}</p>
        </figcaption>
      ) : null}

      {/* luz que acende ao passar por cima */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(155,116,251,0.28), transparent 60%)",
        }}
      />
    </figure>
  );
};

const playCircle = (playing: boolean) =>
  cn(
    "flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-md",
    "transition-colors duration-500 group-hover:border-brand-300/70 group-hover:bg-brand-500/30",
    playing && "opacity-0"
  );

const gradients = [
  "from-brand-700/70 via-brand-950 to-black",
  "from-brand-500/50 via-brand-900 to-black",
  "from-brand-800/80 via-black to-brand-950",
  "from-brand-400/40 via-brand-950 to-black",
];

const PlaceholderArt = ({ index }: { index: number }) => (
  <div
    className={cn(
      "absolute inset-0 bg-gradient-to-br",
      gradients[index % gradients.length]
    )}
  >
    <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(115deg,transparent_0_22px,rgba(255,255,255,0.045)_22px_23px)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.10),transparent_60%)]" />
    <Mark className="absolute -bottom-10 -right-10 h-[42%] w-auto opacity-[0.16] mix-blend-luminosity" />
  </div>
);
