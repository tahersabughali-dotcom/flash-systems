import type { FeatureItem, NavigationLink, ServiceItem } from "@/lib/types";
import type { BrandConfig } from "@/lib/branding";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";
import { getRoutes } from "@/lib/i18n/routes";
import { DEFAULT_BRAND, type BrandTheme } from "@/lib/branding";

/** Subdomain-driven branding — configs keyed by brand id (main, logic, pay) */
export {
  BRAND_CONFIGS,
  BRAND_CONFIGS as BRANDING,
  DEFAULT_BRAND,
  resolveBrandFromHost,
  getBrandById,
  buildPageTitle,
  type BrandConfig,
  type BrandId,
  type BrandTheme,
} from "@/lib/branding";

/** Non-translatable company & site configuration */
export const COMPANY_LEGAL = {
  name: "Flash Systems Ltd",
  companyNumber: "17307106",
  jurisdiction: "England and Wales",
} as const;

export const BRAND_CONTACT = {
  phone: "07599773234",
  phoneHref: "tel:07599773234",
  whatsappHref: "https://wa.me/447599773234",
  email: "contact@flashsystems.com",
} as const;

/** Default branding — use getBrand() at runtime for subdomain-specific values */
export const DEFAULT_THEME: BrandTheme = DEFAULT_BRAND.theme;

export const LOGO = DEFAULT_BRAND.logo;

export const SITE = {
  container: "mx-auto max-w-7xl px-6 lg:px-8",
  transition: "transition-all duration-300",
} as const;

export function getContactEmail(brand: BrandConfig): string {
  return brand.contactEmail ?? BRAND_CONTACT.email;
}

export function getNavLinks(locale: Locale, dict: Dictionary, brand: BrandConfig): NavigationLink[] {
  const routes = getRoutes(locale);
  const links: NavigationLink[] = [];

  if (brand.features.showFullHome) {
    links.push(
      { label: dict.nav.services, href: routes.services },
      { label: dict.nav.whyUs, href: routes.value },
    );
  }

  if (brand.features.showExpressPortal) {
    const expressHref = brand.externalLinks?.expressPortal ?? routes.serviceRequest;
    links.push({
      label: dict.nav.expressPortal,
      href: expressHref,
      external: expressHref.startsWith("http"),
    });
  }

  const contactHref = brand.externalLinks?.contact ?? routes.contact;
  links.push({
    label: dict.nav.contact,
    href: contactHref,
    external: contactHref.startsWith("http"),
  });

  return links;
}

export function getServicesData(dict: Dictionary): ServiceItem[] {
  return dict.services.items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    highlights: item.highlights,
    iconName: serviceIconById[item.id] ?? "Code2",
  }));
}

export function getWhyChooseUsData(dict: Dictionary): FeatureItem[] {
  return dict.value.items;
}

const serviceIconById: Record<string, ServiceItem["iconName"]> = {
  "custom-software": "Code2",
  "fintech-payments": "CreditCard",
  consulting: "LineChart",
};
