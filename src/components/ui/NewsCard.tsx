import Image from "next/image";

type NewsCardProps = {
  title: string;
  date: string;
};

export function NewsCard({ title, date }: NewsCardProps) {
  return (
    <article className="flex w-full flex-col gap-6">
      <div className="relative aspect-[824/516] w-full overflow-hidden rounded-3xl md:rounded-[36px]">
        <Image
          src="/images/news.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="text-2xl text-black md:text-[32px]">
        <p className="font-normal leading-snug">{title}</p>
        <p className="mt-1 font-normal text-black/80">{date}</p>
      </div>
    </article>
  );
}
