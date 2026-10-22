import { Marquee } from "@/components/ui/Marquee";
import { MARQUEE } from "@/lib/content";

export function Ticker() {
  return (
    <section aria-label="Resumen" className="border-y border-white/15 py-6 md:py-8">
      <Marquee items={MARQUEE} duration={38} className="font-normalidad text-[clamp(1.6rem,4vw,3.2rem)] uppercase text-white" />
    </section>
  );
}
