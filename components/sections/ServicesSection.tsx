"use client";

import { ServiceCard } from "@/components/ui/ServiceCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getServicesData, SITE } from "@/lib/constants";

export function ServicesSection() {
  const { dict } = useLocale();
  const services = getServicesData(dict);

  return (
    <section id="services" className={`${SITE.container} scroll-mt-24 pb-24`} aria-labelledby="services-heading">
      <div className="mb-14 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand-primary)]">{dict.services.eyebrow}</p>
        <h2 id="services-heading" className="mt-3 text-3xl font-bold tracking-tight text-[var(--brand-navy)] sm:text-4xl">
          {dict.services.title}
        </h2>
        <p className="mt-5 text-base leading-8 text-[var(--brand-muted)] sm:text-lg">{dict.services.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
