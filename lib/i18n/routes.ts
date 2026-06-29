import type { Locale } from "@/lib/i18n/config";

export function getRoutes(locale: Locale) {
  return {
    home: `/${locale}`,
    services: `/${locale}#services`,
    contact: `/${locale}/contact`,
    serviceRequest: `/${locale}/service-request`,
    value: `/${locale}#value`,
  } as const;
}

export function swapLocaleInPath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && (segments[1] === "en" || segments[1] === "ar")) {
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  }
  return `/${targetLocale}${pathname === "/" ? "" : pathname}`;
}
