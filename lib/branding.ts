import type { Locale } from "@/lib/i18n/config";

export type BrandId = "main" | "logic" | "pay";

export interface BrandTheme {
  navy: string;
  primary: string;
  primaryHover: string;
  sky: string;
  light: string;
  muted: string;
}

export interface BrandLocalizedText {
  en: string;
  ar: string;
}

export interface BrandFeatures {
  showExpressPortal: boolean;
  showFullHome: boolean;
  homeRedirect?: "contact" | "service-request";
}

export interface BrandConfig {
  id: BrandId;
  hostnames: string[];
  shortName: BrandLocalizedText;
  siteTitle: BrandLocalizedText;
  metaDescription: BrandLocalizedText;
  logo: {
    src: string;
    width: number;
    height: number;
    sizes: string;
    quality: number;
  };
  theme: BrandTheme;
  serviceFocus: BrandLocalizedText;
  features: BrandFeatures;
  externalLinks?: {
    expressPortal?: string;
    contact?: string;
  };
  contactEmail?: string;
}

const DEFAULT_LOGO = {
  src: "/FLASH SYSTEMS LTD.png",
  width: 240,
  height: 48,
  sizes: "(max-width: 768px) 100vw, 48px",
  quality: 85,
} as const;

export const BRAND_CONFIGS: Record<BrandId, BrandConfig> = {
  main: {
    id: "main",
    hostnames: ["flashsystems.uk", "www.flashsystems.uk", "localhost", "127.0.0.1"],
    shortName: { en: "Flash Systems Ltd", ar: "فلاش سيستمز" },
    siteTitle: {
      en: "Flash Systems Ltd | Elite B2B Software & Consulting",
      ar: "فلاش سيستمز | استشارات برمجية وخدمات تقنية للشركات",
    },
    metaDescription: {
      en: "Strategic technical solutions and financial software architecture. World-class British engineering at intelligent rates.",
      ar: "حلول برمجية استراتيجية وبنية تحتية مالية متطورة. هندسة بريطانية بمعايير عالمية.",
    },
    logo: { ...DEFAULT_LOGO },
    theme: {
      navy: "#0A2540",
      primary: "#0070F3",
      primaryHover: "#0059d4",
      sky: "#38BDF8",
      light: "#E8F4FF",
      muted: "#64748B",
    },
    serviceFocus: {
      en: "Elite B2B Software & Consulting",
      ar: "استشارات برمجية وتقنية للشركات",
    },
    features: {
      showExpressPortal: true,
      showFullHome: true,
    },
  },
  logic: {
    id: "logic",
    hostnames: ["logic.flashsystems.uk", "logic.localhost"],
    shortName: { en: "Flash Logic", ar: "فلاش لوجيك" },
    siteTitle: {
      en: "Flash Logic | Technical & Software Consulting",
      ar: "فلاش لوجيك | استشارات تقنية وبرمجية",
    },
    metaDescription: {
      en: "Strategic technical consulting and custom software architecture from Flash Systems Ltd — British engineering standards for enterprise clients.",
      ar: "استشارات تقنية استراتيجية وبنية برمجية مخصصة من فلاش سيستمز — معايير هندسة بريطانية للشركات.",
    },
    logo: { ...DEFAULT_LOGO },
    theme: {
      navy: "#0A2540",
      primary: "#2563EB",
      primaryHover: "#1D4ED8",
      sky: "#0EA5E9",
      light: "#EFF6FF",
      muted: "#64748B",
    },
    serviceFocus: {
      en: "Technical & Software Consulting",
      ar: "استشارات تقنية وبرمجية",
    },
    features: {
      showExpressPortal: true,
      showFullHome: true,
    },
    externalLinks: {
      expressPortal: "https://pay.flashsystems.uk/en/service-request",
    },
  },
  pay: {
    id: "pay",
    hostnames: ["pay.flashsystems.uk", "pay.localhost"],
    shortName: { en: "Flash Pay", ar: "فلاش باي" },
    siteTitle: {
      en: "Flash Pay | FinTech & Express Services",
      ar: "فلاش باي | FinTech والخدمات السريعة",
    },
    metaDescription: {
      en: "FinTech solutions and express service portal — secure payments, rapid technical delivery, and financial software architecture.",
      ar: "حلول FinTech وبوابة الخدمات السريعة — دفع آمن وتسليم تقني سريع وبنية مالية متطورة.",
    },
    logo: { ...DEFAULT_LOGO },
    theme: {
      navy: "#0A2540",
      primary: "#059669",
      primaryHover: "#047857",
      sky: "#34D399",
      light: "#ECFDF5",
      muted: "#64748B",
    },
    serviceFocus: {
      en: "FinTech & Express Payment Services",
      ar: "FinTech والخدمات السريعة",
    },
    features: {
      showExpressPortal: true,
      showFullHome: false,
      homeRedirect: "service-request",
    },
    contactEmail: "contact@flashsystems.com",
  },
};

export const DEFAULT_BRAND = BRAND_CONFIGS.main;

export function getBrandById(id: string): BrandConfig | undefined {
  if (id in BRAND_CONFIGS) {
    return BRAND_CONFIGS[id as BrandId];
  }
  return undefined;
}

export function resolveBrandFromHost(host: string): BrandConfig {
  const normalized = host.split(":")[0].toLowerCase();

  for (const brand of Object.values(BRAND_CONFIGS)) {
    if (brand.hostnames.includes(normalized)) {
      return brand;
    }
  }

  const subdomain = normalized.split(".")[0];
  const bySubdomain = getBrandById(subdomain);
  if (bySubdomain && bySubdomain.id !== "main") {
    return bySubdomain;
  }

  return DEFAULT_BRAND;
}

export function getBrandText(text: BrandLocalizedText, locale: Locale): string {
  return text[locale];
}

export function getBrandThemeStyle(theme: BrandTheme): Record<string, string> {
  return {
    "--brand-navy": theme.navy,
    "--brand-primary": theme.primary,
    "--brand-primary-hover": theme.primaryHover,
    "--brand-sky": theme.sky,
    "--brand-light": theme.light,
    "--brand-muted": theme.muted,
    "--foreground": theme.navy,
    "--primary": theme.primary,
    "--navy": theme.navy,
    "--border": `color-mix(in srgb, ${theme.primary} 12%, transparent)`,
  };
}

export function buildPageTitle(brand: BrandConfig, locale: Locale, pageTitle: string): string {
  return `${pageTitle} | ${brand.shortName[locale]}`;
}
