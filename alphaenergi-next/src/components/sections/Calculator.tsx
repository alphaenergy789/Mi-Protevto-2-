"use client";

import { useMemo, useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { CTA } from "@/components/ui/CTA";
import { BUSINESS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

const RATE = 0.15, PPW = 2.8, PANEL_W = 410, YIELD = 1500, ESC = 0.03, DEGRADE = 0.005, YEARS = 25;
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const n0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const n1 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 });

export function Calculator() {
  const { t } = useI18n();
  const c = t.calc;
  const [bill, setBill] = useState(200);
  const [offset, setOffset] = useState(100);
  const [orient, setOrient] = useState(1);
  const [shade, setShade] = useState(1);

  const r = useMemo(() => {
    const useYear = (bill / RATE) * 12;
    const yieldKw = YIELD * orient * shade;
    const panels = Math.max(1, Math.ceil(((useYear * offset) / 100 / yieldKw) * 1000 / PANEL_W));
    const kw = (panels * PANEL_W) / 1000;
    const prod = kw * yieldKw;
    const cost = kw * 1000 * PPW;
    const valued = Math.min(prod, useYear);
    let cum = 0, payback: number | null = null, save1 = 0;
    for (let y = 1; y <= YEARS; y++) {
      const s = valued * Math.pow(1 - DEGRADE, y - 1) * RATE * Math.pow(1 + ESC, y - 1);
      if (y === 1) save1 = s;
      const before = cum; cum += s;
      if (payback === null && cum >= cost) payback = y - 1 + (cost - before) / s;
    }
    return { panels, kw, prod, cost, save1, payback };
  }, [bill, offset, orient, shade]);

  const body = [c.mailHead, "", `${c.bill}: $${bill}`, `${c.size}: ${n1.format(r.kw)} kW (${r.panels} ${c.panels.toLowerCase()})`, `${c.prod}: ${n0.format(r.prod)} kWh`, `${c.cost}: ${usd.format(r.cost)}`, `${c.save1}: ${usd.format(r.save1)}`].join("\n");
  const href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(c.mailSubject)}&body=${encodeURIComponent(body)}`;
  const field = "w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-fg";

  return (
    <section id="calculator" className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-10">
      <SectionHead kicker={c.kicker} title={c.title} lead={c.lead} />
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] border border-line bg-card p-6 sm:p-8">
          <div className="mb-6">
            <label htmlFor="bill" className="mb-2 flex justify-between text-muted"><span>{c.bill}</span><b className="tabular-nums text-fg">${bill}</b></label>
            <input id="bill" type="range" min={50} max={800} step={10} value={bill} onChange={(e) => setBill(+e.target.value)} className="w-full accent-sun" />
          </div>
          <div className="mb-6">
            <label htmlFor="offset" className="mb-2 flex justify-between text-muted"><span>{c.offset}</span><b className="tabular-nums text-fg">{offset} %</b></label>
            <input id="offset" type="range" min={30} max={120} step={5} value={offset} onChange={(e) => setOffset(+e.target.value)} className="w-full accent-sun" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label htmlFor="orient" className="mb-2 block text-muted">{c.orient}</label>
              <select id="orient" className={field} value={orient} onChange={(e) => setOrient(+e.target.value)}>{c.orients.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}</select></div>
            <div><label htmlFor="shade" className="mb-2 block text-muted">{c.shade}</label>
              <select id="shade" className={field} value={shade} onChange={(e) => setShade(+e.target.value)}>{c.shades.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}</select></div>
          </div>
          <p className="mt-6 text-xs text-muted">{c.note}</p>
        </div>

        <div className="panel-dots overflow-hidden rounded-[24px] p-6 text-white shadow-[0_18px_50px_rgba(15,40,90,0.25)] sm:p-8" aria-live="polite">
          <p className="text-sm text-white/80">{c.save1}</p>
          <p className="font-normalidad text-[clamp(2.4rem,7vw,3.6rem)] leading-tight text-gold-soft tabular-nums">{usd.format(r.save1)}</p>
          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/25 pt-5">
            <Stat label={c.payback} value={r.payback === null ? c.never : `${n1.format(r.payback)} ${c.years}`} />
            <Stat label={c.cost} value={usd.format(r.cost)} />
            <Stat label={c.size} value={`${n1.format(r.kw)} kW`} />
            <Stat label={c.panels} value={String(r.panels)} />
            <Stat label={c.prod} value={`${n0.format(r.prod)} kWh`} />
          </div>
          <div className="mt-7 text-[0.95rem]"><CTA href={href}>{c.cta}</CTA></div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-white/75">{label}</p>
      <p className="font-normalidad text-lg tabular-nums">{value}</p>
    </div>
  );
}
