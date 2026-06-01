import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer
      id="career"
      className="relative z-10 shrink-0 snap-section bg-black text-white"
    >
      <div className="mx-auto flex max-w-[1920px] flex-col gap-12 px-6 py-16 md:flex-row md:items-start md:justify-between md:gap-20 md:px-12 md:py-24 lg:px-[167px]">
        <div className="relative h-32 w-64 shrink-0 md:h-[221px] md:w-[464px]">
          <Image
            src="/images/logo-footer.png"
            alt="CoAsia"
            fill
            className="object-contain object-left-bottom"
          />
        </div>

        <div className="flex max-w-3xl flex-col gap-12 md:gap-[137px]">
          <nav className="flex flex-wrap gap-4 text-xl font-light md:gap-6 md:text-[32px]">
            {FOOTER_LINKS.map((label) => (
              <Link key={label} href="#" className="hover:text-brand">
                {label}
              </Link>
            ))}
          </nav>

          <div className="text-xl font-light leading-relaxed md:text-[32px]">
            <p className="mb-6">문의하기</p>
            <p className="whitespace-pre-line text-white/90">
              {`이메일 : customer@oscotec.com\n전화 : +82-31-628-7630`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
