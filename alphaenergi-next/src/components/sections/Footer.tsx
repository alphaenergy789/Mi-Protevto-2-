"use client";

import { Logo } from "@/components/ui/Logo";
import { BUSINESS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useScrolled } from "@/lib/hooks";

export function Footer() {
  const { t } = useI18n();
  const shown = useScrolled(600);
  return (
    <footer className="relative overflow-hidden border-t border-line px-5 pb-10 pt-16 lg:px-10">
      <div className="mx-auto max-w-[1240px]">
        <Logo />
        <p className="mt-4 text-sm text-muted">{t.footer.line} · {BUSINESS.addressLines.join(", ")}</p>
        <p aria-hidden className="font-normalidad mt-10 select-none whitespace-nowrap uppercase leading-none text-fg/10" style={{ fontSize: "min(10.6vw, 13rem)" }}>{t.hero.brand}</p>
        <p className="mt-6 text-xs text-muted">{t.footer.copyright}</p>
      </div>
      <a href="#home" aria-label={t.ui.top}
         className={`fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-gradient-to-br from-sun-hi to-sun-hot text-on-sun shadow-lg transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
        <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M10 16V4M4 9l6-6 6 6" /></svg>
      </a>
    </footer>
  );
}
