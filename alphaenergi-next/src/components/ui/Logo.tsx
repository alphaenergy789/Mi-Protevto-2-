import { MEDIA } from "@/lib/content";
import { HERO } from "@/lib/content";

/** El logo de AlphaEnergi ya es un PNG con fondo transparente: no hace falta recortarlo ni mezclarlo. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <img src={MEDIA.logomark} alt="" aria-hidden className="size-10 object-contain" />
      {compact ? null : <span className="font-normalidad text-[12px] uppercase leading-[1.4] tracking-[0.08em] text-white">{HERO.brand}</span>}
      <span className="sr-only">{HERO.brand}</span>
    </span>
  );
}
