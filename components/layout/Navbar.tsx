"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLocale } from "@/components/providers/LocaleProvider";
import { getNavLinks, SITE } from "@/lib/constants";

function NavLink({
  href,
  label,
  external,
  className,
  onClick,
}: {
  href: string;
  label: string;
  external?: boolean;
  className: string;
  onClick?: () => void;
}) {
  if (external) {
    return (
      <a href={href} className={className} onClick={onClick} rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {label}
    </Link>
  );
}

export function Navbar() {
  const { locale, dict, routes, brand } = useLocale();
  const navLinks = getNavLinks(locale, dict, brand);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen, closeMobile]);

  const linkClass = `text-sm font-medium text-[color-mix(in_srgb,var(--brand-navy)_80%,transparent)] ${SITE.transition} hover:text-[var(--brand-primary)]`;
  const mobileLinkClass =
    "block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--brand-navy)] hover:bg-[var(--brand-light)] hover:text-[var(--brand-primary)]";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] bg-white/95 shadow-sm backdrop-blur-xl"
    >
      <div className={`${SITE.container} flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]`}>
        <BrandLogo />

        <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label={dict.nav.mainNav}>
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} external={link.external} className={linkClass} />
          ))}
          <LanguageSwitcher />
          <Button href={routes.contact} size="sm">
            {dict.nav.startProject}
          </Button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--brand-primary)_15%,transparent)] text-[var(--brand-navy)]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-[color-mix(in_srgb,var(--brand-primary)_10%,transparent)] bg-white px-6 py-4 md:hidden"
          aria-label={dict.nav.mobileNav}
        >
          <ul className="space-y-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  external={link.external}
                  className={mobileLinkClass}
                  onClick={closeMobile}
                />
              </li>
            ))}
            <li className="pt-3">
              <Link
                href={routes.contact}
                onClick={closeMobile}
                className={`flex w-full items-center justify-center rounded-lg bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_color-mix(in_srgb,var(--brand-primary)_30%,transparent)] ${SITE.transition} hover:bg-[var(--brand-primary-hover)]`}
              >
                {dict.nav.startProject}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
