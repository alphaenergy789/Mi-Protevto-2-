import type { NextConfig } from "next";

/* `EXPORT=1 npm run build` genera una carpeta `out/` de HTML estático (para subir a cualquier hosting). */
const nextConfig: NextConfig = {
  ...(process.env.EXPORT ? { output: "export" as const, images: { unoptimized: true } } : {}),
};

export default nextConfig;
