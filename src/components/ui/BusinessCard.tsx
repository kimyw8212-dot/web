import Image from "next/image";

type BusinessCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  isActive?: boolean;
};

export function BusinessCard({
  title,
  description,
  imageSrc,
  isActive = false,
}: BusinessCardProps) {
  return (
    <article
      className={`relative flex min-h-[420px] w-[min(85vw,712px)] shrink-0 cursor-pointer flex-col justify-end overflow-hidden rounded-3xl p-8 transition-transform duration-300 md:min-h-[560px] md:rounded-[36px] md:p-16 lg:min-h-[712px] lg:w-[712px] ${
        isActive ? "scale-100 opacity-100" : "scale-[0.97] opacity-90"
      }`}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 85vw, 712px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10 max-w-md text-white">
        <h3 className="text-4xl font-bold leading-tight md:text-5xl lg:text-[64px]">
          {title}
        </h3>
        <p className="mt-6 text-lg leading-relaxed md:text-2xl">
          {description}
        </p>
      </div>
    </article>
  );
}
