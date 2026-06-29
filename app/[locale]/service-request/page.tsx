import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceRequestForm } from "@/components/service-request/ServiceRequestForm";
import { buildPageTitle } from "@/lib/branding";
import { getContactEmail, SITE } from "@/lib/constants";
import { getBrand } from "@/lib/get-brand";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRoutes } from "@/lib/i18n/routes";

interface ServiceRequestPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServiceRequestPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const brand = await getBrand();
  const dict = await getDictionary(locale);

  return {
    title: buildPageTitle(brand, locale, dict.serviceRequest.eyebrow),
    description: brand.metaDescription[locale],
  };
}

export default async function ServiceRequestPage({ params }: ServiceRequestPageProps) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const brand = await getBrand();
  const routes = getRoutes(locale);
  const t = dict.serviceRequest;
  const contactEmail = getContactEmail(brand);

  return (
    <div className="bg-[var(--brand-navy)]">
      <div className={`${SITE.container} py-16 lg:py-24`}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="lg:pe-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand-sky)]">{t.eyebrow}</p>
            <p className="mt-2 text-xs font-medium text-white/50">{brand.serviceFocus[locale]}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{t.title}</h1>
            <p className="mt-6 text-base leading-8 text-white/75">{t.intro}</p>

            <div className="mt-10 rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
                {t.securePaymentTitle}
              </p>
              <p className="mt-2 text-sm leading-7 text-white/70">{t.securePaymentDescription}</p>
              <a
                href={`mailto:${contactEmail}`}
                className={`mt-4 block text-sm text-white/80 ${SITE.transition} hover:text-white`}
              >
                {contactEmail}
              </a>
            </div>

            <Link
              href={routes.home}
              className={`mt-8 inline-block text-sm font-medium text-white/50 ${SITE.transition} hover:text-white`}
            >
              {t.backHome}
            </Link>
          </div>

          <div className="rounded-lg border border-white/10 bg-[var(--brand-navy)] p-8 shadow-[0_16px_48px_rgba(0,0,0,0.25)] ring-1 ring-white/5 sm:p-10">
            <h2 className="mb-2 text-lg font-semibold text-white">{t.formTitle}</h2>
            <p className="mb-2 text-sm font-medium text-[var(--brand-sky)]">{brand.shortName[locale]}</p>
            <p className="mb-8 text-sm leading-6 text-white/60">{t.formIntro}</p>
            <ServiceRequestForm />
          </div>
        </div>
      </div>
    </div>
  );
}
