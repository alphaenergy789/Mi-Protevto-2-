/* ══════════════════════════════════════════════════════════════════
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITÁS TOCAR.

   Acá viven los textos (en español y en inglés), las imágenes y los
   fondos de todo el sitio. Los colores y las tipografías están aparte,
   en `src/app/globals.css`, arriba de todo.

   Si cambiás algo acá, cambia en todas las pantallas a la vez
   (computadora y celular). No hace falta buscarlo en ningún otro lado.
   ══════════════════════════════════════════════════════════════════ */
import { asset } from "@/lib/assets";
import type { Layer } from "@/components/ui/SectionBackdrop";

/* ─────────────── 1. IMÁGENES Y VIDEOS ───────────────
   Cambiá una dirección acá y cambia en todos los lugares donde se use.
   Pegá la dirección completa entre las comillas. */
export const MEDIA = {
  /** El logo de AlphaEnergi. Se usa en la barra, en el centro del hero y en el pie. */
  logomark: asset("/logo.png"),
} as const;

/* ─────────────── 2. DATOS DEL NEGOCIO ─────────────── */
export const BUSINESS = {
  email: "alphaenergy789@gmail.com",
  addressLines: ["608 Northwest 62nd Street", "Miami, Florida 33150"],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=608+NW+62nd+St+Miami+FL+33150",
  /** Cuando tengas el teléfono, escribilo acá (ej. "+1 305 000 0000"). Mientras sea null se muestra "Próximamente". */
  phone: null as string | null,
  /** Horario en hora de Miami: de lunes a sábado, de 9:30 a 17:00. El domingo cerrado. */
  openFrom: 9 * 60 + 30,
  openTo: 17 * 60,
} as const;

/* ─────────────── 3. FONDOS DE CADA SECCIÓN ───────────────
   Las capas se pintan de arriba hacia abajo: la PRIMERA de la lista queda más atrás.
   Para sacar una capa, borrá su línea.
   Para una foto de fondo:  hero: [{ type: "image", src: "https://tu-foto.jpg" }],
   Tipos: "image" · "video" · "color" · "gradient" · "veil" · "grain" · "vignette". */
export const BACKGROUNDS: Record<string, Layer[]> = {
  /** Hero en computadora: blanco arriba que se desvanece hacia azul, con la trama de puntos. */
  hero: [
    { type: "gradient", value: "linear-gradient(180deg, var(--hero-a) 0%, var(--hero-b) 34%, var(--hero-c) 66%, var(--hero-d) 100%)", parallax: 70 },
    { type: "gradient", value: "radial-gradient(circle, color-mix(in srgb, var(--color-deep) 24%, transparent) 1.5px, transparent 2px) 0 0 / 26px 26px", parallax: 40 },
    { type: "gradient", value: "radial-gradient(circle, rgba(255,255,255,0.34) 1.5px, transparent 2px) 13px 13px / 26px 26px", blend: "screen", parallax: 40 },
  ],

  /** Hero en celular. */
  heroMobile: [
    { type: "gradient", value: "linear-gradient(180deg, var(--hero-a) 0%, var(--hero-b) 30%, var(--hero-c) 62%, var(--hero-d) 100%)" },
    { type: "gradient", value: "radial-gradient(circle, color-mix(in srgb, var(--color-deep) 24%, transparent) 1.3px, transparent 1.8px) 0 0 / 22px 22px" },
    { type: "gradient", value: "radial-gradient(circle, rgba(255,255,255,0.34) 1.3px, transparent 1.8px) 11px 11px / 22px 22px", blend: "screen" },
  ],

  /** Fondo de todo lo que viene después del hero. */
  body: [{ type: "gradient", value: "linear-gradient(180deg, var(--bg) 0px, var(--bg) 1400px, var(--bg-2) 100%)" }],
};

/* ─────────────── 4. TEXTOS ───────────────
   Cada texto está dos veces: `es` y `en`. Si cambiás uno, cambiá el otro. */
