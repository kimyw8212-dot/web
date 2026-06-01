"use client";

import { TECHNOLOGY_STEP_TARGETS } from "@/lib/content";
import { scrollToSection } from "@/lib/scroll";

type StepIndicatorProps = {
  activeStep: 1 | 2 | 3;
};

const STEPS = [1, 2, 3] as const;

export function StepIndicator({ activeStep }: StepIndicatorProps) {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {STEPS.map((step) => {
        const isActive = step === activeStep;
        const targetId = TECHNOLOGY_STEP_TARGETS[step];

        return (
          <button
            key={step}
            type="button"
            aria-label={`${String(step).padStart(2, "0")}번 섹션으로 이동`}
            aria-current={isActive ? "step" : undefined}
            onClick={() => scrollToSection(targetId)}
            className={`flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-full text-2xl font-semibold transition-all duration-300 md:size-[66px] md:text-2xl ${
              isActive
                ? "bg-brand text-white scale-105"
                : "border border-white text-white hover:bg-white/15 hover:scale-105"
            }`}
          >
            {String(step).padStart(2, "0")}
          </button>
        );
      })}
    </div>
  );
}
