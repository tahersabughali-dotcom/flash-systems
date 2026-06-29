"use client";

import { CheckCircle2 } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getWhyChooseUsData, SITE } from "@/lib/constants";

export function WhyChooseUsSection() {
  const { dict, locale, brand } = useLocale();
  const items = getWhyChooseUsData(dict);

  return (
    <section
      id="value"
      className="scroll-mt-24 border-y border-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] bg-gradient-to-b from-[color-mix(in_srgb,var(--brand-light)_40%,transparent)] to-white py-24"
      aria-labelledby="why-us-heading"
    >
      <div className={SITE.container}>
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand-primary)]">{dict.value.eyebrow}</p>
          <h2 id="why-us-heading" className="mt-3 text-3xl font-bold tracking-tight text-[var(--brand-navy)] sm:text-4xl">
            {dict.value.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--brand-muted)] sm:text-lg">
            {dict.value.description ? (
              dict.value.description
            ) : (
              <>
                <span className="font-semibold text-[var(--brand-navy)]">{brand.shortName[locale]}</span> {dict.value.descriptionBefore}{" "}
                <span className="font-semibold text-[var(--brand-navy)]">{dict.brand.hourlyRange}</span> {dict.value.descriptionAfter}
              </>
            )}
          </p>
        </div>

        <div
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-lg border border-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] bg-white p-6 shadow-[0_4px_20px_color-mix(in_srgb,var(--brand-primary)_5%,transparent)] transition-all duration-300 hover:border-[color-mix(in_srgb,var(--brand-primary)_20%,transparent)] hover:shadow-[0_8px_28px_color-mix(in_srgb,var(--brand-primary)_8%,transparent)]"
            >
              <CheckCircle2 className="h-7 w-7 text-[var(--brand-primary)]" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-[var(--brand-navy)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
