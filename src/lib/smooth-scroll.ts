import { getSectionDocumentTop } from "@/lib/sections";

const DEFAULT_DURATION_MS = 580;

function easeOutQuart(t: number) {
  return 1 - (1 - t) ** 4;
}

export function notifySectionScroll() {
  window.dispatchEvent(new Event("scroll"));
  window.dispatchEvent(new CustomEvent("section-scroll"));
}

export function smoothScrollToY(
  targetY: number,
  durationMs = DEFAULT_DURATION_MS,
): Promise<void> {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    window.scrollTo({ top: targetY, behavior: "auto" });
    notifySectionScroll();
    return Promise.resolve();
  }

  const startY = window.scrollY;
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) {
    notifySectionScroll();
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      window.scrollTo(0, startY + distance * easeOutQuart(progress));
      notifySectionScroll();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        notifySectionScroll();
        resolve();
      }
    };

    requestAnimationFrame(tick);
  });
}

export function scrollToSectionElement(element: HTMLElement) {
  return smoothScrollToY(getSectionDocumentTop(element));
}

/** @deprecated scrollToSectionElement 사용 */
export function getSectionScrollTop(element: HTMLElement) {
  return getSectionDocumentTop(element);
}
