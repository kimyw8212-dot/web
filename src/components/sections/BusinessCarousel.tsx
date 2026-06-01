"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BusinessCard } from "@/components/ui/BusinessCard";
import { BUSINESS_CARDS } from "@/lib/content";

const CARD_COUNT = BUSINESS_CARDS.length;

export function BusinessCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, moved: false, startX: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const next = ((index % CARD_COUNT) + CARD_COUNT) % CARD_COUNT;
    const slide = track.children[next] as HTMLElement | undefined;
    slide?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setActiveIndex(next);
  }, []);

  const goNext = useCallback(() => scrollToIndex(activeIndex + 1), [activeIndex, scrollToIndex]);
  const goPrev = useCallback(() => scrollToIndex(activeIndex - 1), [activeIndex, scrollToIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const syncActiveFromScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const { left: trackLeft, width: trackWidth } = track.getBoundingClientRect();
        const center = trackLeft + trackWidth / 2;
        let closest = 0;
        let minDist = Infinity;

        Array.from(track.children).forEach((child, i) => {
          const rect = child.getBoundingClientRect();
          const childCenter = rect.left + rect.width / 2;
          const dist = Math.abs(childCenter - center);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });

        setActiveIndex(closest);
      });
    };

    track.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", syncActiveFromScroll);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = { active: true, moved: false, startX: e.clientX };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    if (Math.abs(e.clientX - dragRef.current.startX) > 8) {
      dragRef.current.moved = true;
    }
  };

  const handlePointerUp = () => {
    dragRef.current.active = false;
  };

  const handleSlideClick = (index: number) => {
    if (dragRef.current.moved) return;
    if (index === activeIndex) goNext();
    else scrollToIndex(index);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-16 items-center justify-start pl-2 md:flex lg:w-24">
        <button
          type="button"
          aria-label="이전 카드"
          onClick={goPrev}
          className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-white/40 bg-black/50 text-white backdrop-blur transition hover:bg-white/20"
        >
          <ChevronIcon direction="left" />
        </button>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-16 items-center justify-end pr-2 md:flex lg:w-24">
        <button
          type="button"
          aria-label="다음 카드"
          onClick={goNext}
          className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-white/40 bg-black/50 text-white backdrop-blur transition hover:bg-white/20"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div
        ref={trackRef}
        data-horizontal-scroll="true"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-12 lg:gap-[86px] [&::-webkit-scrollbar]:hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {BUSINESS_CARDS.map((card, index) => (
          <div
            key={card.id}
            className="snap-center first:pl-[max(1.5rem,calc((100%-min(85vw,712px))/2))] last:pr-[max(1.5rem,calc((100%-min(85vw,712px))/2))]"
            onClick={() => handleSlideClick(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSlideClick(index);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={
              index === activeIndex
                ? `${card.title} — 클릭하면 다음 카드`
                : `${card.title}로 이동`
            }
          >
            <BusinessCard
              title={card.title}
              description={card.description}
              imageSrc={card.image}
              isActive={index === activeIndex}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        {BUSINESS_CARDS.map((card, index) => (
          <button
            key={card.id}
            type="button"
            aria-label={`${card.title}로 이동`}
            aria-current={index === activeIndex}
            onClick={() => scrollToIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex
                ? "w-10 bg-brand"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-white/50 md:hidden">
        카드를 탭하거나 옆으로 밀어 넘기세요
      </p>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={direction === "left" ? "mr-0.5" : "ml-0.5"}
    >
      <path
        d={direction === "left" ? "M12 4L6 10L12 16" : "M8 4L14 10L8 16"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
