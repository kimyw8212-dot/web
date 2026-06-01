"use client";

import { useEffect, useRef, useState } from "react";
import { HeroNav } from "@/components/hero/HeroNav";

const HERO_VIDEO_SCALE = 0.14;
const TEXT_EXIT_OFFSET = 120;

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const height = hero.offsetHeight || window.innerHeight;
      const p = Math.min(Math.max(window.scrollY / height, 0), 1);
      setProgress(p);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const videoScale = 1 + progress * HERO_VIDEO_SCALE;
  const textOpacity = Math.max(1 - progress * 1.15, 0);
  const textY = -progress * TEXT_EXIT_OFFSET;
  const navOpacity = Math.max(1 - progress * 1.4, 0);
  const showPinnedVideo = progress < 1;

  return (
    <>
      {showPinnedVideo && (
        <div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute inset-0 h-full w-full"
            style={{
              transform: `scale(${videoScale})`,
              willChange: "transform",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/hero-bg.jpg"
              className="h-full w-full object-cover"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        </div>
      )}

      <section
        ref={heroRef}
        id="hero"
        className="snap-section-hero relative z-0 h-[100dvh] w-full"
      >
        <HeroNav style={{ opacity: navOpacity }} />

        <div
          className="absolute inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[1920px] px-6 pb-20 md:px-12 md:pb-28 lg:px-24"
          style={{
            opacity: textOpacity,
            transform: `translate3d(0, ${textY}px, 0)`,
            willChange: "transform, opacity",
          }}
        >
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] text-white sm:text-7xl md:text-8xl lg:text-[130px]">
            <span className="block">Where Circuits</span>
            <span className="block">Begin</span>
            <span className="block">to Think</span>
          </h1>
        </div>
      </section>
    </>
  );
}
