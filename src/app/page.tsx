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
import { About } from "@/components/About";
import { ProfileCard } from "@/components/ProfileCard";
import { ToBeContinued } from "@/components/ToBeContinued";
import { OraOra } from "@/components/OraOra";
import { Menacing } from "@/components/Menacing";
import { ItemObtained } from "@/components/ItemObtained";
import { HadesDialogue } from "@/components/HadesDialogue";

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
      <ProfileCard />
      <ToBeContinued />
      <OraOra />
      <Menacing />
      <ItemObtained />
      <HadesDialogue />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Accolades />
        <Stats />
        <SectionCut />
        <About />
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
