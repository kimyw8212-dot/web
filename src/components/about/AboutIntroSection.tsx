"use client";

import { useRef } from "react";
import {
  getContentMotionStyle,
  getSectionVisibility,
  useSectionScrollProgress,
} from "@/hooks/useSectionScrollProgress";

/** Figma 02_Intro (About, 1920 기준) */
const FIGMA = {
  padding: 311,
  headingSize: 128,
  headingLineHeight: 1.2035,
  videoTopGap: 63,
  bodyTopGap: 31,
  bodySize: 32,
} as const;

export function AboutIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionScrollProgress(sectionRef);
  const contentStyle = getContentMotionStyle(progress, 48, 90);
  const sectionFade = getSectionVisibility(progress);

  return (
    <section
      ref={sectionRef}
      id="about-intro"
      className="snap-section relative z-10 h-[100dvh] shrink-0 overflow-hidden bg-white"
      style={{ opacity: sectionFade }}
    >
      <div
        className="mx-auto flex h-full w-full max-w-[1920px] flex-col justify-center"
        style={{
          ...contentStyle,
          paddingLeft: `clamp(1.5rem, ${(FIGMA.padding / 1920) * 100}vw, ${FIGMA.padding}px)`,
          paddingRight: `clamp(1.5rem, ${(FIGMA.padding / 1920) * 100}vw, ${FIGMA.padding}px)`,
        }}
      >
        <p
          className="w-full text-right font-semibold text-black"
          style={{
            fontSize: `clamp(2.25rem, ${(FIGMA.headingSize / 1920) * 100}vw, ${FIGMA.headingSize}px)`,
            lineHeight: FIGMA.headingLineHeight,
          }}
        >
          Where Circuits Think
        </p>

        <div
          className="relative w-full aspect-[1298/414] overflow-hidden rounded-[36px]"
          style={{
            marginTop: `clamp(1.5rem, ${(FIGMA.videoTopGap / 1920) * 100}vw, ${FIGMA.videoTopGap}px)`,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/about sub.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          className="font-normal leading-normal text-black"
          style={{
            marginTop: `clamp(1rem, ${(FIGMA.bodyTopGap / 1920) * 100}vw, ${FIGMA.bodyTopGap}px)`,
            fontSize: `clamp(1rem, ${(FIGMA.bodySize / 1920) * 100}vw, ${FIGMA.bodySize}px)`,
          }}
        >
          <p>보이지 않는 세계를 설계합니다.</p>
          <p>생각을 구조로 바꾸고, 구조를 기술로 완성합니다.</p>
        </div>
      </div>
    </section>
  );
}
