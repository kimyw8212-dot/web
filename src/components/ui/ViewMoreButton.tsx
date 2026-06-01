"use client";

import { scrollToSection } from "@/lib/scroll";

type ViewMoreButtonProps = {
  className?: string;
  targetSectionId?: string;
};

export function ViewMoreButton({
  className = "",
  targetSectionId,
}: ViewMoreButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (targetSectionId) scrollToSection(targetSectionId);
      }}
      className={`inline-flex h-[51px] min-w-[136px] items-center justify-center rounded-full bg-white/70 px-5 text-xl text-black transition hover:bg-white ${className}`}
    >
      View More
    </button>
  );
}
