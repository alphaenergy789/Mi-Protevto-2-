"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHead } from "@/components/ui/SectionHead";
import { useI18n } from "@/lib/i18n";
import { riseIn, stagger } from "@/lib/motion";

/* Aquí el orden sí importa, así que los números sí son información. */
export function Process() {
  const { t } = useI18n();
  const p = t.process;
  const reduce = useReducedMotion() ?? false;
  return (
    <section id="process" className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-10">
      <SectionHead kicker={p.kicker} title={p.title} lead={p.lead} />
      <motion.ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4" variants={stagger(reduce, 0.1, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}>
        {p.steps.map((s, i) => (
          <motion.li key={s.title} variants={riseIn(reduce, 20)} className="pb-2 pr-6 pt-6">
            <span aria-hidden className="font-normalidad block text-[2.6rem] leading-none text-transparent [-webkit-text-stroke:1px_var(--color-sun)]">{i + 1}</span>
            <h3 className="mt-4 font-bold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted">{s.body}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
