"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/providers/LocaleProvider";

interface BrandLogoProps {
  variant?: "default" | "footer";
  asLink?: boolean;
}

const variantDimensions = {
  default: { width: 180, height: 40 },
  footer: { width: 200, height: 48 },
} as const;

export function BrandLogo({ variant = "default", asLink = true }: BrandLogoProps) {
  const { brand, dict, routes, locale } = useLocale();
  const { width, height } = variantDimensions[variant];
  const logo = brand.logo;

  const content = (
    <span className="relative inline-block shrink-0" style={{ width, height }}>
      <Image
        src={logo.src}
        alt={`${brand.shortName[locale]} logo`}
        width={logo.width}
        height={logo.height}
        quality={logo.quality}
        sizes={logo.sizes}
        className="h-full w-full object-contain object-start"
        priority={variant === "default"}
      />
    </span>
  );

  if (!asLink) {
    return content;
  }

  return (
    <Link
      href={routes.home}
      className="inline-flex shrink-0 items-center"
      aria-label={`${brand.shortName[locale]} — Home`}
    >
      {content}
    </Link>
  );
}
