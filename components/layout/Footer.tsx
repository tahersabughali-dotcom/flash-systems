import Image from "next/image";
import Link from "next/link";
import { BRAND, LOGO_SRC, NAV_LINKS, ROUTES, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[#0070F3]/10 bg-white">
      <div className={`${SITE.container} py-14`}>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src={LOGO_SRC}
              alt={`${BRAND.name} logo`}
              width={170}
              height={48}
              className="h-11 w-auto object-contain"
            />
            <p className="mt-4 max-w-md text-sm leading-7 text-[#64748B]">{BRAND.description}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0070F3]">Navigation</p>
            <ul className="mt-4 space-y-2.5" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm text-[#64748B] ${SITE.transition} hover:text-[#0070F3]`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={ROUTES.login} className={`text-sm text-[#64748B] ${SITE.transition} hover:text-[#0070F3]`}>
                  Log In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0070F3]">Contact</p>
            <a
              href={BRAND.phoneHref}
              className={`mt-4 block text-lg font-semibold text-[#0A2540] ${SITE.transition} hover:text-[#0070F3]`}
            >
              {BRAND.phone}
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className={`mt-2 block text-sm text-[#64748B] ${SITE.transition} hover:text-[#0070F3]`}
            >
              {BRAND.email}
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-[#0070F3]/10 pt-8 text-center text-sm text-[#94A3B8]">
          © 2026 {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
