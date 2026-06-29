"use client";

import { Building2 } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { COMPANY_LEGAL, SITE } from "@/lib/constants";

export function CorporateCredibilitySection() {
  const { dict } = useLocale();
  const t = dict.corporate;

  return (
    <section
      id="corporate"
      className="scroll-mt-24 border-y border-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] bg-white py-20"
      aria-labelledby="corporate-heading"
    >
      <div className={SITE.container}>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand-primary)]">{t.eyebrow}</p>
          <h2
            id="corporate-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[var(--brand-navy)] sm:text-4xl"
          >
            {t.title}
          </h2>

          <div className="mt-10 rounded-lg border border-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] bg-[color-mix(in_srgb,var(--brand-light)_50%,white)] p-8 shadow-[0_4px_20px_color-mix(in_srgb,var(--brand-primary)_4%,transparent)]">
            <div className="flex items-start gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-light)] text-[var(--brand-primary)] ring-1 ring-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)]"
                aria-hidden="true"
              >
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)]">
                  {COMPANY_LEGAL.name}
                </p>
                <p className="mt-3 text-base leading-8 text-[var(--brand-navy)]">{t.legalStatus}</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-base leading-8 text-[var(--brand-muted)]">{t.commitment}</p>
        </div>
      </div>
    </section>
  );
}
