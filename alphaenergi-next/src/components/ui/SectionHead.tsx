"use client";

import { SplitText } from "@/components/ui/SplitText";

type Props = { kicker: string; title: string; lead?: string; light?: boolean; center?: boolean };

/** Encabezado común de toda sección: etiqueta, título que se revela letra por letra y bajada. */
export function SectionHead({ kicker, title, lead, light = false, center = false }: Props) {
  return (
    <div className={center ? "mx-auto text-center" : ""}>
      <p className={`mb-3 text-[12px] font-semibold uppercase tracking-[0.18em] ${light ? "text-gold" : "text-accent2"}`}>{kicker}</p>
      <SplitText key={title} text={title} by="letter" each={0.024} className={`font-normalidad text-[clamp(1.5rem,3.3vw,2.7rem)] uppercase leading-[1.1] ${center ? "mx-auto" : ""} max-w-[20ch] ${light ? "text-white" : "text-fg"}`} />
      {lead ? <p className={`mt-4 max-w-[56ch] ${center ? "mx-auto" : ""} ${light ? "text-white/80" : "text-muted"}`}>{lead}</p> : null}
    </div>
  );
}
