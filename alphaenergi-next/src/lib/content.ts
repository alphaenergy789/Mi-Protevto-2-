/* ══════════════════════════════════════════════════════════════════
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITÁS TOCAR.

   Acá viven los textos, las imágenes y los fondos de todo el sitio.
   Los colores y las tipografías están aparte, en `src/app/globals.css`,
   arriba de todo.

   Si cambiás algo acá, cambia en todas las pantallas a la vez
   (computadora y celular). No hace falta buscarlo en ningún otro lado.
   ══════════════════════════════════════════════════════════════════ */
import { asset } from "@/lib/assets";
import type { Layer } from "@/components/ui/SectionBackdrop";

/* ─────────────── 1. IMÁGENES Y VIDEOS ───────────────
   Cambiá una dirección acá y cambia en todos los lugares donde se use.
   Pegá la dirección completa entre las comillas. */
export const MEDIA = {
  /** El logo de AlphaEnergi (tomado de la cuenta de GoDaddy). Se usa en la barra,
      en el centro del hero y en el pie. Si lo cambiás, cambian los tres. */
  logomark: asset("/logo.png"),
} as const;

/* ─────────────── 2. FONDOS DE CADA SECCIÓN ───────────────
   Las capas se pintan de arriba hacia abajo: la PRIMERA de la lista queda más atrás.
   Para sacar una capa, borrá su línea.
   Para una foto de fondo:  hero: [{ type: "image", src: "https://tu-foto.jpg" }],
   Para un color plano:     hero: [{ type: "color", value: "#101820" }],
   Tipos: "image" · "video" · "color" · "gradient" · "veil" · "grain" · "vignette". */
export const BACKGROUNDS: Record<string, Layer[]> = {
  /** Hero en computadora: azul de panel solar con la trama de puntos. */
  hero: [
    { type: "gradient", value: "linear-gradient(160deg, var(--color-sky) 0%, var(--color-deep) 70%, var(--color-ink) 100%)", parallax: 70 },
    {
      type: "gradient",
      value: "radial-gradient(circle, color-mix(in srgb, var(--color-haze) 32%, transparent) 1.6px, transparent 2px) 0 0 / 26px 26px",
      opacity: 0.7,
      parallax: 40,
    },
  ],

  /** Hero en celular. */
  heroMobile: [
    { type: "gradient", value: "linear-gradient(170deg, var(--color-sky) 0%, var(--color-deep) 65%, var(--color-ink) 100%)" },
    {
      type: "gradient",
      value: "radial-gradient(circle, color-mix(in srgb, var(--color-haze) 32%, transparent) 1.4px, transparent 1.8px) 0 0 / 22px 22px",
      opacity: 0.7,
    },
  ],

  /** Fondo de todo lo que viene después del hero (paradas en píxeles, no en %). */
  body: [
    {
      type: "gradient",
      value:
        "linear-gradient(180deg, var(--color-ink) 0px, var(--color-ink) 1200px, var(--color-abyss) 100%)",
    },
  ],
};

/* ─────────────── 3. TEXTOS ─────────────── */
export const NAV = [
  { id: "home", label: "Inicio", href: "#home" },
  { id: "services", label: "Servicios", href: "#services" },
  { id: "contact", label: "Contacto", href: "#contact" },
] as const;

export const HERO = {
  brand: "AlphaEnergi",
  srTitle: "AlphaEnergi — Energía solar y respaldo para tu hogar en Miami, Florida.",
  /**
   * ⚠ ZONA DIFÍCIL — el título grande está partido en pedazos que se colocan a mano
   * (el anillo, la barra blanca y el logo pasando por delante). Cambiar estos pedazos
   * por otra palabra NO alcanza: hay que recolocarlos. Mirá "Lo que NO es fácil" en EDITAR.md.
   */
  brandParts: { alpha: "Alpha", ener: "Ener", gi: "gi" },
  tagline: [
    ["Energía", "solar."],
    ["Respaldo", "Victron."],
  ],
  buttons: [
    { label: "Pedir cotización", href: "#contact", style: "solid" },
    { label: "Nuestros servicios", href: "#services", style: "ghost" },
  ],
  body: "Instalaciones solares eficientes y sostenibles en Miami, con inversores, controladores y baterías Victron Energy.",
  stats: [
    { value: 6, suffix: "", label: "Días de atención" },
    { value: 7, suffix: "", label: "Líneas Victron" },
  ],
} as const;

export const MARQUEE = ["Energía solar", "Distribuidor autorizado Victron Energy", "Respaldo con baterías", "Miami, Florida", "Mantenimiento"] as const;

export const SERVICES = {
  kicker: "Servicios",
  title: "Todo para pasarte a la energía solar",
  lead: "Diseñamos, instalamos y cuidamos tu sistema.",
  items: [
    { title: "Solar residencial", body: "Paneles en el techo de tu casa, dimensionados según tu consumo." },
    { title: "Comercial", body: "Reduce los costos de tu negocio con generación propia." },
    { title: "Baterías y respaldo", body: "Energía para la noche y para cuando falla la red." },
    { title: "Mantenimiento", body: "Revisión y monitoreo para que tu sistema rinda al máximo." },
  ],
} as const;

export const CONTACT = {
  kicker: "Contacto",
  title: "Pide tu cotización gratis",
  lead: "Cuéntanos de tu casa o negocio y te respondemos pronto.",
  addressLabel: "Dirección",
  address: ["608 Northwest 62nd Street", "Miami, Florida 33150"],
  emailLabel: "Correo",
  email: "alphaenergy789@gmail.com",
  phoneLabel: "Teléfono",
  phone: "Próximamente",
  hoursLabel: "Horario de atención",
  hours: [
    { day: "Lunes a sábado", time: "9:30 a. m. – 5:00 p. m." },
    { day: "Domingo", time: "Cerrado" },
  ],
  button: "Escribir por correo",
} as const;

export const FOOTER = {
  line: "Distribuidor autorizado Victron Energy · 608 NW 62nd St, Miami, FL 33150",
  copyright: "© 2026 AlphaEnergi",
} as const;
