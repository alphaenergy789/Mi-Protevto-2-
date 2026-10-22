"use client";

import { MEDIA } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

/** El logo de AlphaEnergi ya es un PNG con fondo transparente: no hace falta recortarlo ni mezclarlo. */
export function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  return (
    <span className="flex items-center gap-3">
      <img src={MEDIA.logomark} alt="" aria-hidden className="size-10 object-contain" />
      {compact ? null : <span className="font-normalidad text-[12px] uppercase leading-[1.4] tracking-[0.08em]">{t.hero.brand}</span>}
      <span className="sr-only">{t.hero.brand}</span>
    </span>
  );
}
