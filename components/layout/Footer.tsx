"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useLocale } from "@/components/providers/LocaleProvider";
import { BRAND_CONTACT, getContactEmail, getNavLinks, SITE } from "@/lib/constants";

export function Footer() {
  const { locale, dict, brand } = useLocale();
  const navLinks = getNavLinks(locale, dict, brand);
  const contactEmail = getContactEmail(brand);

  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] bg-white">
      <div className={`${SITE.container} py-14`}>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandLogo variant="footer" />
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--brand-muted)]">
              {dict.footer.description ?? dict.brand.description}
            </p>
            <p className="mt-3 text-xs font-medium text-[var(--brand-primary)]">{brand.serviceFocus[locale]}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
              {dict.footer.navigation}
            </p>
            <ul className="mt-4 space-y-2.5" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className={`text-sm text-[var(--brand-muted)] ${SITE.transition} hover:text-[var(--brand-primary)]`}
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={`text-sm text-[var(--brand-muted)] ${SITE.transition} hover:text-[var(--brand-primary)]`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand-primary)]">
              {dict.footer.contact}
            </p>
            <a
              href={BRAND_CONTACT.phoneHref}
              className={`mt-4 block text-lg font-semibold text-[var(--brand-navy)] ${SITE.transition} hover:text-[var(--brand-primary)]`}
            >
              {BRAND_CONTACT.phone}
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className={`mt-2 block text-sm text-[var(--brand-muted)] ${SITE.transition} hover:text-[var(--brand-primary)]`}
            >
              {contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-12 space-y-3 border-t border-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] pt-8 text-center">
          <p className="text-sm text-[#94A3B8]">{dict.footer.legalLine}</p>
          <p className="text-sm text-[#94A3B8]">{dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
