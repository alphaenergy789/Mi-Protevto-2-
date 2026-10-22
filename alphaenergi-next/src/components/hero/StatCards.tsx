"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { HERO } from "@/lib/content";
import { dw, dpy } from "@/lib/frame";
import { EASE } from "@/lib/motion";
import { useCountUp } from "@/lib/hooks";

const CARD_TOP = dpy(69, 0);
const capTop = (y: number, size: number) => dw(y - 0.25 * size);

function Card({ left, delay, stat, run, reduce }: { left: number; delay: number; stat: (typeof HERO.stats)[number]; run: boolean; reduce: boolean }) {
  const n = useCountUp(stat.value, run, reduce, 1500);
  return (
    <motion.div
      className="glass group absolute overflow-hidden transition-[background-color] duration-500 hover:bg-white/25"
      style={{ left: dw(left), top: CARD_TOP, width: dw(290), height: dw(125), borderRadius: dw(20) }}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: reduce ? 0.2 : 1, delay, ease: EASE } },
      }}
    >
      <span aria-hidden className="absolute rounded-full bg-sun" style={{ left: dw(24), top: dw(26), width: dw(10), height: dw(10) }} />
      <p className="font-normalidad absolute whitespace-nowrap uppercase text-white" style={{ left: dw(24), top: capTop(52, 40), fontSize: dw(40), lineHeight: 1.2, letterSpacing: dw(-1.6) }}>
        {n}
        {stat.suffix}
      </p>
      <p className="absolute whitespace-nowrap text-white opacity-70" style={{ left: dw(24), top: capTop(94, 16), fontSize: dw(16), lineHeight: 1.4 }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

export function StatCards() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <div ref={ref} className="absolute inset-0">
      <Card left={800} delay={0.15} stat={HERO.stats[0]} run={inView} reduce={reduce} />
      <Card left={1100} delay={0.25} stat={HERO.stats[1]} run={inView} reduce={reduce} />
    </div>
  );
}
