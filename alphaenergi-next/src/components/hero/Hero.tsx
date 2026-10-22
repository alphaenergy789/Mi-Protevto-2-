import { HeroDesktop } from "@/components/hero/HeroDesktop";
import { HeroMobile } from "@/components/hero/HeroMobile";

/* Las dos variantes están SIEMPRE montadas y se alternan con CSS (md:block / md:hidden).
   No hay matchMedia ni useEffect para elegir: ambos árboles hidratan igual en servidor y cliente. */
export function Hero() {
  return (
    <section id="home">
      <HeroDesktop />
      <HeroMobile />
    </section>
  );
}
