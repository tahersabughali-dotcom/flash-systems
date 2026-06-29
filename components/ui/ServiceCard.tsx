import { Code2, CreditCard, LineChart, type LucideIcon } from "lucide-react";
import type { ServiceIconName, ServiceItem } from "@/lib/types";
import { SITE } from "@/lib/constants";

const iconsMap: Record<ServiceIconName, LucideIcon> = {
  Code2,
  CreditCard,
  LineChart,
};

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconsMap[service.iconName];

  return (
    <article
      className={`flex h-full flex-col rounded-lg border border-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] bg-white p-8 shadow-[0_4px_24px_color-mix(in_srgb,var(--brand-primary)_6%,transparent)] ${SITE.transition} hover:border-[color-mix(in_srgb,var(--brand-primary)_20%,transparent)] hover:shadow-[0_8px_32px_color-mix(in_srgb,var(--brand-primary)_10%,transparent)]`}
    >
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--brand-light)] text-[var(--brand-primary)] ring-1 ring-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)]">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-[var(--brand-navy)]">{service.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--brand-muted)]">{service.description}</p>
      {service.highlights.length > 0 ? (
        <ul className="mt-6 space-y-3 border-t border-[color-mix(in_srgb,var(--brand-primary)_8%,transparent)] pt-6" role="list">
          {service.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-6 text-[color-mix(in_srgb,var(--brand-navy)_80%,transparent)]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-primary)]" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
