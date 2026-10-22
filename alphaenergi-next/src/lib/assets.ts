/* Todas las imágenes salen de acá. Para alojarlas en otro lado (por ejemplo un bucket),
   definí NEXT_PUBLIC_ASSET_BASE; sin eso se leen de la carpeta `public/`. */
const BASE = (process.env.NEXT_PUBLIC_ASSET_BASE ?? "").replace(/\/+$/, "");
export const asset = (path: string) => `${BASE}${path}`;

/* Máscara del anillo de la "pastilla" (EFFECT-09). Va EMBEBIDA como data: URI a propósito:
   Chrome ignora en silencio un mask-image SVG de otro origen. No la muevas a MEDIA. */
export const PILL_MASK =
  "data:image/svg+xml,%3Csvg preserveAspectRatio='none' overflow='visible' width='548.604' height='115.93' viewBox='0 0 548.604 115.93' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10.5' y='10.5' width='527.604' height='94.9297' rx='44.5' stroke='white' stroke-width='21'/%3E%3C/svg%3E";
