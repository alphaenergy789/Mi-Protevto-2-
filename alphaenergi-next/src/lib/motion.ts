import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const stagger = (reduce: boolean, each = 0.08, delay = 0.1): Variants => ({
  hidden: {},
  show: {
    transition: reduce ? { staggerChildren: 0, delayChildren: 0 } : { staggerChildren: each, delayChildren: delay },
  },
});

export const riseIn = (reduce: boolean, y = 24, duration = 0.9): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : duration, ease: EASE } },
});

export const letterIn = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: "0.5em", rotate: 6 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: reduce ? 0.2 : 0.7, ease: EASE } },
});

/* Obligatorio en todo wrapper con MotionValue en `style` dentro de un stagger():
   sin claves propias, el ancestro pisa el `y`/`x` y se rompe el paralaje. */
export const passthrough: Variants = { hidden: {}, show: {} };
