import Image from "next/image";

type ValuePillarProps = {
  title: string;
  description: string;
  iconSrc: string;
};

export function ValuePillar({ title, description, iconSrc }: ValuePillarProps) {
  return (
    <div className="flex flex-col items-center text-center text-white">
      {/* 아이콘 + 20% 투명 원 배경 */}
      <div className="relative z-10 flex size-[88px] items-center justify-center md:size-[121px]">
        <div
          className="absolute inset-0 rounded-full bg-white/20"
          aria-hidden
        />
        <div className="relative size-[52px] md:size-[72px]">
          <Image
            src={iconSrc}
            alt=""
            fill
            className="object-contain"
            sizes="72px"
          />
        </div>
      </div>

      {/* 선만 있는 원 — 제목·설명 */}
      <div className="relative z-0 -mt-10 flex aspect-square w-full max-w-[280px] items-center justify-center rounded-full border border-white px-5 pb-4 pt-14 md:-mt-14 md:max-w-[415px] md:px-8 md:pt-20">
        <div className="-translate-y-3 md:-translate-y-5">
          <h3 className="text-xl font-extrabold leading-snug md:text-4xl">
            {title}
          </h3>
          <p className="mt-3 whitespace-pre-line text-xs font-normal leading-relaxed md:mt-4 md:text-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
