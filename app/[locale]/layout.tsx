import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { getBrandThemeStyle } from "@/lib/branding";
import { getBrand } from "@/lib/get-brand";
import { getDirection, isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const brand = await getBrand();
  return {
    title: brand.siteTitle[locale],
    description: brand.metaDescription[locale],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const brand = await getBrand();
  const dir = getDirection(locale);
  const themeStyle = getBrandThemeStyle(brand.theme);

  return (
    <html
      lang={locale}
      dir={dir}
      data-brand={brand.id}
      style={themeStyle as CSSProperties}
      className={`${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body
        className={`flex min-h-full flex-col text-[var(--brand-navy)] ${
          locale === "ar" ? "font-[family-name:var(--font-arabic)]" : "font-[family-name:var(--font-geist-sans)]"
        }`}
      >
        <LocaleProvider locale={locale} dict={dict} brand={brand}>
          <Navbar />
          <main className="relative z-10 flex-1 pt-16 lg:pt-[4.5rem]">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
