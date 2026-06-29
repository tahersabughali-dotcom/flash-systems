"use client";

import Link from "next/link";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SITE } from "@/lib/constants";
import { interpolate } from "@/lib/i18n/get-dictionary";

export function CtaSection() {
  const { dict, routes, locale, brand } = useLocale();

  return (
    <section className={`${SITE.container} py-24`} aria-labelledby="cta-heading">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-navy)] px-8 py-14 text-center shadow-[0_16px_48px_color-mix(in_srgb,var(--brand-primary)_20%,transparent)] sm:px-12">
        <div
          className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 -start-16 h-48 w-48 rounded-full bg-[color-mix(in_srgb,var(--brand-sky)_20%,transparent)] blur-2xl"
          aria-hidden="true"
        />
        <div className="relative">
          <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">
            {dict.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-blue-100/90">
            {interpolate(dict.cta.description, { brandName: brand.shortName[locale] })}
          </p>
          <div className="mt-8">
            <Link
              href={routes.contact}
              className={`inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[var(--brand-primary)] shadow-lg ${SITE.transition} hover:bg-[var(--brand-light)]`}
            >
              {dict.cta.button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
