import { getPageSections, getSectionDocumentTop } from "@/lib/sections";
import { smoothScrollToY } from "@/lib/smooth-scroll";

export function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  return smoothScrollToY(getSectionDocumentTop(el));
}

export function scrollToSectionByIndex(index: number) {
  const sections = getPageSections();
  const target = sections[index];
  if (!target) return;
  return smoothScrollToY(getSectionDocumentTop(target));
}
