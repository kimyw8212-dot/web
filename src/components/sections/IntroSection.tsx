"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  getContentMotionStyle,
  getSectionVisibility,
  useSectionScrollProgress,
} from "@/hooks/useSectionScrollProgress";

/** Figma 02_Intro (1920 기준) */
const FIGMA = {
  paddingLeft: 243,
  paddingRight: 177,
  imageWidth: 381,
  imageHeight: 414,
  imageRadius: 36,
  columnGap: 118,
  headingSize: 128,
  headingLineHeight: 1.2035,
  bodySize: 32,
  titleToRow: 21,
  bodyTopGap: 65,
} as const;

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionScrollProgress(sectionRef);
  const contentStyle = getContentMotionStyle(progress, 48, 90);
  const sectionFade = getSectionVisibility(progress);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="snap-section relative z-10 h-[100dvh] shrink-0 overflow-hidden bg-white"
      style={{ opacity: sectionFade }}
    >
      <div
        className="mx-auto flex h-full w-full max-w-[1920px] flex-col justify-center"
        style={{
          ...contentStyle,
          paddingLeft: `clamp(1.5rem, ${(FIGMA.paddingLeft / 1920) * 100}vw, ${FIGMA.paddingLeft}px)`,
          paddingRight: `clamp(1.5rem, ${(FIGMA.paddingRight / 1920) * 100}vw, ${FIGMA.paddingRight}px)`,
        }}
      >
        {/* 2:36 — 좌측 정렬, 이미지와 동일한 시작 위치의 단독 행 */}
        <p
          className="font-semibold text-black"
          style={{
            fontSize: `clamp(2.25rem, ${(FIGMA.headingSize / 1920) * 100}vw, ${FIGMA.headingSize}px)`,
            lineHeight: FIGMA.headingLineHeight,
          }}
        >
          Where Circuits Think
        </p>

        {/* 이미지 + with technology / of structure / 본문 */}
        <div
          className="flex w-full flex-col lg:flex-row lg:items-start"
          style={{
            marginTop: `clamp(2rem, ${(FIGMA.titleToRow / 1920) * 100}vw, ${FIGMA.titleToRow}px)`,
            gap: `clamp(1.5rem, ${(FIGMA.columnGap / 1920) * 100}vw, ${FIGMA.columnGap}px)`,
          }}
        >
          <div
            className="relative mx-auto aspect-[381/414] w-full max-w-[381px] shrink-0 overflow-hidden rounded-[36px] lg:mx-0 lg:mt-[36px] lg:w-[clamp(280px,19.8438vw,381px)]"
          >
            <Image
              src="/images/sup img.png"
              alt="회로 구조 일러스트"
              fill
              className="object-cover object-bottom"
              sizes={`(max-width: 1024px) 90vw, ${FIGMA.imageWidth}px`}
              priority
            />
          </div>

          <div className="min-w-0 flex-1 text-left text-black">
            <div
              className="font-semibold"
              style={{
                fontSize: `clamp(2.25rem, ${(FIGMA.headingSize / 1920) * 100}vw, ${FIGMA.headingSize}px)`,
                lineHeight: FIGMA.headingLineHeight,
              }}
            >
              <p>with technology</p>
              <p>of structure</p>
            </div>

            <div
              className="max-w-[1322px] font-normal leading-normal"
              style={{
                marginTop: `clamp(1.25rem, ${(FIGMA.bodyTopGap / 1920) * 100}vw, ${FIGMA.bodyTopGap}px)`,
                fontSize: `clamp(1rem, ${(FIGMA.bodySize / 1920) * 100}vw, ${FIGMA.bodySize}px)`,
              }}
            >
              <p>보이지 않는 세계를 설계합니다.</p>
              <p>생각을 구조로 바꾸고, 구조를 기술로 완성합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
