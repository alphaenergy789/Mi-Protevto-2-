"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Filters } from "@/components/ui/Filters";
import { SectionHead } from "@/components/ui/SectionHead";
import { useI18n } from "@/lib/i18n";
import { EASE, riseIn, stagger } from "@/lib/motion";

const ICONS = [
  <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  <><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 12h3l1-3 2 6 1-3h1" /></>,
  <><rect x="3" y="8" width="16" height="9" rx="2" /><path d="M21 11v3" /></>,
  <path d="M3 12h4l2-6 4 12 2-6h6" />,
  <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>,
];

export function Products() {
  const { t } = useI18n();
  const p = t.products;
  const reduce = useReducedMotion() ?? false;
  const [filter, setFilter] = useState("all");
  const list = useMemo(() => (filter === "all" ? p.items : p.items.filter((i) => i.tag === filter)), [filter, p.items]);
  const filterLabel = p.filters.find((f) => f.id === filter)?.label ?? "";

  return (
    <section id="products" className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-10">
      <div className="panel-dots relative overflow-hidden rounded-[28px] p-6 text-white shadow-[0_18px_50px_rgba(15,40,90,0.25)] sm:p-10 lg:p-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead light kicker={p.kicker} title={p.title} lead={p.lead} />
          <Filters light label={p.filterLabel} items={p.filters} value={filter} onChange={setFilter} />
        </div>

        <motion.ul layout={!reduce} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((it) => (
              <motion.li key={it.name} layout={!reduce}
                initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur transition-colors duration-300 hover:bg-white/20">
                <h3 className="font-normalidad text-lg uppercase">{it.name}</h3>
                <p className="mt-2 text-sm text-white/80">{it.body}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <p className="sr-only" aria-live="polite">{p.announce(list.length, filterLabel)}</p>

        <h3 className="mt-14 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">{p.flowTitle}</h3>
        <motion.div className="mt-6 flex flex-col items-center sm:flex-row sm:items-stretch" variants={stagger(reduce, 0.1, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}>
          {p.flow.map((n, i) => (
            <div key={n.title} className="contents">
              <motion.div variants={riseIn(reduce, 16)} className="w-full max-w-[260px] flex-1 px-1.5 py-3 text-center sm:max-w-none">
                <div className="mx-auto mb-3 grid size-14 place-items-center rounded-2xl border border-white/35 bg-white/15">
                  <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{ICONS[i]}</svg>
                </div>
                <b className="block text-[0.95rem]">{n.title}</b>
                <small className="block text-[0.8rem] leading-tight text-white/75">{n.body}</small>
              </motion.div>
              {i < p.flow.length - 1 ? <div aria-hidden className={`flow-link ${i % 2 ? "green" : ""}`} /> : null}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
