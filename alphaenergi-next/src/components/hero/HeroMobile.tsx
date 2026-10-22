"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { BACKGROUNDS, HERO, MEDIA } from "@/lib/content";
import { mw, mpx } from "@/lib/frame";
import { EASE, stagger } from "@/lib/motion";

const capTop = (y: number, size: number) => mw(y - 0.25 * size);
const FIGMA_BLUR = 0.5;
const FS = 64;

export function HeroMobile() {
  const reduce = useReducedMotion() ?? false;
  const rise = (delay = 0, y = 22) => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.95, delay, ease: EASE } },
  });
  const word = (delay = 0) => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 26, filter: `blur(${mw(28 * FIGMA_BLUR)})` },
    show: { opacity: 1, y: 0, filter: `blur(0px)`, transition: { duration: reduce ? 0.2 : 1.3, delay, ease: EASE } },
  });
  const cls = "font-normalidad absolute whitespace-nowrap uppercase text-white";
  const st = { fontSize: mw(FS), lineHeight: 1.2, letterSpacing: mw(-2.5) };

  return (
    <div className="relative isolate min-h-svh w-full overflow-hidden bg-deep md:hidden">
      <SectionBackdrop layers={BACKGROUNDS.heroMobile} className="-z-10" />
      <div className="relative flex min-h-svh items-center">
        <motion.div className="frame frame-mobile relative" variants={stagger(reduce, 0.07, 0.15)} initial="hidden" animate="show">
          <h1 className="sr-only">{HERO.srTitle}</h1>

          <motion.svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 440 956" preserveAspectRatio="none" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1.5 } } }}>
            <path className="flow-base" d="M-20 700 C 100 640, 220 760, 460 690" />
            <path className="flow-run" d="M-20 700 C 100 640, 220 760, 460 690" />
            <path className="flow-base" d="M-20 760 C 120 700, 260 810, 460 740" />
            <path className="flow-run green" d="M-20 760 C 120 700, 260 810, 460 740" />
          </motion.svg>

          <motion.span aria-hidden className={cls} style={{ ...st, left: mw(20), top: capTop(120, FS) }} variants={word()}>{HERO.brandParts.alpha}</motion.span>
          <motion.span
            aria-hidden
            className="absolute border-solid border-white"
            style={{ left: mw(312), top: mw(122), width: mw(108), height: mw(44), borderWidth: mw(8), borderRadius: mw(21), transformOrigin: "left center" }}
            variants={{ hidden: reduce ? { opacity: 0 } : { opacity: 0, scaleX: 0.7 }, show: { opacity: 1, scaleX: 1, transition: { duration: 1.2, delay: 0.2, ease: EASE } } }}
          />
          <motion.span aria-hidden className={cls} style={{ ...st, left: mw(20), top: capTop(196, FS) }} variants={word(0.08)}>
            {HERO.brandParts.ener}{HERO.brandParts.gi}
          </motion.span>

          <motion.img
            src={MEDIA.logomark}
            alt="Logo de AlphaEnergi"
            className="absolute -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
            style={{ left: mpx(50), top: mw(450), width: mw(250), height: mw(250) }}
            variants={{ hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 46, scale: 1.05 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.4, ease: EASE } } }}
          />

          <motion.div className="absolute flex items-center" style={{ left: mw(20), top: mw(612), gap: mw(10), fontSize: mw(13) }} variants={rise(0.15)}>
            <p className="whitespace-nowrap font-semibold uppercase leading-[1.2] text-white">{HERO.tagline[0][0]}<br />{HERO.tagline[0][1]}</p>
            <span className="grid place-items-center" style={{ width: mw(8), height: mw(28) }}>
              <span className="block bg-white" style={{ width: mw(29.6), height: "1px", transform: "rotate(-73.87deg)" }} />
            </span>
            <p className="whitespace-nowrap font-semibold uppercase leading-[1.2] text-white">{HERO.tagline[1][0]}<br />{HERO.tagline[1][1]}</p>
          </motion.div>

          <motion.p className="absolute text-white" style={{ left: mw(20), top: mw(668), width: mw(400), fontSize: mw(14), lineHeight: 1.4 }} variants={rise(0.2)}>
            {HERO.body}
          </motion.p>

          {/* Un ancla simple: en móvil no lleva el componente <CTA>/<Magnetic> */}
          <motion.a
            href={HERO.buttons[0].href}
            className="group absolute flex -translate-x-1/2 items-center justify-between overflow-hidden bg-white"
            style={{ left: "50%", top: mw(790), width: mw(400), borderRadius: 9999, paddingLeft: mw(32), paddingRight: mw(20), paddingTop: mw(20), paddingBottom: mw(20) }}
            variants={rise(0.44, 26)}
          >
            <span className="font-bold text-deep" style={{ fontSize: mw(22) }}>{HERO.buttons[0].label}</span>
            <span className="grid place-items-center rounded-full bg-deep text-white group-active:scale-90" style={{ width: mw(48), height: mw(48) }}>→</span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
