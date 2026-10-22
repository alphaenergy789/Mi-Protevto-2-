# AlphaEnergi — estado del proyecto

Última actualización: 22 oct 2026. Léelo primero al retomar el trabajo.

## Qué es
Sitio web nuevo para **AlphaEnergi** (alphaenergi.com), distribuidor autorizado de **Victron Energy** en Miami, Florida. Hoy el dominio está en GoDaddy y el sitio actual está hecho con Airo (el creador de IA de GoDaddy).

## Datos del negocio (reales, dados por el dueño)
- Dirección: 608 Northwest 62nd Street, Miami, Florida 33150
- Correo: alphaenergy789@gmail.com
- Horario: lunes a sábado, 9:30 a. m. – 5:00 p. m. (domingo cerrado)
- Idiomas: español e inglés, con botón para cambiar
- Temas: claro y oscuro, con botón
- Teléfono: **pendiente** (hoy dice "Próximamente"; se pone en `BUSINESS.phone` de `content.ts`)
- Logo: `alphaenergi-next/public/logo.png` (PNG transparente hecho a partir del original)

## Dónde está cada cosa
| Carpeta | Qué es | Estado |
| --- | --- | --- |
| `alphaenergi-next/` | **La versión principal.** Next.js 15 + React 19 + Tailwind v4 + Framer Motion 12, hecha con el prompt de ProGravity adaptado. | Activa |
| `alphaenergi/` | Versión anterior en HTML simple (inicio + calculadora completa). | Referencia |
| `index.html` (raíz) | Primera demo genérica de paneles solares. | Descartable |
| `.agents/`, `.claude/`, `skills-lock.json` | Skill de diseño `emil-design-eng` (Emil Kowalski). | Instalada |

## La versión principal (`alphaenergi-next/`)
- Guías: `EDITAR.md` (para el dueño, en español), `AGENTS.md` / `CLAUDE.md` (reglas para la IA).
- Todo el contenido (textos ES/EN, fondos, datos de contacto) está en **`src/lib/content.ts`**; los colores y temas en `src/app/globals.css`; las secciones en `src/sections.ts`.
- Hero: blanco que se desvanece a azul con trama de puntos (estilo Victron), título partido en piezas con el logo en el centro, y flujos de energía animados.
- Secciones: Nosotros, Servicios (filtro), Equipos Victron (filtro + diagrama de flujo), Proceso, Calculadora, Contacto (formulario → abre el correo), pie, menú móvil.
- Comandos: `npm install`, `npm run dev`; para HTML estático: `EXPORT=1 npm run build` (genera `out/`).

## Vistas previas (enlaces privados de Claude, solo con la cuenta del dueño)
- Versión principal: https://claude.ai/artifact/2amYAM5xq43fwSK3rNDLGY
- Versión HTML simple + calculadora: https://claude.ai/artifact/MLrHyrck8fHJFHovp1B8Rd
Para que un enlace sea público hay que publicarlo en un hosting (ver pendientes).

## Decisiones tomadas
- "Bigtron / VICTRONEnergy.com" = **Victron Energy**. Solo se toma su estilo visual como referencia; **no** se copian textos, imágenes ni su logo.
- No se inventaron testimonios, precios de planes ni personal. Las secciones del prompt original que necesitaban esos datos (instructores, galería, comunidad, membresía) se dejaron fuera.
- Los números del hero ("6 días de atención", "7 líneas Victron") salen de datos reales ya escritos en la página.
- La calculadora usa supuestos típicos de Miami (luz $0.15/kWh, $2.80/W instalado, panel 410 W, 1 500 kWh/kW al año). Sin incentivos. **Son supuestos míos: hay que reemplazarlos por los precios reales.**

## Pendientes
1. Teléfono (y botón de WhatsApp si lo quieren).
2. Fotos reales (de GoDaddy/Airo o de instalaciones propias) para una galería y para el hero.
3. Número de licencia de contratista de Florida, si lo tienen, para el pie de página.
4. Precios y supuestos reales de la calculadora.
5. Revisar en el teléfono la versión móvil completa y el formulario de contacto.
6. Revisar la redacción en inglés de todas las secciones.
7. **Publicación en `alphaenergi.com`:** el creador Airo no acepta HTML propio. Opción recomendada: GitHub Pages o Netlify con este repositorio, y en GoDaddy → DNS cambiar solo los registros `@` y `www` (sin tocar los MX, para no cortar el correo). Pendiente de decidir con el dueño. Para un enlace público de prueba falta activar GitHub Pages en la configuración del repositorio.
8. Opcional: activar protección de dominio en GoDaddy (hoy "Ninguno").

## Limitaciones del entorno de trabajo (para no repetir intentos)
- Esta sesión no tiene acceso a sitios externos: no se pudo abrir alphaenergi.com ni victronenergy.com. Para copiar el estilo de una página hay que pasar capturas.
- Fuentes de Google y npm sí funcionan.