const ES = {
  nav: [
    { id: "home", label: "Inicio" },
    { id: "about", label: "Nosotros" },
    { id: "services", label: "Servicios" },
    { id: "products", label: "Equipos" },
    { id: "calculator", label: "Calculadora" },
    { id: "contact", label: "Contacto" },
  ],
  ui: { menu: "Menú", close: "Cerrar", quote: "Cotizar gratis", langAria: "Cambiar idioma", themeAria: "Cambiar tema", top: "Volver arriba", openNow: "Abierto ahora", closedNow: "Cerrado ahora" },
  hero: {
    brand: "AlphaEnergi",
    srTitle: "AlphaEnergi — Energía solar y respaldo para tu hogar en Miami, Florida.",
    /* ⚠ ZONA DIFÍCIL — el título grande está partido en pedazos colocados a mano. Mirá "Lo que NO es fácil" en EDITAR.md. */
    brandParts: { alpha: "Alpha", ener: "Ener", gi: "gi" },
    tagline: [["Energía", "solar."], ["Respaldo", "Victron."]],
    buttons: [
      { label: "Pedir cotización", href: "#contact", style: "solid" },
      { label: "Nuestros servicios", href: "#services", style: "ghost" },
    ],
    body: "Instalaciones solares eficientes y sostenibles en Miami, con inversores, controladores y baterías Victron Energy.",
    stats: [
      { value: 6, label: "Días de atención" },
      { value: 7, label: "Líneas Victron" },
    ],
  },
  marquee: ["Energía solar", "Distribuidor autorizado Victron Energy", "Respaldo con baterías", "Miami, Florida", "Mantenimiento"],
  about: {
    kicker: "Nosotros",
    title: "Energía propia, sin complicaciones",
    lead: "Somos distribuidores autorizados de Victron Energy en Miami. Te acompañamos desde el cálculo del sistema hasta que está funcionando.",
    pillars: [
      { title: "Diseño", body: "Dimensionamos el sistema según tu consumo real y el espacio de tu techo." },
      { title: "Instalación", body: "Equipos Victron instalados y puestos en marcha por nuestro equipo." },
      { title: "Respaldo", body: "Baterías para seguir con luz cuando falla la red." },
    ],
    badgeTitle: "Distribuidor autorizado",
    badgeBody: "Victron Energy",
    hours: "Lunes a sábado · 9:30 a. m. – 5:00 p. m.",
  },
  services: {
    kicker: "Servicios",
    title: "Todo para pasarte a la energía solar",
    lead: "Diseñamos, instalamos y cuidamos tu sistema.",
    filterLabel: "Filtrar servicios",
    filters: [
      { id: "all", label: "Todos" },
      { id: "home", label: "Hogar" },
      { id: "business", label: "Negocio" },
      { id: "backup", label: "Respaldo" },
    ],
    announce: (n: number, f: string) => `${n} servicios visibles en la categoría ${f}.`,
    items: [
      { title: "Solar residencial", body: "Paneles en el techo de tu casa, dimensionados según tu consumo.", tags: ["home"] },
      { title: "Solar comercial", body: "Reduce los costos de tu negocio con generación propia.", tags: ["business"] },
      { title: "Baterías y respaldo", body: "Energía para la noche y para cuando falla la red.", tags: ["home", "business", "backup"] },
      { title: "Sistemas aislados de la red", body: "Energía donde no llega la compañía eléctrica o donde quieres independencia.", tags: ["backup"] },
      { title: "Monitoreo remoto", body: "Mira cómo rinde tu sistema desde el teléfono con el portal VRM.", tags: ["home", "business"] },
      { title: "Mantenimiento", body: "Revisión y monitoreo para que tu sistema rinda al máximo.", tags: ["home", "business"] },
    ],
  },
  products: {
    kicker: "Equipos",
    title: "Tecnología Victron Energy, de principio a fin",
    lead: "Somos distribuidores autorizados. Estas son las líneas con las que trabajamos.",
    filterLabel: "Filtrar equipos",
    filters: [
      { id: "all", label: "Todos" },
      { id: "inverter", label: "Inversores" },
      { id: "solar", label: "Solar" },
      { id: "battery", label: "Baterías" },
      { id: "monitor", label: "Monitoreo" },
    ],
    announce: (n: number, f: string) => `${n} equipos visibles en la categoría ${f}.`,
    items: [
      { name: "MultiPlus-II", body: "Inversor y cargador en un solo equipo.", tag: "inverter" },
      { name: "Quattro", body: "Inversor y cargador con dos entradas de corriente alterna, por ejemplo red y generador.", tag: "inverter" },
      { name: "SmartSolar MPPT", body: "Controladores de carga solar con seguimiento del punto de máxima potencia.", tag: "solar" },
      { name: "Orion XS", body: "Convertidor y cargador de corriente continua para baterías.", tag: "battery" },
      { name: "SmartShunt", body: "Monitor de batería: voltaje, corriente y estado de carga.", tag: "monitor" },
      { name: "Cerbo GX", body: "Centro de control y comunicación de todo el sistema.", tag: "monitor" },
      { name: "VRM", body: "Portal de monitoreo remoto de Victron.", tag: "monitor" },
    ],
    flowTitle: "Así viaja la energía en un sistema Victron",
    flow: [
      { title: "Paneles solares", body: "Captan la luz del sol" },
      { title: "MPPT", body: "Controlador de carga" },
      { title: "Batería", body: "Guarda la energía" },
      { title: "Inversor", body: "Convierte a corriente alterna" },
      { title: "Tu casa", body: "Luz propia, también sin red" },
    ],
  },
  process: {
    kicker: "Cómo trabajamos",
    title: "De la visita a la primera factura baja",
    lead: "Cuatro pasos claros y sin sorpresas.",
    steps: [
      { title: "Visita y análisis", body: "Revisamos tu techo y tu factura de luz." },
      { title: "Diseño y propuesta", body: "Te presentamos el sistema, el costo y el ahorro estimado." },
      { title: "Permisos", body: "Gestionamos los permisos del condado y de la compañía eléctrica." },
      { title: "Instalación", body: "Instalamos y activamos tu sistema." },
    ],
  },
  calc: {
    kicker: "Calculadora",
    title: "¿Cuánto podrías ahorrar?",
    lead: "Mueve el control con tu factura mensual de luz. Valores típicos de Miami para empezar.",
    bill: "Factura mensual de luz",
    offset: "Cuánto de tu consumo quieres cubrir",
    orient: "Orientación del techo",
    orients: [{ v: 1, l: "Sur" }, { v: 0.96, l: "Sureste / Suroeste" }, { v: 0.88, l: "Este / Oeste" }],
    shade: "Sombra",
    shades: [{ v: 1, l: "Casi nada" }, { v: 0.92, l: "Algo (árboles)" }, { v: 0.8, l: "Bastante" }],
    save1: "Ahorro estimado el primer año",
    payback: "Se paga en",
    years: "años",
    never: "más de 25 años",
    size: "Tamaño del sistema",
    panels: "Paneles",
    prod: "Producción al año",
    cost: "Inversión estimada",
    note: "Estimación orientativa, no es una oferta. Supone $0.15/kWh, $2.80 por watt instalado y paneles de 410 W. El resultado real depende de tu techo, tu consumo y la compañía eléctrica. No incluye incentivos.",
    cta: "Pedir cotización con estos datos",
    mailSubject: "Cotización solar",
    mailHead: "Hola, quiero una cotización con estos datos:",
  },
  contact: {
    kicker: "Contacto",
    title: "Pide tu cotización gratis",
    lead: "Cuéntanos de tu casa o negocio y te respondemos pronto.",
    name: "Nombre", phone: "Teléfono o WhatsApp", email: "Correo electrónico", msg: "Cuéntanos qué necesitas",
    typeLabel: "Tipo", types: ["Casa", "Negocio"],
    send: "Enviar por correo", sending: "Abriendo tu correo…",
    error: "Escribe un correo válido, por ejemplo nombre@dominio.com.",
    doneTitle: "Listo.",
    doneBody: (email: string) => `Se abrió tu programa de correo con el mensaje listo. Si no se abrió, escríbenos a ${email}.`,
    addressLabel: "Dirección", emailLabel: "Correo", phoneLabel: "Teléfono", phoneSoon: "Próximamente",
    hoursLabel: "Horario de atención", mf: "Lunes a sábado", sun: "Domingo", closed: "Cerrado", time: "9:30 a. m. – 5:00 p. m.",
    mailSubject: "Cotización solar", mailType: "Tipo", mailPhone: "Teléfono",
  },
  footer: { line: "Distribuidor autorizado Victron Energy", copyright: "© 2026 AlphaEnergi" },
};

