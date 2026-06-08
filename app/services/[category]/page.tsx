import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
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
import type { ServiceIconName } from "@/lib/types";
import { BRAND, ROUTES, SITE } from "@/lib/constants";
import { getAllServiceSlugs, getServiceBySlug } from "@/lib/services";

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

interface ServicePageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { category } = await params;
  const service = getServiceBySlug(category);

  if (!service) {
    return { title: `Service Not Found | ${BRAND.name}` };
  }

  return {
    title: `${service.title} | ${BRAND.name}`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { category } = await params;
  const service = getServiceBySlug(category);

  if (!service) {
    notFound();
  }

  const Icon = iconsMap[service.iconName];

  return (
    <div className={`${SITE.container} py-16 lg:py-24`}>
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#94A3B8]">
        <ol className="flex flex-wrap items-center gap-2" role="list">
          <li>
            <Link href={ROUTES.home} className="hover:text-[#0070F3]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={ROUTES.services} className="hover:text-[#0070F3]">
              Services
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#0A2540]">{service.title}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F4FF] text-[#0070F3] ring-1 ring-[#0070F3]/10">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold text-[#0A2540] sm:text-5xl">{service.title}</h1>
        <p className="mt-6 text-lg leading-8 text-[#64748B]">{service.description}</p>

        <div className="mt-10 rounded-2xl border border-[#0070F3]/10 bg-[#E8F4FF]/40 p-6 text-sm text-[#64748B]">
          Full service pages are coming soon. Contact our team to discuss your{" "}
          {service.title.toLowerCase()} requirements.
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={ROUTES.contact}
            className={`rounded-full bg-[#0070F3] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,112,243,0.25)] ${SITE.transition} hover:bg-[#0059d4]`}
          >
            Contact Us
          </Link>
          <Link
            href={ROUTES.services}
            className={`rounded-full border border-[#0070F3]/25 bg-white px-6 py-3 text-sm font-semibold text-[#0A2540] ${SITE.transition} hover:bg-[#E8F4FF]`}
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  );
}
