"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";
import { SERVICES } from "@/lib/content";
import { riseIn, stagger } from "@/lib/motion";

export function Services() {
  const reduce = useReducedMotion() ?? false;
  return (
    <section id="services" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-10">
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-leaf">{SERVICES.kicker}</p>
      <SplitText text={SERVICES.title} by="letter" each={0.024} className="font-normalidad max-w-[18ch] text-[clamp(1.8rem,4.6vw,3.6rem)] uppercase leading-[1.1]" />
      <p className="mt-4 max-w-[52ch] text-white/70">{SERVICES.lead}</p>
      <motion.ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" variants={stagger(reduce, 0.1, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}>
        {SERVICES.items.map((s, i) => (
          <motion.li key={s.title} variants={riseIn(reduce, 26)} className="group rounded-[20px] border border-white/15 bg-white/[0.04] p-6 transition-colors duration-500 hover:bg-white/[0.09]">
            <span className="font-normalidad text-sun">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-white/70">{s.body}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
