import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, ROUTES, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact | ${BRAND.name}`,
  description: `Contact ${BRAND.name} for AI, software, IT consultancy, and digital business solutions.`,
};

export default function ContactPage() {
  return (
    <div className={`${SITE.container} py-16 lg:py-24`}>
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0070F3]">Contact</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0A2540] sm:text-4xl">Let&apos;s build something great</h1>
        <p className="mt-4 text-base leading-7 text-[#64748B]">
          Reach out to {BRAND.name} for consultations, project inquiries, or enterprise onboarding.
        </p>

        <div className="mt-10 space-y-6 rounded-2xl border border-[#0070F3]/10 bg-white p-8 shadow-[0_8px_30px_rgba(0,112,243,0.06)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#94A3B8]">Phone</p>
            <a
              href={BRAND.phoneHref}
              className={`mt-2 block text-2xl font-semibold text-[#0A2540] ${SITE.transition} hover:text-[#0070F3]`}
            >
              {BRAND.phone}
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#94A3B8]">WhatsApp</p>
            <a
              href={BRAND.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-2 block text-lg font-semibold text-[#0A2540] ${SITE.transition} hover:text-[#0070F3]`}
            >
              {BRAND.phone}
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#94A3B8]">Email</p>
            <a
              href={`mailto:${BRAND.email}`}
              className={`mt-2 block text-lg text-[#0A2540] ${SITE.transition} hover:text-[#0070F3]`}
            >
              {BRAND.email}
            </a>
          </div>
        </div>

        <Link
          href={ROUTES.home}
          className={`mt-8 inline-block text-sm font-semibold text-[#0070F3] ${SITE.transition} hover:underline`}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
