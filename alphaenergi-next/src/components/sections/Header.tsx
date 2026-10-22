"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { NAV } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useActiveSection, useScrolled } from "@/lib/hooks";

const IDS = NAV.map((n) => n.id) as string[];

export function Header() {
  const scrolled = useScrolled(40);
  const active = useActiveSection(IDS);
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b transition-[background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? "border-white/15 bg-[color-mix(in_srgb,var(--color-deep)_55%,transparent)] backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <a href="#home" aria-label="Inicio"><Logo /></a>
        <nav className="flex items-center gap-6 text-[12px] capitalize md:gap-[60px]">
          {NAV.map((n) => (
            <a key={n.id} href={n.href} aria-current={active === n.id ? "page" : undefined}
               className={`link-underline ${active === n.id ? "font-bold text-white opacity-100" : "text-white opacity-70 hover:opacity-100"}`}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
