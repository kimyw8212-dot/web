"use client";

import { useRef, type ReactNode } from "react";
import {
  getBackgroundScaleOnly,
  getSectionMotionStyle,
  useSectionScrollProgress,
} from "@/hooks/useSectionScrollProgress";
import {
  SECTION_BACKGROUND_SCALE,
  SECTION_IMAGE_OVERLAY,
} from "@/lib/section-motion";

type ScrollAnimatedSectionProps = {
  id: string;
  className?: string;
  snapClass?: string;
  background?: ReactNode;
  overlay?: ReactNode;
  children: ReactNode;
  backgroundScale?: number;
};

const defaultOverlay = <div className={SECTION_IMAGE_OVERLAY} />;

export function ScrollAnimatedSection({
  id,
  className = "",
  snapClass = "snap-section",
  background,
  overlay = defaultOverlay,
  children,
  backgroundScale = SECTION_BACKGROUND_SCALE,
}: ScrollAnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionScrollProgress(sectionRef);
  const motionStyle = getSectionMotionStyle(progress);
  const bgScaleStyle = getBackgroundScaleOnly(progress, backgroundScale);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${snapClass} relative h-[100dvh] w-full shrink-0 overflow-hidden bg-black ${className}`}
    >
      <div className="absolute inset-0" style={motionStyle}>
        {background && (
          <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
            <div className="absolute inset-0 h-full w-full" style={bgScaleStyle}>
              {background}
            </div>
          </div>
        )}

        {overlay}

        <div className="relative z-10 flex h-full w-full items-center overflow-hidden">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </section>
  );
}
