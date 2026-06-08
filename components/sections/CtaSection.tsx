import Link from "next/link";
import { BRAND, ROUTES, SITE } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className={`${SITE.container} py-20`} aria-labelledby="cta-heading">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0070F3] to-[#0A2540] px-8 py-14 text-center shadow-[0_24px_60px_rgba(0,112,243,0.25)] sm:px-12">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#38BDF8]/20 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative">
          <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">
            Ready to transform your business?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-blue-100">
            Partner with {BRAND.name} for AI, software, IT consultancy, and digital solutions tailored to your
            goals.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={ROUTES.contact}
              className={`rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0070F3] shadow-lg ${SITE.transition} hover:bg-[#E8F4FF]`}
            >
              Get in Touch
            </Link>
            <Link
              href={ROUTES.signup}
              className={`rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold text-white ${SITE.transition} hover:bg-white/10`}
            >
              Join Network
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
