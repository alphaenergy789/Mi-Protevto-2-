"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TEXT, type Lang, type Text } from "@/lib/content";

type Ctx = { lang: Lang; t: Text; toggleLang: () => void; toggleTheme: () => void };
const I18n = createContext<Ctx>({ lang: "es", t: TEXT.es, toggleLang: () => {}, toggleTheme: () => {} });

const read = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } };

/* El servidor siempre pinta español y el cliente ajusta tras montar: así no hay desajuste de hidratación. */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const saved = read("ae-lang");
    setLang(saved === "en" || saved === "es" ? saved : navigator.language.toLowerCase().startsWith("en") ? "en" : "es");
    const theme = read("ae-theme");
    if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const toggleLang = useCallback(() => setLang((l) => { const n = l === "es" ? "en" : "es"; write("ae-lang", n); return n; }), []);
  const toggleTheme = useCallback(() => {
    const el = document.documentElement;
    const dark = el.dataset.theme ? el.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    el.dataset.theme = dark ? "light" : "dark";
    write("ae-theme", el.dataset.theme);
  }, []);

  const value = useMemo(() => ({ lang, t: TEXT[lang], toggleLang, toggleTheme }), [lang, toggleLang, toggleTheme]);
  return <I18n.Provider value={value}>{children}</I18n.Provider>;
}

export const useI18n = () => useContext(I18n);
