import Image from "next/image";
import { ScrollAnimatedSection } from "@/components/sections/ScrollAnimatedSection";
import { ValuePillar } from "@/components/ui/ValuePillar";
import { VALUE_PILLARS } from "@/lib/content";

export function ValueSection() {
  return (
    <ScrollAnimatedSection
      id="value"
      background={
        <Image
          src="/images/value-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      }
    >
      <div className="mx-auto w-full max-w-[1920px] px-6 py-12 md:px-12 md:py-16 lg:px-[71px]">
        <header className="mx-auto mb-12 max-w-5xl text-center text-white md:mb-20 lg:mb-24">
          <h2 className="text-5xl font-medium md:text-7xl lg:text-[80px]">
            Value Section
          </h2>
          <p className="mt-6 text-2xl font-medium md:text-3xl lg:text-[40px]">
            Invisible Technology, Visible Impact
          </p>
          <p className="mt-4 text-lg md:text-2xl">보이지 않는 기술, 분명한 영향력</p>
        </header>

        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-9">
          {VALUE_PILLARS.map((pillar) => (
            <ValuePillar
              key={pillar.title}
              title={pillar.title}
              description={pillar.description}
              iconSrc={pillar.icon}
            />
          ))}
        </div>
      </div>
    </ScrollAnimatedSection>
  );
}
