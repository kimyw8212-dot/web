"use client";

import { useEffect, useState, type RefObject } from "react";

export type SectionScrollProgress = {
  enter: number;
  exit: number;
};

function measureProgress(el: HTMLElement): SectionScrollProgress {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const range = vh * 0.92;

  const enter = Math.min(Math.max(1 - rect.top / range, 0), 1);
  const exit = Math.min(Math.max(-rect.top / range, 0), 1);

  return { enter, exit };
}

export function useSectionScrollProgress(
  ref: RefObject<HTMLElement | null>,
): SectionScrollProgress {
  const [progress, setProgress] = useState<SectionScrollProgress>({
    enter: 0,
    exit: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      setProgress(measureProgress(el));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("section-scroll", update);
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("section-scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}

export function getSectionVisibility(progress: SectionScrollProgress) {
  return progress.enter * (1 - progress.exit * 0.98);
}

/** 배경+오버레이+콘텐츠를 한 덩어리로 움직임 */
export function getSectionMotionStyle(
  progress: SectionScrollProgress,
  maxEnterOffset = 64,
  maxExitOffset = 96,
) {
  const visibility = getSectionVisibility(progress);
  const translateY =
    -(1 - progress.enter) * maxEnterOffset - progress.exit * maxExitOffset;

  return {
    opacity: visibility,
    transform: `translate3d(0, ${translateY}px, 0)`,
    willChange: "transform, opacity" as const,
  };
}

/** 배경만 살짝 확대 (opacity는 섹션 레이어에서 통일) */
export function getBackgroundScaleOnly(
  progress: SectionScrollProgress,
  maxScale = 0.08,
) {
  const scale =
    1 + progress.exit * maxScale + (1 - progress.enter) * (maxScale * 0.35);

  return {
    transform: `scale(${scale})`,
    willChange: "transform" as const,
  };
}

/** Intro / Partners 등 단색 섹션용 */
export function getContentMotionStyle(
  progress: SectionScrollProgress,
  maxEnterOffset = 64,
  maxExitOffset = 120,
) {
  return getSectionMotionStyle(progress, maxEnterOffset, maxExitOffset);
}
