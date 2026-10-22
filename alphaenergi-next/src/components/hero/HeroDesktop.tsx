"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { CTA } from "@/components/ui/CTA";
import { StatCards } from "@/components/hero/StatCards";
import { BACKGROUNDS, MEDIA } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { PILL_MASK } from "@/lib/assets";
import { dw, dpx } from "@/lib/frame";
import { EASE, passthrough, stagger } from "@/lib/motion";
import { usePointerFine } from "@/lib/hooks";

/* Figma mide `top` desde la altura de las mayúsculas y CSS desde su propia caja de línea:
   sin esta corrección de 0.25 × fontSize, todo el texto del hero queda visiblemente bajo. */
const capTop = (y: number, size: number) => dw(y - 0.25 * size);
/* El "layer blur" de Figma es un radio; CSS quiere la desviación estándar, la mitad. */
const FIGMA_BLUR = 0.5;

const FS = 130;
const LS = dw(-5.2);

const logoBox = { width: dw(340), height: dw(340) };

export function HeroDesktop() {
  const HERO = useI18n().t.hero;
  const reduce = useReducedMotion() ?? false;
  const fine = usePointerFine();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const flowY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const typeFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const logoPX = useTransform(smx, (v) => v * -14);
  const logoPY = useTransform(smy, (v) => v * -8);
  const typePX = useTransform(smx, (v) => v * 9);
  const flowPX = useTransform(smx, (v) => v * 22);
  const pointerOn = fine && !reduce;

  const rise = (delay = 0, y = 22) => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.9, delay, ease: EASE } },
  });
  const letters = (delay = 0, blur?: [number, number]) => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 40, ...(blur ? { filter: `blur(${dw(blur[0] * FIGMA_BLUR)})` } : null) },
    show: { opacity: 1, y: 0, ...(blur ? { filter: `blur(${dw(blur[1] * FIGMA_BLUR)})` } : null), transition: { duration: reduce ? 0.2 : 1.4, delay, ease: EASE } },
  });
  const type = "font-normalidad absolute whitespace-nowrap uppercase text-hero-type";
  const typeStyle = { fontSize: dw(FS), lineHeight: 1.2, letterSpacing: LS };
  const shadow = (bg: string, left: number, mx: number) => ({
    left: dw(left),
    top: dw(112),
    width: dw(mx),
    height: dw(67),
    background: bg,
    filter: `blur(calc(${dw(24.5)} * 0.5))`,
    WebkitMaskImage: `url("${PILL_MASK}")`,
    maskImage: `url("${PILL_MASK}")`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: `${dw(548.604)} ${dw(115.93)}`,
    WebkitMaskSize: `${dw(548.604)} ${dw(115.93)}`,
  });

  return (
    <div
      ref={sectionRef}
      onPointerMove={(e) => {
        if (!pointerOn || !sectionRef.current) return;
        const r = sectionRef.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative isolate hidden min-h-svh w-full overflow-hidden md:block"
    >
      <SectionBackdrop layers={BACKGROUNDS.hero} className="-z-10" />

      <div className="relative flex min-h-svh items-center">
        <motion.div className="frame frame-desktop relative" variants={stagger(reduce, 0.075, 0.15)} initial="hidden" animate="show">
          {/* 2. FLUJOS DE ENERGÍA (hacen de "halos") */}
          <motion.div aria-hidden className="absolute inset-0" variants={passthrough} style={reduce ? undefined : { y: flowY, x: pointerOn ? flowPX : undefined }}>
            <motion.svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 560" preserveAspectRatio="none" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1.6, ease: EASE } } }}>
              <path className="flow-base" d="M-20 470 C 250 380, 420 520, 700 440 S 940 330, 1020 380" />
              <path className="flow-run" d="M-20 470 C 250 380, 420 520, 700 440 S 940 330, 1020 380" />
              <path className="flow-base" d="M-20 520 C 300 450, 520 560, 760 500 S 960 430, 1020 460" />
              <path className="flow-run green" d="M-20 520 C 300 450, 520 560, 760 500 S 960 430, 1020 460" />
              <path className="flow-base" d="M-20 410 C 220 330, 460 470, 720 380 S 930 260, 1020 300" />
              <path className="flow-run" style={{ animationDelay: "-3s" }} d="M-20 410 C 220 330, 460 470, 720 380 S 930 260, 1020 300" />
            </motion.svg>
          </motion.div>

          {/* 3. SUELO: fila de paneles */}
          <motion.div
            aria-hidden
            className="absolute"
            style={{ left: dw(160), top: dw(748), width: dw(1120), height: dw(40), transform: "perspective(600px) rotateX(55deg)", transformOrigin: "bottom",
              background: "linear-gradient(var(--color-sky), var(--color-deep))",
              backgroundImage:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-haze) 40%, transparent) 1px, transparent 1px), linear-gradient(var(--color-sky), var(--color-deep))",
              backgroundSize: `${dw(80)} 100%, 100% 100%` }}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 0.9, transition: { duration: 1.2, delay: 0.5 } } }}
          />

          {/* 4. "Ener" — desenfocado, detrás del logo */}
          <motion.div className="absolute inset-0" variants={passthrough} style={reduce ? undefined : { y: typeY, x: pointerOn ? typePX : undefined, opacity: typeFade }}>
            <h1 className="sr-only">{HERO.srTitle}</h1>
            <motion.span aria-hidden className={type} style={{ ...typeStyle, left: dpx(0, 90), top: capTop(300, FS) }} variants={letters(0, [40, 24.8])}>
              {HERO.brandParts.ener}
            </motion.span>
          </motion.div>

          {/* 5. LOGO (cumple el papel de la figura central) */}
          <motion.div className="absolute inset-0" variants={passthrough} style={reduce ? undefined : { y: logoY, x: pointerOn ? logoPX : undefined }}>
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: "50%", top: dw(360), ...logoBox }}
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 60, scale: 1.06 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: reduce ? 0.2 : 1.5, ease: EASE } },
              }}
            >
              <motion.img src={MEDIA.logomark} alt="Logo de AlphaEnergi" className="h-full w-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]" variants={passthrough} style={reduce || !pointerOn ? undefined : { y: logoPY }} />
            </motion.div>
          </motion.div>

          {/* 6. "gi" + BARRA */}
          <motion.div className="absolute inset-0" variants={passthrough} style={reduce ? undefined : { y: typeY, x: pointerOn ? typePX : undefined, opacity: typeFade }}>
            <motion.span aria-hidden className={type} style={{ ...typeStyle, left: dpx(0, 850), top: capTop(300, FS) }} variants={letters(0.1)}>
              {HERO.brandParts.gi}
            </motion.span>
            <motion.span
              aria-hidden
              className="absolute bg-sun"
              style={{ left: dw(560), top: dw(300.4), width: dw(269), height: dw(21.7), transformOrigin: "right center" }}
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, scaleX: 0 },
                show: { opacity: 1, scaleX: 1, transition: { duration: reduce ? 0.2 : 1.1, delay: 0.35, ease: EASE } },
              }}
            />
          </motion.div>

          {/* 7. "Alpha" + ANILLO con sombra interior enmascarada (EFFECT-09) */}
          <motion.div className="absolute inset-0" variants={passthrough} style={reduce ? undefined : { y: typeY, x: pointerOn ? typePX : undefined, opacity: typeFade }}>
            <motion.span aria-hidden className={type} style={{ ...typeStyle, left: dpx(0, 90), top: capTop(130, FS) }} variants={letters()}>
              {HERO.brandParts.alpha}
            </motion.span>
            <motion.span
              aria-hidden
              className="absolute border-solid border-sun"
              style={{ left: dw(720), top: dw(128), width: dw(548.604), height: dw(115.93), borderWidth: dw(21), borderRadius: dw(55), transformOrigin: "left center" }}
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, scaleX: 0.72 },
                show: { opacity: 1, scaleX: 1, transition: { duration: reduce ? 0.2 : 1.4, delay: 0.2, ease: EASE } },
              }}
            />
            <span aria-hidden className="absolute" style={{ ...shadow("var(--color-sun-hot)", 902.6, 358), maskPosition: `${dw(-182.604)} ${dw(16.125)}`, WebkitMaskPosition: `${dw(-182.604)} ${dw(16.125)}` }} />
            <span aria-hidden className="absolute" style={{ ...shadow("color-mix(in srgb, var(--color-sun-hot) 55%, var(--color-ink))", 947.6, 230.924), maskPosition: `${dw(-227.679)} ${dw(16.125)}`, WebkitMaskPosition: `${dw(-227.679)} ${dw(16.125)}` }} />
          </motion.div>

          {/* 8. LEMA */}
          <motion.div className="absolute flex items-center" style={{ left: dw(440), top: dw(566), gap: dw(24), fontSize: dw(24) }} variants={rise(0, 20)}>
            <p className="whitespace-nowrap font-semibold uppercase leading-[1.4] text-white">{HERO.tagline[0][0]}<br />{HERO.tagline[0][1]}</p>
            <span className="grid place-items-center" style={{ width: dw(17.9), height: dw(46.8) }}>
              <span className="block bg-white" style={{ width: dw(50.1), height: "1px", transform: "rotate(-69.08deg)" }} />
            </span>
            <p className="whitespace-nowrap font-semibold uppercase leading-[1.4] text-white">{HERO.tagline[1][0]}<br />{HERO.tagline[1][1]}</p>
          </motion.div>

          {/* 9. PÁRRAFO */}
          <motion.p className="absolute text-white" style={{ left: dw(90), top: dw(566), width: dw(310), fontSize: dw(16), lineHeight: 1.4 }} variants={rise()}>
            {HERO.body}
          </motion.p>

          {/* 10. BOTONES */}
          <motion.div className="absolute flex items-center gap-3" style={{ left: dw(90), top: dw(676), fontSize: dw(16) }} variants={rise()}>
            {HERO.buttons.map((b) => (
              <CTA key={b.label} href={b.href} variant={b.style === "solid" ? "solid" : "ghost"}>{b.label}</CTA>
            ))}
          </motion.div>

          {/* 11. RECORTE FRONTAL DEL LOGO: su parte alta pasa por delante del título */}
          <motion.div className="pointer-events-none absolute inset-0" aria-hidden variants={passthrough} style={reduce ? undefined : { y: logoY, x: pointerOn ? logoPX : undefined }}>
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: "50%", top: dw(360), ...logoBox }}
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 60, scale: 1.06 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: reduce ? 0.2 : 1.5, ease: EASE } },
              }}
            >
              <motion.img src={MEDIA.logomark} alt="" className="h-full w-full object-contain object-bottom" variants={passthrough} style={{ clipPath: "inset(0 0 62% 0)", ...(reduce || !pointerOn ? null : { y: logoPY }) }} />
            </motion.div>
          </motion.div>

          {/* 12. TARJETAS */}
          <motion.div className="absolute inset-0" variants={passthrough} style={reduce ? undefined : { y: cardsY }}>
            <StatCards />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
