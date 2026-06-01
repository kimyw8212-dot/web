export function getPageSections(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>(".snap-section-hero, .snap-section"),
  );
}

export function getSectionDocumentTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY;
}

export function getCurrentSectionIndex(sections: HTMLElement[]): number {
  let index = 0;
  let minDistance = Infinity;

  sections.forEach((section, i) => {
    const distance = Math.abs(section.getBoundingClientRect().top);
    if (distance < minDistance) {
      minDistance = distance;
      index = i;
    }
  });

  return index;
}

export function isInsideHorizontalScrollArea(target: EventTarget | null): boolean {
  let node = target as HTMLElement | null;
  while (node) {
    if (node.dataset?.horizontalScroll === "true") return true;
    node = node.parentElement;
  }
  return false;
}

/** 가로 캐러셀 위에서도 세로 휠/스와이프는 구간 전환 */
export function shouldCarouselConsumeWheel(
  target: EventTarget | null,
  deltaX: number,
  deltaY: number,
): boolean {
  if (!isInsideHorizontalScrollArea(target)) return false;
  return Math.abs(deltaX) > Math.abs(deltaY);
}

export function shouldCarouselConsumeSwipe(
  target: EventTarget | null,
  deltaX: number,
  deltaY: number,
): boolean {
  if (!isInsideHorizontalScrollArea(target)) return false;
  return Math.abs(deltaX) > Math.abs(deltaY);
}

/** @deprecated shouldCarouselConsumeWheel 사용 */
export function isHorizontalScrollArea(target: EventTarget | null): boolean {
  return isInsideHorizontalScrollArea(target);
}
