"use client";

import { Marquee } from "@/components/ui/Marquee";
import { useI18n } from "@/lib/i18n";

export function Ticker() {
  const { t } = useI18n();
  return (
    <section aria-label="Resumen" className="border-y border-line py-6 md:py-8">
      <Marquee items={t.marquee} duration={38} className="font-normalidad text-[clamp(1.6rem,4vw,3.2rem)] uppercase text-fg" />
    </section>
  );
}