export type Text = typeof ES;

const EN: Text = {
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "products", label: "Equipment" },
    { id: "calculator", label: "Calculator" },
    { id: "contact", label: "Contact" },
  ],
  ui: { menu: "Menu", close: "Close", quote: "Free quote", langAria: "Change language", themeAria: "Toggle theme", top: "Back to top", openNow: "Open now", closedNow: "Closed now" },
  hero: {
    brand: "AlphaEnergi",
    srTitle: "AlphaEnergi — Solar power and backup for your home in Miami, Florida.",
    brandParts: { alpha: "Alpha", ener: "Ener", gi: "gi" },
    tagline: [["Solar", "power."], ["Victron", "backup."]],
    buttons: [
      { label: "Get a quote", href: "#contact", style: "solid" },
      { label: "Our services", href: "#services", style: "ghost" },
    ],
    body: "Efficient, sustainable solar installations in Miami, with Victron Energy inverters, charge controllers and batteries.",
    stats: [
      { value: 6, label: "Days a week open" },
      { value: 7, label: "Victron lines" },
    ],
  },
  marquee: ["Solar power", "Authorized Victron Energy dealer", "Battery backup", "Miami, Florida", "Maintenance"],
  about: {
    kicker: "About us",
    title: "Your own energy, made simple",
    lead: "We are an authorized Victron Energy dealer in Miami. We guide you from sizing the system to the day it is running.",
    pillars: [
      { title: "Design", body: "We size the system to your real usage and your roof space." },
      { title: "Installation", body: "Victron equipment installed and commissioned by our team." },
      { title: "Backup", body: "Batteries to keep the lights on when the grid goes down." },
    ],
    badgeTitle: "Authorized dealer",
    badgeBody: "Victron Energy",
    hours: "Monday to Saturday · 9:30 AM – 5:00 PM",
  },
  services: {
    kicker: "Services",
    title: "Everything you need to go solar",
    lead: "We design, install and look after your system.",
    filterLabel: "Filter services",
    filters: [
      { id: "all", label: "All" },
      { id: "home", label: "Home" },
      { id: "business", label: "Business" },
      { id: "backup", label: "Backup" },
    ],
    announce: (n: number, f: string) => `${n} services shown in the ${f} category.`,
    items: [
      { title: "Residential solar", body: "Rooftop panels sized to your usage.", tags: ["home"] },
      { title: "Commercial solar", body: "Cut your business costs with your own generation.", tags: ["business"] },
      { title: "Batteries and backup", body: "Power for the night and for when the grid fails.", tags: ["home", "business", "backup"] },
      { title: "Off-grid systems", body: "Power where the utility does not reach, or where you want independence.", tags: ["backup"] },
      { title: "Remote monitoring", body: "Check how your system performs from your phone with the VRM portal.", tags: ["home", "business"] },
      { title: "Maintenance", body: "Inspection and monitoring so your system performs at its best.", tags: ["home", "business"] },
    ],
  },
  products: {
    kicker: "Equipment",
    title: "Victron Energy technology, end to end",
    lead: "We are an authorized dealer. These are the product lines we work with.",
    filterLabel: "Filter equipment",
    filters: [
      { id: "all", label: "All" },
      { id: "inverter", label: "Inverters" },
      { id: "solar", label: "Solar" },
      { id: "battery", label: "Batteries" },
      { id: "monitor", label: "Monitoring" },
    ],
    announce: (n: number, f: string) => `${n} products shown in the ${f} category.`,
    items: [
      { name: "MultiPlus-II", body: "Inverter and charger in a single unit.", tag: "inverter" },
      { name: "Quattro", body: "Inverter and charger with two AC inputs, for example grid and generator.", tag: "inverter" },
      { name: "SmartSolar MPPT", body: "Solar charge controllers with maximum power point tracking.", tag: "solar" },
      { name: "Orion XS", body: "DC-DC converter and battery charger.", tag: "battery" },
      { name: "SmartShunt", body: "Battery monitor: voltage, current and state of charge.", tag: "monitor" },
      { name: "Cerbo GX", body: "Control and communication hub for the whole system.", tag: "monitor" },
      { name: "VRM", body: "Victron remote monitoring portal.", tag: "monitor" },
    ],
    flowTitle: "How energy travels in a Victron system",
    flow: [
      { title: "Solar panels", body: "Capture sunlight" },
      { title: "MPPT", body: "Charge controller" },
      { title: "Battery", body: "Stores the energy" },
      { title: "Inverter", body: "Converts to AC power" },
      { title: "Your home", body: "Your own power, even off-grid" },
    ],
  },
  process: {
    kicker: "How we work",
    title: "From the site visit to your first lower bill",
    lead: "Four clear steps, no surprises.",
    steps: [
      { title: "Visit and analysis", body: "We review your roof and your power bill." },
      { title: "Design and proposal", body: "We present the system, the cost and the estimated savings." },
      { title: "Permits", body: "We handle county and utility permits." },
      { title: "Installation", body: "We install and activate your system." },
    ],
  },
  calc: {
    kicker: "Calculator",
    title: "How much could you save?",
    lead: "Move the slider to your monthly power bill. Typical Miami values to get started.",
    bill: "Monthly power bill",
    offset: "How much of your usage to cover",
    orient: "Roof orientation",
    orients: [{ v: 1, l: "South" }, { v: 0.96, l: "Southeast / Southwest" }, { v: 0.88, l: "East / West" }],
    shade: "Shade",
    shades: [{ v: 1, l: "Almost none" }, { v: 0.92, l: "Some (trees)" }, { v: 0.8, l: "A lot" }],
    save1: "Estimated first-year savings",
    payback: "Pays for itself in",
    years: "years",
    never: "over 25 years",
    size: "System size",
    panels: "Panels",
    prod: "Yearly production",
    cost: "Estimated investment",
    note: "Rough estimate, not an offer. Assumes $0.15/kWh, $2.80 per installed watt and 410 W panels. Actual results depend on your roof, your usage and your utility. Incentives are not included.",
    cta: "Request a quote with these numbers",
    mailSubject: "Solar quote",
    mailHead: "Hello, I would like a quote with these numbers:",
  },
  contact: {
    kicker: "Contact",
    title: "Request your free quote",
    lead: "Tell us about your home or business and we will get back to you soon.",
    name: "Name", phone: "Phone or WhatsApp", email: "Email", msg: "Tell us what you need",
    typeLabel: "Type", types: ["Home", "Business"],
    send: "Send by email", sending: "Opening your email…",
    error: "Enter a valid email, for example name@domain.com.",
    doneTitle: "Done.",
    doneBody: (email: string) => `Your email app opened with the message ready. If it did not, write to us at ${email}.`,
    addressLabel: "Address", emailLabel: "Email", phoneLabel: "Phone", phoneSoon: "Coming soon",
    hoursLabel: "Business hours", mf: "Monday to Saturday", sun: "Sunday", closed: "Closed", time: "9:30 AM – 5:00 PM",
    mailSubject: "Solar quote", mailType: "Type", mailPhone: "Phone",
  },
  footer: { line: "Authorized Victron Energy dealer", copyright: "© 2026 AlphaEnergi" },
};

export type Lang = "es" | "en";
export const TEXT: Record<Lang, Text> = { es: ES, en: EN };
