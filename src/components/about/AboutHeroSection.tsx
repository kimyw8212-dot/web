import { HeroNav } from "@/components/hero/HeroNav";

/** Figma 01_Hero (About, 1920 기준) */
const FIGMA = {
  headingLeft: 142,
  headingTop: 366,
  headingSize: 96,
  headingLineHeight: 1.2083,
} as const;

export function AboutHeroSection() {
  return (
    <section
      id="about-hero"
      className="snap-section-hero relative z-0 h-[100dvh] w-full overflow-hidden bg-black"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/about hero .mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

      <HeroNav />

      <div
        className="absolute inset-x-0 z-10 mx-auto w-full max-w-[1920px]"
        style={{
          top: `clamp(6rem, ${(FIGMA.headingTop / 1920) * 100}vw, ${FIGMA.headingTop}px)`,
          paddingLeft: `clamp(1.5rem, ${(FIGMA.headingLeft / 1920) * 100}vw, ${FIGMA.headingLeft}px)`,
          paddingRight: "1.5rem",
        }}
      >
        <h1
          className="font-bold text-white"
          style={{
            fontSize: `clamp(2rem, ${(FIGMA.headingSize / 1920) * 100}vw, ${FIGMA.headingSize}px)`,
            lineHeight: FIGMA.headingLineHeight,
          }}
        >
          <span className="block">CoAsia는 정교한 설계와</span>
          <span className="block">혁신 기술을 활용해</span>
          <span className="block">더 스마트한 미래를 만들어갑니다.</span>
        </h1>
      </div>
    </section>
  );
}
