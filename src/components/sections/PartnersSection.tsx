"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  getContentMotionStyle,
  getSectionVisibility,
  useSectionScrollProgress,
} from "@/hooks/useSectionScrollProgress";

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionScrollProgress(sectionRef);
  const contentStyle = getContentMotionStyle(progress);
  const sectionFade = getSectionVisibility(progress);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="snap-section relative z-10 flex h-[100dvh] shrink-0 flex-col justify-center bg-black py-16 text-white md:py-24"
      style={{ opacity: sectionFade }}
    >
      <div
        className="mx-auto w-full max-w-[1920px] px-6 md:px-12 lg:px-[74px]"
        style={contentStyle}
      >
        <header className="mx-auto mb-10 max-w-4xl text-center md:mb-14">
          <h2 className="text-5xl font-medium md:text-7xl lg:text-[80px]">PARTNERS</h2>
          <p className="mt-6 text-2xl font-semibold md:text-3xl lg:text-[40px]">
            Global Partners, Reliable Solutions
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/90 md:text-2xl">
            설계부터 생산까지 연결되는 글로벌 파트너 네트워크를 기반으로
            <br className="hidden sm:block" />
            안정적인 반도체 개발과 양산 프로세스를 지원합니다.
          </p>
        </header>

        <div className="relative mx-auto aspect-[1693/952] w-full max-w-[1693px]">
          <Image
            src="/images/partners.png"
            alt="글로벌 파트너 네트워크"
            fill
            className="object-contain"
            sizes="(max-width: 1920px) 100vw, 1693px"
          />
        </div>
      </div>
    </section>
  );
}
