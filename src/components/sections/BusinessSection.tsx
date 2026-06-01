import Image from "next/image";
import { BusinessCarousel } from "@/components/sections/BusinessCarousel";
import { ScrollAnimatedSection } from "@/components/sections/ScrollAnimatedSection";

export function BusinessSection() {
  return (
    <ScrollAnimatedSection
      id="business"
      background={
        <Image
          src="/images/business-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      }
    >
      <div className="mx-auto w-full max-w-[1920px] px-6 py-12 md:px-12 md:py-16 lg:px-24">
        <h2 className="mb-12 text-center text-5xl font-bold text-white md:mb-16 md:text-7xl lg:text-[80px]">
          Business
        </h2>
        <BusinessCarousel />
      </div>
    </ScrollAnimatedSection>
  );
}
