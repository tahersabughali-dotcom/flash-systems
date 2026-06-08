"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BRAND, LOGO_SRC, NAV_LINKS, ROUTES, SITE } from "@/lib/constants";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#0070F3]/10 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className={`${SITE.container} flex h-16 items-center justify-between lg:h-[4.5rem]`}>
        <Link href={ROUTES.home} className="flex shrink-0 items-center" aria-label={`${BRAND.name} — Home`}>
          <Image
            src={LOGO_SRC}
            alt={`${BRAND.name} logo`}
            width={160}
            height={44}
            className="h-10 w-auto object-contain lg:h-11"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium text-[#0A2540]/80 ${SITE.transition} hover:text-[#0070F3]`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={ROUTES.login}
            className={`text-sm font-medium text-[#0A2540]/80 ${SITE.transition} hover:text-[#0070F3]`}
          >
            Log In
          </Link>
          <Link
            href={ROUTES.signup}
            className={`rounded-full bg-[#0070F3] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,112,243,0.25)] ${SITE.transition} hover:bg-[#0059d4] hover:shadow-[0_12px_32px_rgba(0,112,243,0.3)]`}
          >
            Join Network
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#0070F3]/15 text-[#0A2540] md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
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

      {mobileOpen ? (
        <nav className="border-t border-[#0070F3]/10 bg-white px-6 py-4 md:hidden" aria-label="Mobile navigation">
          <ul className="space-y-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#0A2540] hover:bg-[#E8F4FF] hover:text-[#0070F3]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={ROUTES.login}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#0A2540] hover:bg-[#E8F4FF]"
              >
                Log In
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href={ROUTES.signup}
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-[#0070F3] px-5 py-3 text-sm font-semibold text-white"
              >
                Join Network
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
