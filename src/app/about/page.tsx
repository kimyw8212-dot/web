import { SectionWheelSnap } from "@/components/SectionWheelSnap";
import { Footer } from "@/components/layout/Footer";
import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { AboutIntroSection } from "@/components/about/AboutIntroSection";
import { TechShowcaseSection } from "@/components/about/TechShowcaseSection";
import { PulseSection } from "@/components/about/PulseSection";

export default function AboutPage() {
  return (
    <>
      <SectionWheelSnap />
      <AboutHeroSection />
      <main className="relative z-10 flex flex-col bg-black">
        <AboutIntroSection />
        <TechShowcaseSection
          id="connectivity"
          step="01/03"
          title="CONNECTIVITY"
          description={["Precision", "Advanced Semiconductor Engineering"]}
          model="/models/connectivity.glb"
          modelBox={{ width: 1050, height: 700, centerX: 969, centerY: 603 }}
          initialRotation={{ x: -30, y: 20 }}
          nextSectionId="intelligence"
        />
        <TechShowcaseSection
          id="intelligence"
          step="02/03"
          title="INTELLIGENCE"
          description={["Precision", "Advanced Semiconductor Engineering"]}
          model="/models/intelligence.glb"
          modelBox={{ width: 900, height: 600, centerX: 981, centerY: 582.5 }}
          initialRotation={{ x: -20, y: -30 }}
          nextSectionId="company-message"
        />
        <TechShowcaseSection
          id="company-message"
          step="03/04"
          title="COMPANY MESSAGE"
          description={["Precision", "Advanced Semiconductor Engineering"]}
          model="/models/company-message.glb"
          modelBox={{ width: 750, height: 500, centerX: 960, centerY: 579 }}
          initialRotation={{ x: 22, y: 18 }}
          nextSectionId="mobility"
        />
        <TechShowcaseSection
          id="mobility"
          step="04/04"
          title="MOBILITY"
          description={["Precision", "Advanced Semiconductor Engineering"]}
          model="/models/mobility.glb"
          modelBox={{ width: 1800, height: 1200, centerX: 987.5, centerY: 567 }}
          initialRotation={{ x: 6, y: 45 }}
          nextSectionId="pulse"
        />
        <PulseSection id="pulse" />
      </main>
      <Footer />
    </>
  );
}
