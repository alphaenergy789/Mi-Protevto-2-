"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Filters } from "@/components/ui/Filters";
import { SectionHead } from "@/components/ui/SectionHead";
import { useI18n } from "@/lib/i18n";
import { EASE } from "@/lib/motion";

/* Filtro con reacomodo suave (FLIP): `layout` + `popLayout` hacen que las tarjetas que quedan se muevan en vez de saltar. */
export function Services() {
  const { t } = useI18n();
  const s = t.services;
  const reduce = useReducedMotion() ?? false;
  const [filter, setFilter] = useState("all");
  const list = useMemo(() => (filter === "all" ? s.items : s.items.filter((i) => i.tags.includes(filter))), [filter, s.items]);
  const filterLabel = s.filters.find((f) => f.id === filter)?.label ?? "";

  return (
    <section id="services" className="mx-auto max-w-[1240px] px-5 py-24 lg:px-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHead kicker={s.kicker} title={s.title} lead={s.lead} />
        <Filters label={s.filterLabel} items={s.filters} value={filter} onChange={setFilter} />
      </div>
      <motion.ul layout={!reduce} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((it, i) => (
            <motion.li
              key={it.title}
              layout={!reduce}
              initial={{ opacity: 0, y: 26, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="group rounded-[20px] border border-line bg-card p-6 transition-colors duration-500 hover:border-sun"
            >
              <span className="font-normalidad text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted">{it.body}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <p className="sr-only" aria-live="polite">{s.announce(list.length, filterLabel)}</p>
    </section>
  );
}
