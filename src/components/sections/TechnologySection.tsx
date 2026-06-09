import Image from "next/image";
import { ScrollAnimatedSection } from "@/components/sections/ScrollAnimatedSection";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { ViewMoreButton } from "@/components/ui/ViewMoreButton";

type TechnologySectionProps = {
  id: string;
  title: string;
  description: readonly string[];
  image: string;
  video?: string;
  activeStep: 1 | 2 | 3;
  nextSectionId: string;
};

export function TechnologySection({
  id,
  title,
  description,
  image,
  video,
  activeStep,
  nextSectionId,
}: TechnologySectionProps) {
  return (
    <ScrollAnimatedSection
      id={id}
      background={
        video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={id === "soc"}
          />
        )
      }
    >
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-6 py-20 md:flex-row md:items-center md:gap-16 md:px-12 md:py-28 lg:gap-[125px] lg:px-24">
        <StepIndicator activeStep={activeStep} />

        <div className="max-w-4xl text-white">
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl lg:text-[96px]">
            {title}
          </h2>
          <div className="mt-6 space-y-1 text-lg font-medium leading-relaxed md:mt-8 md:text-2xl">
            {description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-8 md:mt-10">
            <ViewMoreButton targetSectionId={nextSectionId} />
          </div>
        </div>
      </div>
    </ScrollAnimatedSection>
  );
}
