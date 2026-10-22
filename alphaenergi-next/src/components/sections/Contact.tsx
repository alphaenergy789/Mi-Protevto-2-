"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CTA } from "@/components/ui/CTA";
import { SectionHead } from "@/components/ui/SectionHead";
import { BUSINESS } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { EASE, riseIn, stagger } from "@/lib/motion";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type Status = "idle" | "error" | "sending" | "done";

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const reduce = useReducedMotion() ?? false;
  const [status, setStatus] = useState<Status>("idle");
  const emailRef = useRef<HTMLInputElement>(null);
  const field = "w-full rounded-xl border border-line bg-card px-4 py-3 text-fg placeholder:text-muted transition-colors focus:border-sun focus:outline-none";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    /* El correo es opcional, pero si se escribe tiene que ser válido. */
    if (email && !EMAIL.test(email)) {
      setStatus("error");
      emailRef.current?.focus();
      return;
    }
    setStatus("sending");
    const body = [String(f.get("name")), `${c.mailPhone}: ${f.get("phone") ?? ""}`, `Email: ${email}`, `${c.mailType}: ${f.get("type")}`, "", String(f.get("msg") ?? "")].join("\n");
    window.setTimeout(() => {
      window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(c.mailSubject)}&body=${encodeURIComponent(body)}`;
      setStatus("done");
    }, 500);
  }

  return (
    <section id="contact" className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-10">
      <SectionHead kicker={c.kicker} title={c.title} lead={c.lead} />
      <motion.div className="mt-12 grid gap-6 lg:grid-cols-2" variants={stagger(reduce, 0.1, 0)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}>
        <motion.div variants={riseIn(reduce)}>
          <AnimatePresence mode="wait" initial={false}>
            {status === "done" ? (
              <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}
                className="rounded-[24px] border border-line bg-card p-8" role="status">
                <p className="font-normalidad text-2xl uppercase text-accent2">{c.doneTitle}</p>
                <p className="mt-3 text-muted">{c.doneBody(BUSINESS.email)}</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="grid gap-3">
                <input name="name" required className={field} placeholder={c.name} autoComplete="name" aria-label={c.name} />
                <input name="phone" type="tel" className={field} placeholder={c.phone} autoComplete="tel" aria-label={c.phone} />
                <input ref={emailRef} name="email" type="email" className={field} placeholder={c.email} autoComplete="email" aria-label={c.email}
                  aria-invalid={status === "error"} aria-describedby="email-err" onChange={() => status === "error" && setStatus("idle")} />
                <p id="email-err" role={status === "error" ? "alert" : undefined} className={`text-sm text-accent transition-opacity ${status === "error" ? "opacity-100" : "opacity-0"}`}>{c.error}</p>
                <select name="type" className={field} aria-label={c.typeLabel}>{c.types.map((x) => <option key={x}>{x}</option>)}</select>
                <textarea name="msg" className={`${field} min-h-[120px] resize-y`} placeholder={c.msg} aria-label={c.msg} />
                <button type="submit" disabled={status === "sending"} className="rounded-full bg-gradient-to-br from-sun-hi to-sun-hot px-7 py-3.5 font-semibold text-on-sun transition-transform duration-200 active:scale-[0.97] disabled:opacity-70">
                  {status === "sending" ? c.sending : c.send}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={riseIn(reduce)} className="grid content-start gap-3">
          <Info label={c.addressLabel}><a className="link-underline" href={BUSINESS.mapsUrl} target="_blank" rel="noopener">{BUSINESS.addressLines[0]}<br />{BUSINESS.addressLines[1]}</a></Info>
          <Info label={c.emailLabel}><a className="link-underline" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></Info>
          <Info label={c.phoneLabel}>{BUSINESS.phone ? <a className="link-underline" href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a> : c.phoneSoon}</Info>
          <Info label={c.hoursLabel}>
            <span className="grid grid-cols-[auto_1fr] gap-x-6 tabular-nums">
              <span className="text-muted">{c.mf}</span><b>{c.time}</b>
              <span className="text-muted">{c.sun}</span><b>{c.closed}</b>
            </span>
          </Info>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-card px-5 py-4">
      <p className="text-xs uppercase tracking-[0.12em] text-muted">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
