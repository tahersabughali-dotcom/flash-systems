import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  Calculator,
  Code2,
  Headset,
  Languages,
  Megaphone,
  Palette,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName, ServiceItem } from "@/lib/types";
import { SITE } from "@/lib/constants";

const iconsMap: Record<ServiceIconName, LucideIcon> = {
  Bot,
  Code2,
  Palette,
  Megaphone,
  Languages,
  Headset,
  Calculator,
  Scale,
  Users,
  Building2,
};

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconsMap[service.iconName];

  return (
    <Link
      href={service.route}
      className={`group flex h-full flex-col rounded-2xl border border-[#0070F3]/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,112,243,0.06)] ${SITE.transition} hover:-translate-y-1 hover:border-[#0070F3]/25 hover:shadow-[0_16px_48px_rgba(0,112,243,0.12)]`}
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F4FF] text-[#0070F3] ring-1 ring-[#0070F3]/10 group-hover:bg-[#0070F3] group-hover:text-white group-hover:shadow-[0_8px_24px_rgba(0,112,243,0.25)]">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-[#0A2540]">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-[#64748B]">{service.description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0070F3]">
        View Service
        <ArrowRight
          className={`h-4 w-4 ${SITE.transition} group-hover:translate-x-1`}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
