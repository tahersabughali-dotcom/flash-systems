import Image from "next/image";
import Link from "next/link";
import { BRAND, LOGO_SRC, ROUTES, SITE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      className={`relative overflow-hidden ${SITE.container} pb-20 pt-10 lg:pb-28 lg:pt-14`}
      aria-labelledby="hero-heading"
    >
      {/* Subtle logo watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden select-none"
        aria-hidden="true"
      >
        <Image
          src={LOGO_SRC}
          alt=""
          width={900}
          height={400}
          className="mr-[-5%] h-auto w-[min(70vw,640px)] max-w-none object-contain opacity-[0.05] sm:opacity-[0.06] lg:mr-0 lg:w-[min(55vw,720px)] lg:opacity-[0.07]"
          priority={false}
          draggable={false}
        />
      </div>

      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#0070F3]/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-32 h-48 w-48 rounded-full bg-[#38BDF8]/15 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl text-center lg:max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-[#0070F3]">{BRAND.name}</p>
        <h1
          id="hero-heading"
          className="bg-gradient-to-br from-[#0A2540] via-[#0A2540] to-[#0070F3] bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl"
        >
          {BRAND.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#64748B] sm:text-lg">
          {BRAND.description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={ROUTES.services}
            className={`inline-flex items-center justify-center rounded-full bg-[#0070F3] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(0,112,243,0.28)] ${SITE.transition} hover:bg-[#0059d4] hover:shadow-[0_16px_40px_rgba(0,112,243,0.35)]`}
          >
            Explore Services
          </Link>
          <Link
            href={ROUTES.contact}
            className={`inline-flex items-center justify-center rounded-full border border-[#0070F3]/25 bg-white px-8 py-3.5 text-sm font-semibold text-[#0A2540] shadow-sm ${SITE.transition} hover:border-[#0070F3]/40 hover:bg-[#E8F4FF]`}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
