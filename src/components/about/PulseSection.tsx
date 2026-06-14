"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  getCardRiseStyle,
  getContentMotionStyle,
  getSectionVisibility,
  useSectionScrollProgress,
} from "@/hooks/useSectionScrollProgress";
import { PULSE_CARDS, PULSE_SECTION_CONTENT } from "@/lib/content";

type PulseSectionProps = {
  id: string;
};

const CARD_STAGGER_MS = 150;

export function PulseSection({ id }: PulseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionScrollProgress(sectionRef);
  const contentStyle = getContentMotionStyle(progress);
  const sectionFade = getSectionVisibility(progress);
  const cards = PULSE_CARDS;

  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    if (progress.enter >= 0.98 && !hasArrived) {
      setHasArrived(true);
    } else if (progress.enter < 0.98 && hasArrived) {
      setHasArrived(false);
    }
  }, [progress.enter, hasArrived]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="snap-section relative z-10 h-[100dvh] shrink-0 overflow-hidden bg-black text-white"
      style={{ opacity: sectionFade }}
    >
      <div
        className="mx-auto flex h-full w-full max-w-[1920px] flex-col justify-center gap-10 px-6 py-16 md:flex-row md:items-center md:gap-12 md:px-12 lg:gap-[5.99%] lg:px-[5.89%]"
        style={contentStyle}
      >
        <div className="flex max-w-2xl shrink-0 flex-col gap-6 md:gap-8 lg:w-[30.78%] lg:max-w-none">
          <div>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-[64px]">
              {PULSE_SECTION_CONTENT.title}
            </h2>
            <div className="mt-4 space-y-1 text-lg md:text-xl lg:text-[24px]">
              {PULSE_SECTION_CONTENT.description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="relative aspect-[591/612] w-full max-w-[420px] md:max-w-none">
            <Image
              src={PULSE_SECTION_CONTENT.image}
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 70vw, 591px"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 sm:gap-5 lg:w-[43.07%] lg:gap-[2.14vw]">
          {cards.map((card, index) => {
            const riseStyle = getCardRiseStyle(hasArrived, index * CARD_STAGGER_MS);

            return (
              <div
                key={card.title}
                style={riseStyle}
                className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-5 sm:gap-4 md:gap-5 md:px-8 lg:h-[8.4375vw] lg:max-h-[162px] lg:px-[1.82%]"
              >
                <span
                  className="flex shrink-0 self-stretch items-center justify-center font-extralight leading-none"
                  style={{
                    color: "#004c91",
                    fontSize: "clamp(2.5rem, 5vw, 96px)",
                    transform: "translateY(-0.12em)",
                  }}
                >
                  +
                </span>
                <span className="h-8 w-px shrink-0 bg-white/25 sm:h-10 lg:h-[57px]" />
                <span className="flex-1 text-center text-xl font-semibold sm:text-2xl md:text-3xl lg:text-[40px]">
                  {card.title}
                </span>
                <span className="h-8 w-px shrink-0 bg-white/25 sm:h-10 lg:h-[57px]" />
                <div className="w-[35%] shrink-0 text-xs leading-snug text-[#717171] sm:text-sm md:w-[200px] md:text-base">
                  {card.description.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
