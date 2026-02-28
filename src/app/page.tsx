import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Accolades } from "@/components/Accolades";
import { Stats } from "@/components/Stats";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { ShinboEffects } from "@/components/ShinboEffects";
import { RedThread } from "@/components/RedThread";
import { EntranceSequence } from "@/components/EntranceSequence";
import { SectionCut } from "@/components/SectionCut";
import { CursorTrail } from "@/components/CursorTrail";
import { ScrollParallax } from "@/components/ScrollParallax";
import { FilmGrain } from "@/components/FilmGrain";
import { KonamiEgg } from "@/components/KonamiEgg";

export default function Home() {
  return (
    <>
      <EntranceSequence />
      <ShinboEffects />
      <ScrollParallax />
      <FilmGrain />
      <CursorTrail />
      <RedThread />
      <KonamiEgg />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Accolades />
        <Stats />
        <SectionCut />
        <Experience />
        <SectionCut />
        <Projects />
        <SectionCut />
        <Skills />
        <SectionCut />
        <Contact />
      </main>
    </>
  );
}
