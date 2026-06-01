"use client";

import { useEffect } from "react";
import {
  getCurrentSectionIndex,
  getPageSections,
  getSectionDocumentTop,
  shouldCarouselConsumeSwipe,
  shouldCarouselConsumeWheel,
} from "@/lib/sections";
import { smoothScrollToY } from "@/lib/smooth-scroll";

const MIN_WHEEL_DELTA = 5;
const ARRIVAL_DELAY_MS = 120;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function SectionWheelSnap() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let locked = false;
    let touchStartY = 0;
    let touchStartX = 0;

    const goToOffset = async (offset: 1 | -1) => {
      const sections = getPageSections();
      if (!sections.length || locked) return;

      const current = getCurrentSectionIndex(sections);
      const nextIndex = current + offset;
      if (nextIndex < 0 || nextIndex >= sections.length) return;

      locked = true;
      try {
        await smoothScrollToY(getSectionDocumentTop(sections[nextIndex]));
        await wait(ARRIVAL_DELAY_MS);
      } finally {
        locked = false;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (shouldCarouselConsumeWheel(e.target, e.deltaX, e.deltaY)) return;
      if (Math.abs(e.deltaY) < MIN_WHEEL_DELTA) return;

      if (locked) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      void goToOffset(e.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
      touchStartX = e.touches[0]?.clientX ?? 0;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return;

      const endY = e.changedTouches[0]?.clientY ?? touchStartY;
      const endX = e.changedTouches[0]?.clientX ?? touchStartX;
      const deltaY = touchStartY - endY;
      const deltaX = touchStartX - endX;

      if (shouldCarouselConsumeSwipe(e.target, deltaX, deltaY)) return;
      if (Math.abs(deltaY) < 60) return;

      void goToOffset(deltaY > 0 ? 1 : -1);
    };

    const wheelOpts: AddEventListenerOptions = {
      passive: false,
      capture: true,
    };

    window.addEventListener("wheel", onWheel, wheelOpts);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel, wheelOpts);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return null;
}
