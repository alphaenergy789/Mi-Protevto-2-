import type { Metadata, Viewport } from "next";
import { Anybody, Figtree } from "next/font/google";
import "./globals.css";

/* Anybody (ancho variable) hace de stand-in de "Normalidad Ultra Extended". */
const anybody = Anybody({ subsets: ["latin"], variable: "--font-anybody", axes: ["wdth"], display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  title: "AlphaEnergi · Energía solar y Victron Energy en Miami",
  description: "Distribuidor autorizado de Victron Energy en Miami, Florida. Sistemas solares, inversores y baterías.",
  icons: { icon: "/logo.png" },
};
export const viewport: Viewport = { themeColor: "#0b3a9e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anybody.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
