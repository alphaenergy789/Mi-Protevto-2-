"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { useI18n } from "@/lib/i18n";
import { BUSINESS } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useActiveSection, useEscape, useFocusTrap, useLockBodyScroll, useScrolled } from "@/lib/hooks";

const IDS = ["home", "about", "services", "products", "calculator", "contact"];

const chip = "grid h-9 min-w-9 place-items-center rounded-full border border-line bg-card px-3 text-[13px] font-semibold text-fg transition-[transform,border-color] duration-300 hover:border-sun active:scale-95";

export function Header() {
  const { t, lang, toggleLang, toggleTheme } = useI18n();
  const reduce = useReducedMotion() ?? false;
  const scrolled = useScrolled(40);
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  useLockBodyScroll(open);
  useEscape(open, close);
  const trap = useFocusTrap<HTMLDivElement>(open);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b text-fg transition-[background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "border-line bg-[color-mix(in_srgb,var(--card)_82%,transparent)] backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-4 px-5 lg:px-10">
          <a href="#home" aria-label={t.hero.brand}><Logo /></a>
          <nav aria-label="Principal" className="hidden items-center gap-7 text-[13px] lg:flex">
            {t.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? "page" : undefined}
                 className={`link-underline ${active === n.id ? "font-bold opacity-100" : "opacity-70 hover:opacity-100"}`}>{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" className={chip} onClick={toggleLang} aria-label={t.ui.langAria}>{lang === "es" ? "EN" : "ES"}</button>
            <button type="button" className={chip} onClick={toggleTheme} aria-label={t.ui.themeAria}>
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            </button>
            <a href="#contact" className="hidden rounded-full bg-gradient-to-br from-sun-hi to-sun-hot px-5 py-2.5 text-[13px] font-semibold text-on-sun transition-transform duration-200 active:scale-95 sm:block">{t.ui.quote}</a>
            <button type="button" className={`${chip} lg:hidden`} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>{t.ui.menu}</button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div role="dialog" aria-modal="true" aria-label={t.ui.menu} className="fixed inset-0 z-[60] text-white"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4, ease: EASE } }} exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}>
            <div aria-hidden className="absolute inset-0 bg-ink/95 backdrop-blur-2xl" />
            <div ref={trap} className="relative flex h-full flex-col px-5 py-5">
              <div className="flex h-[48px] items-center justify-between">
                <Logo />
                <button type="button" onClick={close} className="rounded-full border border-white/30 px-4 py-2 text-sm transition-transform active:scale-95">{t.ui.close}</button>
              </div>
              <motion.ul className="mt-10 flex flex-1 flex-col justify-center gap-2"
                variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.12 } } }} initial="hidden" animate="show">
                {t.nav.map((n, i) => (
                  <motion.li key={n.id} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}>
                    <a href={`#${n.id}`} onClick={close} className="group flex items-baseline gap-4 py-2">
                      <span className="text-sm text-white/50">{String(i + 1).padStart(2, "0")}</span>
                      <span className="relative block overflow-hidden">
                        <span className="font-normalidad block text-[clamp(1.6rem,7.2vw,3.4rem)] uppercase transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">{n.label}</span>
                        <span aria-hidden className="font-normalidad absolute inset-0 translate-y-full text-[clamp(1.6rem,7.2vw,3.4rem)] uppercase text-sun transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">{n.label}</span>
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <p className="text-sm text-white/60">{BUSINESS.addressLines.join(" · ")} · <a className="link-underline" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
