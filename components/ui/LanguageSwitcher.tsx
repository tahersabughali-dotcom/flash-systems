"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getAlternateLocale } from "@/lib/i18n/config";
import { swapLocaleInPath } from "@/lib/i18n/routes";
import { SITE } from "@/lib/constants";

export function LanguageSwitcher() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const alternateLocale = getAlternateLocale(locale);
  const href = swapLocaleInPath(pathname, alternateLocale);
  const label = locale === "en" ? dict.lang.switchLabel : dict.lang.switchLabelEn;

  return (
    <Link
      href={href}
      className={`rounded-lg border border-[color-mix(in_srgb,var(--brand-primary)_15%,transparent)] px-3 py-1.5 text-xs font-semibold tracking-wide text-[color-mix(in_srgb,var(--brand-navy)_80%,transparent)] ${SITE.transition} hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,transparent)] hover:bg-[var(--brand-light)] hover:text-[var(--brand-primary)]`}
      aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
      hrefLang={alternateLocale}
    >
      {label}
    </Link>
  );
}
