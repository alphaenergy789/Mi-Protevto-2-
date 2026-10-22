import { Header } from "@/components/sections/Header";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { BACKGROUNDS } from "@/lib/content";
import { sectionsIn } from "@/sections";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        {sectionsIn(undefined).map(({ id, Component }) => (
          <Component key={id} />
        ))}
        <div className="relative isolate">
          <SectionBackdrop layers={BACKGROUNDS.body} className="-z-10" />
          {sectionsIn("body").map(({ id, Component }) => (
            <Component key={id} />
          ))}
        </div>
      </main>
    </>
  );
}
