import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildPageTitle } from "@/lib/branding";
import { BRAND_CONTACT, getContactEmail, SITE } from "@/lib/constants";
import { getBrand } from "@/lib/get-brand";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRoutes } from "@/lib/i18n/routes";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const brand = await getBrand();
  const dict = await getDictionary(locale);

  return {
    title: buildPageTitle(brand, locale, dict.contact.eyebrow),
    description: brand.metaDescription[locale],
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const brand = await getBrand();
  const routes = getRoutes(locale);
  const t = dict.contact;
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

            <div className="mt-10 space-y-6 rounded-lg border border-white/10 bg-white/5 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">{t.directLine}</p>
                <a
                  href={BRAND_CONTACT.phoneHref}
                  className={`mt-2 block text-xl font-semibold text-white ${SITE.transition} hover:text-[var(--brand-sky)]`}
                >
                  {BRAND_CONTACT.phone}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">{t.email}</p>
                <a
                  href={`mailto:${contactEmail}`}
                  className={`mt-2 block text-base text-white/80 ${SITE.transition} hover:text-white`}
                >
                  {contactEmail}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">{t.whatsapp}</p>
                <a
                  href={BRAND_CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 block text-base text-white/80 ${SITE.transition} hover:text-white`}
                >
                  {t.whatsappLink}
                </a>
              </div>
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
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
