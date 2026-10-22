"use client";

import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowElbowIcon } from "@/components/ui/Icons";

type CTAProps = { href: string; children: React.ReactNode; variant?: "solid" | "ghost" | "reverse" };

/** Botón de pastilla con relleno que sube desde abajo al pasar el cursor. El color del relleno
    es siempre el opuesto al de reposo, para que el texto siga legible. */
export function CTA({ href, children, variant = "solid" }: CTAProps) {
  const solid = variant === "solid";
  const rest = solid ? "bg-white text-deep hover:text-white" : variant === "ghost" ? "border border-white/45 text-white hover:text-deep" : "bg-deep text-white hover:text-deep";
  const fill = solid ? "bg-deep" : "bg-white";
  return (
    <Magnetic className="inline-block" strength={0.18}>
      <a href={href} className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-[1.6em] py-[0.85em] text-[0.95em] font-semibold transition-colors duration-500 ${rest}`}>
        <span aria-hidden className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${fill}`} />
        <span className="relative">{children}</span>
        {variant === "ghost" ? (
          <span className="relative grid size-[2.1em] place-items-center rounded-full border border-white/30">
            <ArrowElbowIcon className="size-[1.1em] -rotate-90 transition-transform duration-500 group-hover:rotate-0" />
          </span>
        ) : null}
      </a>
    </Magnetic>
  );
}
