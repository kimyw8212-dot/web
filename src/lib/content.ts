export const NAV_ITEMS = [
  { label: "About", sectionId: "about" },
  { label: "TECHNOLOGY", sectionId: "soc" },
  { label: "R&D", sectionId: "circuit" },
  { label: "PARTNERS", sectionId: "partners" },
  { label: "PRESS", sectionId: "press" },
  { label: "CAREER", sectionId: "career" },
] as const;

/** @deprecated NAV_ITEMS 사용 */
export const NAV_LINKS = NAV_ITEMS.map((item) => item.label);

export const FOOTER_LINKS = [
  "파트너십 문의",
  "오시는 길",
  "이용약관",
  "개인정보처리방침",
] as const;

/** 스텝 버튼(01–03) → 해당 기술 섹션 id */
export const TECHNOLOGY_STEP_TARGETS = {
  1: "soc",
  2: "circuit",
  3: "turnkey",
} as const;

export const TECHNOLOGY_SECTIONS = [
  {
    id: "soc",
    title: "SoC Technology",
    description: [
      "AI 기반 고집적 SoC 설계 기술로",
      "최적의 성능과 전력 효율을 구현합니다.",
    ],
    image: "/images/SoC Technology img.png",
    activeStep: 1,
    nextSectionId: "circuit",
  },
  {
    id: "circuit",
    title: "Advanced Circuit Design",
    description: [
      "정밀한 회로 구조 설계를 기반으로 안정적인 성능과 효율을 구현합니다.",
      "고속 처리와 저전력 환경에 최적화된 설계 기술을 제공합니다.",
    ],
    image: "/images/Advanced Circuit Design img.png",
    activeStep: 2,
    nextSectionId: "turnkey",
  },
  {
    id: "turnkey",
    title: "Turnkey Design Service",
    description: [
      "설계부터 검증, 물리 설계, 양산 연계까지 전 과정을 지원하는 통합 솔루션입니다.",
      "빠른 개발 대응과 안정적인 생산 프로세스를 제공합니다.",
    ],
    image: "/images/Turnkey Design Service.png",
    activeStep: 3,
    nextSectionId: "business",
  },
] as const;

export const BUSINESS_CARDS = [
  {
    id: "custom-asic",
    title: "Custom ASIC",
    description:
      "고객 요구에 맞춰 성능과 전력 효율을 최적화한 맞춤형 시스템 반도체를 설계합니다.",
    image: "/images/Custom ASIC img .png",
  },
  {
    id: "soc-solution",
    title: "SoC Solution",
    description:
      "고객 요구에 맞춰 성능과 전력 효율을 최적화한 맞춤형 시스템 반도체를 설계합니다.",
    image: "/images/SoC Solution img.png",
  },
  {
    id: "design-ip",
    title: "Design IP",
    description:
      "고객 요구에 맞춰 성능과 전력 효율을 최적화한 맞춤형 시스템 반도체를 설계합니다.",
    image: "/images/Design IP img.png",
  },
] as const;

export const VALUE_PILLARS = [
  {
    title: "Total Solution",
    description: "설계부터 검증·양산까지\n반도체 개발 전 과정을 통합\n지원합니다.",
    icon: "/images/icon 1.png",
  },
  {
    title: "Advanced SoC Design",
    description:
      "CPU·GPU·AI 기능을 통합한\n고성능 SoC 설계 기술을 제공합니다.",
    icon: "/images/icon 2.png",
  },
  {
    title: "Fast Development",
    description:
      "검증된 설계 IP와 개발 프로를 기반으로 개발 기간과\n비용을 효율적으로 단축합니다.",
    icon: "/images/icon 3.png",
  },
  {
    title: "Reliable Partnership",
    description:
      "파운드리 및 생산 협력 네트워크를 통해 안정적인 제조 환경을 지원합니다.",
    icon: "/images/icon 4.png",
  },
] as const;

export const NEWS_ITEMS = [
  {
    title: "AI SoC Development Expansion",
    date: "2026.05.13",
  },
  {
    title: "AI SoC Development Expansion",
    date: "2026.05.13",
  },
] as const;
