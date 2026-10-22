"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * El fondo de una sección, entero, en un solo lugar.
 *
 * Todo lo que pinta detrás del contenido —bitmaps, video, degradados, velos,
 * grano, viñeta— entra acá como una lista de capas. Fuera de este componente
 * no puede existir un `<video>` de fondo, un `<img>` a sangre, un velo de
 * gradiente ni la clase `.grain`: esa es la regla que evita que al cambiar un
 * fondo queden capas huérfanas pintando por debajo.
 *
 * El orden del array es el orden de pintado: la primera capa es la de más
 * atrás. Para sacar una capa se borra su línea en `BACKGROUNDS`.
 *
 * Solo se monta la rama del `type` activo. Cambiar `{ type: "video" }` por
 * `{ type: "image" }` no esconde el video: lo desmonta, y con él se va su
 * lógica de reproducción. No hay handlers sobrevivientes.
 */

type Common = {
  /** Opacidad de la capa, 0–1. */
  opacity?: number;
  /** `mix-blend-mode` CSS: "color-dodge", "overlay", "screen"… */
  blend?: string;
  /** Recorrido vertical con el scroll, en píxeles. Positivo = la capa baja al scrollear. */
  parallax?: number;
};

export type Layer =
  | ({ type: "color"; value: string } & Common)
  | ({ type: "gradient"; value: string } & Common)
  | ({
      type: "image";
      src: string;
      fit?: "cover" | "contain" | "fill";
      position?: string;
      height?: string;
      width?: string;
      /** Sobremedida por cada borde, en %. */
      bleed?: string;
    } & Common)
  | ({
      type: "video";
      src: string;
      poster: string;
      mode: "loop" | "once" | "scrub";
      scale?: number;
    } & Common)
  | ({
      type: "veil";
      value: string;
      from?: "sm" | "md" | "lg";
      until?: "sm" | "md" | "lg";
    } & Common)
  | { type: "grain"; opacity?: number }
  | { type: "vignette"; intensity?: number };

export type BackdropProgress = { time: number; duration: number; progress: number };

/** Mando del video. Queda en `null` mientras no haya capa de video. */
export type BackdropControl = { seek: (time: number) => void; duration: number } | null;

type Props = {
  layers: Layer[];
  className?: string;
  /** Puente de salida: para sincronizar algo de la UI con el video de fondo. */
  onProgress?: (p: BackdropProgress) => void;
  /** Puente de entrada: para mover el video desde afuera. */
  control?: MutableRefObject<BackdropControl>;
};

const SCROLL_OFFSET = ["start start", "end start"] as const;

export function SectionBackdrop({ layers, className = "", onProgress, control }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: host,
    offset: SCROLL_OFFSET as unknown as ["start start", "end start"],
  });

  return (
    <div ref={host} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {layers.map((layer, i) => (
        <LayerNode
          key={`${layer.type}-${i}`}
          layer={layer}
          progress={scrollYProgress}
          reduce={reduce}
          onProgress={onProgress}
          control={control}
        />
      ))}
    </div>
  );
}

type NodeProps = {
  layer: Layer;
  progress: MotionValue<number>;
  reduce: boolean;
  onProgress?: (p: BackdropProgress) => void;
  control?: MutableRefObject<BackdropControl>;
};

function LayerNode({ layer, progress, reduce, onProgress, control }: NodeProps) {
  switch (layer.type) {
    case "color":
      return <FlatLayer layer={layer} progress={progress} reduce={reduce} background={layer.value} />;
    case "gradient":
      return <FlatLayer layer={layer} progress={progress} reduce={reduce} background={layer.value} />;
    case "image":
      return <ImageLayer layer={layer} progress={progress} reduce={reduce} />;
    case "video":
      return <VideoLayer layer={layer} progress={progress} reduce={reduce} onProgress={onProgress} control={control} />;
    case "veil":
      return <VeilLayer layer={layer} progress={progress} reduce={reduce} />;
    case "grain":
      return <GrainLayer opacity={layer.opacity} />;
    case "vignette":
      return <VignetteLayer intensity={layer.intensity} />;
  }
}

function useParallax(progress: MotionValue<number>, distance: number | undefined, reduce: boolean) {
  const y = useTransform(progress, [0, 1], [0, distance ?? 0]);
  return reduce || !distance ? undefined : y;
}

