"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CTA } from "@/components/ui/CTA";
import { SplitText } from "@/components/ui/SplitText";
import { CONTACT } from "@/lib/content";
import { riseIn, stagger } from "@/lib/motion";

export function Contact() {
  const reduce = useReducedMotion() ?? false;
  return (
    <section id="contact" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-10">
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-leaf">{CONTACT.kicker}</p>
      <SplitText text={CONTACT.title} by="letter" each={0.024} className="font-normalidad max-w-[16ch] text-[clamp(1.8rem,4.6vw,3.6rem)] uppercase leading-[1.1]" />
      <p className="mt-4 max-w-[52ch] text-white/70">{CONTACT.lead}</p>
      <motion.div className="mt-12 grid gap-4 md:grid-cols-2" variants={stagger(reduce, 0.1, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}>
        <motion.div variants={riseIn(reduce)} className="glass rounded-[20px] p-6">
          <p className="text-xs uppercase tracking-[0.12em] text-white/60">{CONTACT.addressLabel}</p>
          <p className="mt-1">{CONTACT.address[0]}<br />{CONTACT.address[1]}</p>
          <p className="mt-6 text-xs uppercase tracking-[0.12em] text-white/60">{CONTACT.emailLabel}</p>
          <a className="link-underline mt-1 inline-block" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <p className="mt-6 text-xs uppercase tracking-[0.12em] text-white/60">{CONTACT.phoneLabel}</p>
          <p className="mt-1">{CONTACT.phone}</p>
        </motion.div>
        <motion.div variants={riseIn(reduce)} className="glass rounded-[20px] p-6">
          <p className="text-xs uppercase tracking-[0.12em] text-white/60">{CONTACT.hoursLabel}</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
            {CONTACT.hours.map((h) => (
              <div key={h.day} className="contents"><dt className="text-white/80">{h.day}</dt><dd className="font-semibold">{h.time}</dd></div>
            ))}
          </dl>
          <div className="mt-8 text-base"><CTA href={`mailto:${CONTACT.email}`}>{CONTACT.button}</CTA></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
