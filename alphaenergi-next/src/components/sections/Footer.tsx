import { Logo } from "@/components/ui/Logo";
import { FOOTER, HERO } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/15 px-5 pb-10 pt-16 lg:px-10">
      <div className="mx-auto max-w-[1240px]">
        <Logo />
        <p className="mt-4 text-sm text-white/70">{FOOTER.line}</p>
        <p aria-hidden className="font-normalidad mt-10 select-none whitespace-nowrap uppercase leading-none text-white/10" style={{ fontSize: "min(10.6vw, 13rem)" }}>{HERO.brand}</p>
        <p className="mt-6 text-xs text-white/50">{FOOTER.copyright}</p>
      </div>
    </footer>
  );
}
