"use client";

import { useRef } from "react";
import { NewsCard } from "@/components/ui/NewsCard";
import { NEWS_ITEMS } from "@/lib/content";
import {
  getContentMotionStyle,
  getSectionVisibility,
  useSectionScrollProgress,
} from "@/hooks/useSectionScrollProgress";

export function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionScrollProgress(sectionRef);
  const contentStyle = getContentMotionStyle(progress);
  const sectionFade = getSectionVisibility(progress);

  return (
    <section
      ref={sectionRef}
      id="press"
      className="snap-section relative z-10 flex h-[100dvh] shrink-0 flex-col justify-center bg-white py-16 md:py-24"
      style={{ opacity: sectionFade }}
    >
      <div
        className="mx-auto w-full max-w-[1920px] px-6 md:px-12 lg:px-[106px]"
        style={contentStyle}
      >
        <h2 className="mb-10 text-5xl font-bold text-black md:mb-14 md:text-7xl lg:text-[80px]">
          NEWS
        </h2>

        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          {NEWS_ITEMS.map((item, index) => (
            <NewsCard key={`${item.title}-${index}`} title={item.title} date={item.date} />
          ))}
        </div>
      </div>
    </section>
  );
}
