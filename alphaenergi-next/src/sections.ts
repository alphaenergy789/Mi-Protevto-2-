import type { ComponentType } from "react";
import { Hero } from "@/components/hero/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { Calculator } from "@/components/sections/Calculator";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export type SectionEntry = {
  id: string;
  active: boolean;
  Component: ComponentType;
  /** Clave de `BACKGROUNDS` en content.ts, o null si no tiene fondo propio. */
  background: string | null;
  group?: "body";
};

/* Sacar una sección = `active: false` (reversible). Reordenar = mover la línea. */
export const SECTIONS: SectionEntry[] = [
  { id: "hero", active: true, Component: Hero, background: null },
  { id: "ticker", active: true, Component: Ticker, background: null, group: "body" },
  { id: "about", active: true, Component: About, background: null, group: "body" },
  { id: "services", active: true, Component: Services, background: null, group: "body" },
  { id: "products", active: true, Component: Products, background: null, group: "body" },
  { id: "process", active: true, Component: Process, background: null, group: "body" },
  { id: "calculator", active: true, Component: Calculator, background: null, group: "body" },
  { id: "contact", active: true, Component: Contact, background: null, group: "body" },
  { id: "footer", active: true, Component: Footer, background: null, group: "body" },
];

/** Las secciones encendidas de un grupo, en orden. */
export const sectionsIn = (group?: "body") => SECTIONS.filter((s) => s.active && s.group === group);
