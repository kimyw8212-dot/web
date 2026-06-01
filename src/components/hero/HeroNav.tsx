"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS } from "@/lib/content";
import { scrollToSection } from "@/lib/scroll";

type HeroNavProps = {
  style?: React.CSSProperties;
};

export function HeroNav({ style }: HeroNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    void scrollToSection(sectionId);
  };

  return (
    <header
      className="absolute inset-x-0 top-0 z-30"
      style={style}
    >
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-6 px-6 py-4 md:px-12 lg:px-24">
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            void scrollToSection("hero");
          }}
          className="relative h-12 w-28 shrink-0 md:h-14 md:w-[180px]"
        >
          <Image
            src="/images/logo.png"
            alt="CoAsia"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 text-lg font-semibold text-white lg:flex xl:gap-[76px] xl:text-2xl">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={`#${item.sectionId}`}
              onClick={(e) => handleNavClick(e, item.sectionId)}
              className="whitespace-nowrap transition hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="메뉴 열기"
          className="flex flex-col gap-1.5 p-2 lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-black/90 px-6 py-6 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-4 text-lg font-semibold text-white">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={`#${item.sectionId}`}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                  className="block py-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