function FlatLayer({
  layer,
  progress,
  reduce,
  background,
}: {
  layer: Extract<Layer, { type: "color" | "gradient" }>;
  progress: MotionValue<number>;
  reduce: boolean;
  background: string;
}) {
  const y = useParallax(progress, layer.parallax, reduce);
  return (
    <motion.div
      className="absolute inset-0"
      style={{ background, opacity: layer.opacity, mixBlendMode: layer.blend as never, ...(y ? { y } : null) }}
    />
  );
}

function ImageLayer({
  layer,
  progress,
  reduce,
}: {
  layer: Extract<Layer, { type: "image" }>;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const y = useParallax(progress, layer.parallax, reduce);
  const bleed = layer.bleed ? parseFloat(layer.bleed) : 0;
  const spread = bleed ? `${100 + bleed * 2}%` : undefined;

  return (
    <motion.img
      src={layer.src}
      alt=""
      className="absolute"
      style={{
        inset: bleed ? `-${bleed}%` : 0,
        height: layer.height ?? spread ?? "100%",
        width: layer.width ?? spread ?? "100%",
        objectFit: layer.fit ?? "cover",
        objectPosition: layer.position,
        opacity: layer.opacity,
        mixBlendMode: layer.blend as never,
        ...(y ? { y } : null),
      }}
    />
  );
}

function VideoLayer({
  layer,
  progress,
  reduce,
  onProgress,
  control,
}: {
  layer: Extract<Layer, { type: "video" }>;
  progress: MotionValue<number>;
  reduce: boolean;
  onProgress?: (p: BackdropProgress) => void;
  control?: MutableRefObject<BackdropControl>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const y = useParallax(progress, layer.parallax, reduce);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduce) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    let frame = 0;

    const report = () => {
      if (!onProgress || !video.duration) return;
      onProgress({ time: video.currentTime, duration: video.duration, progress: video.currentTime / video.duration });
    };

    const tick = () => {
      report();
      frame = requestAnimationFrame(tick);
    };

    const seek = () => {
      if (!video.duration || video.seeking) return;
      video.currentTime = progress.get() * video.duration;
      report();
    };

    const onMeta = () => {
      if (control) {
        control.current = {
          seek: (t: number) => {
            if (video.duration) video.currentTime = Math.max(0, Math.min(t, video.duration));
          },
          duration: video.duration,
        };
      }

      if (layer.mode === "scrub") {
        video.pause();
        seek();
      } else {
        void video.play().catch(() => {});
        frame = requestAnimationFrame(tick);
      }
    };

    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    const stopScrub = layer.mode === "scrub" ? progress.on("change", seek) : undefined;

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      stopScrub?.();
      if (frame) cancelAnimationFrame(frame);
      if (control) control.current = null;
    };
  }, [layer.mode, progress, reduce, onProgress, control]);

  return (
    <motion.video
      ref={videoRef}
      src={layer.src}
      poster={layer.poster}
      muted
      playsInline
      preload="auto"
      autoPlay={layer.mode !== "scrub"}
      loop={layer.mode === "loop"}
      className="absolute inset-0 size-full object-cover"
      style={{ scale: layer.scale, opacity: layer.opacity, mixBlendMode: layer.blend as never, ...(y ? { y } : null) }}
    />
  );
}

const FROM: Record<string, string> = { sm: "hidden sm:block", md: "hidden md:block", lg: "hidden lg:block" };
const UNTIL: Record<string, string> = { sm: "sm:hidden", md: "md:hidden", lg: "lg:hidden" };

function VeilLayer({
  layer,
  progress,
  reduce,
}: {
  layer: Extract<Layer, { type: "veil" }>;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const y = useParallax(progress, layer.parallax, reduce);
  return (
    <motion.div
      className={`absolute inset-0 ${layer.from ? FROM[layer.from] : ""} ${layer.until ? UNTIL[layer.until] : ""}`}
      style={{ background: layer.value, opacity: layer.opacity, mixBlendMode: layer.blend as never, ...(y ? { y } : null) }}
    />
  );
}

function GrainLayer({ opacity }: { opacity?: number }) {
  return <div className="grain absolute inset-0" style={{ opacity }} />;
}

function VignetteLayer({ intensity = 0.45 }: { intensity?: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: `radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,${intensity}) 100%)` }}
    />
  );
}
