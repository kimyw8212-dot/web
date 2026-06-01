import { SectionWheelSnap } from "@/components/SectionWheelSnap";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { BusinessSection } from "@/components/sections/BusinessSection";
import { ValueSection } from "@/components/sections/ValueSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { TECHNOLOGY_SECTIONS } from "@/lib/content";

export default function Home() {
  return (
    <>
      <SectionWheelSnap />
      <HeroSection />
      <main className="relative z-10 flex flex-col bg-black">
        <IntroSection />
        {TECHNOLOGY_SECTIONS.map((section) => (
          <TechnologySection key={section.id} {...section} />
        ))}
        <BusinessSection />
        <ValueSection />
        <PartnersSection />
        <NewsSection />
      </main>
      <Footer />
    </>
  );
}
