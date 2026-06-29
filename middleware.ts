import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveBrandFromHost } from "@/lib/branding";
import { defaultLocale, isValidLocale, locales, type Locale } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const brand = resolveBrandFromHost(host);
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-brand-key", brand.id);

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    const localeSegment = pathname.split("/")[1];
    const locale: Locale = isValidLocale(localeSegment) ? localeSegment : defaultLocale;
    const isHomePath = pathname === `/${locale}`;

    if (isHomePath && brand.features.homeRedirect) {
      const target =
        brand.features.homeRedirect === "service-request"
          ? `/${locale}/service-request`
          : `/${locale}/contact`;
      return NextResponse.redirect(new URL(target, request.url));
    }

    if (
      brand.id === "logic" &&
      pathname.includes("/service-request") &&
      brand.externalLinks?.expressPortal
    ) {
      const externalUrl = brand.externalLinks.expressPortal.replace(/\/(en|ar)\//, `/${locale}/`);
      return NextResponse.redirect(externalUrl);
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
