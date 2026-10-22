"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { useI18n } from "@/lib/i18n";
import { BUSINESS, MEDIA } from "@/lib/content";
import { useOpenNow } from "@/lib/hooks";
import { riseIn, stagger } from "@/lib/motion";

export function About() {
  const { t } = useI18n();
  const a = t.about;
  const reduce = useReducedMotion() ?? false;
  const open = useOpenNow(BUSINESS.openFrom, BUSINESS.openTo);
  return (
    <section id="about" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div>
          <SectionHead kicker={a.kicker} title={a.title} lead={a.lead} />
          <motion.ol className="mt-10 border-t border-line" variants={stagger(reduce, 0.1, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}>
            {a.pillars.map((p, i) => (
              <motion.li key={p.title} variants={riseIn(reduce, 20)} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5">
                <span className="font-normalidad text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-bold transition-transform duration-500 group-hover:translate-x-1">{p.title}</h3>
                  <p className="mt-1 text-muted">{p.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <motion.div className="panel-dots relative overflow-hidden rounded-[28px] p-8 text-white shadow-[0_18px_50px_rgba(15,40,90,0.25)] sm:p-10"
          variants={riseIn(reduce, 30, 1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}>
          <svg aria-hidden viewBox="0 0 200 200" className="arcs absolute -bottom-24 -right-24 size-[320px] opacity-60">
            <g fill="none" stroke="var(--color-arc)" strokeWidth="1.2">
              <circle cx="100" cy="100" r="90" strokeDasharray="190 376" /><circle cx="100" cy="100" r="68" strokeDasharray="150 277" /><circle cx="100" cy="100" r="46" strokeDasharray="110 179" />
            </g>
          </svg>
          <img src={MEDIA.logomark} alt="" aria-hidden className="size-24 object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]" />
          <p className="mt-6 text-sm uppercase tracking-[0.14em] text-white/70">{a.badgeTitle}</p>
          <p className="font-normalidad mt-1 text-3xl uppercase">{a.badgeBody}</p>
          <p className="mt-8 flex items-center gap-2 text-sm">
            <span aria-hidden className={`size-2.5 rounded-full ${open ? "bg-leaf shadow-[0_0_10px_var(--color-leaf)]" : "bg-sun"}`} />
            {open === null ? " " : open ? t.ui.openNow : t.ui.closedNow}
          </p>
          <p className="mt-1 text-sm text-white/80">{a.hours}</p>
        </motion.div>
      </div>
    </section>
  );
}
