"use client";

import Link from "next/link";
import { useLocale } from "@/components/providers/LocaleProvider";
import { SITE } from "@/lib/constants";

export function HeroSection() {
  const { dict, routes, brand, locale } = useLocale();

  return (
    <section
      className={`relative overflow-hidden ${SITE.container} pb-20 pt-12 lg:pb-28 lg:pt-16`}
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute start-[-6rem] top-8 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--brand-primary)_8%,transparent)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute end-0 top-24 h-56 w-56 rounded-full bg-[color-mix(in_srgb,var(--brand-sky)_10%,transparent)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand-primary)]">
          {brand.serviceFocus[locale]}
        </p>
        <h1
          id="hero-heading"
          className="text-4xl font-bold leading-[1.1] tracking-tight text-[var(--brand-navy)] sm:text-5xl lg:text-6xl"
        >
          {dict.brand.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--brand-muted)] sm:text-lg">
          {dict.brand.heroSubtext}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={routes.contact}
            className={`inline-flex items-center justify-center rounded-lg bg-[var(--brand-primary)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_color-mix(in_srgb,var(--brand-primary)_28%,transparent)] ${SITE.transition} hover:bg-[var(--brand-primary-hover)]`}
          >
            {dict.hero.startProject}
          </Link>
          <Link
            href={routes.services}
            className={`inline-flex items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--brand-primary)_20%,transparent)] bg-white px-8 py-3.5 text-sm font-semibold text-[var(--brand-navy)] ${SITE.transition} hover:border-[color-mix(in_srgb,var(--brand-primary)_35%,transparent)] hover:bg-[var(--brand-light)]`}
          >
            {dict.hero.viewServices}
          </Link>
        </div>
      </div>
    </section>
  );
}
