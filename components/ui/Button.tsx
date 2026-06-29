import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { SITE } from "@/lib/constants";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white shadow-[0_4px_16px_color-mix(in_srgb,var(--brand-primary)_30%,transparent)] hover:bg-[var(--brand-primary-hover)]",
  secondary:
    "border border-[color-mix(in_srgb,var(--brand-primary)_25%,transparent)] bg-white text-[var(--brand-navy)] hover:border-[color-mix(in_srgb,var(--brand-primary)_40%,transparent)] hover:bg-[var(--brand-light)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--brand-muted)] hover:bg-[var(--brand-light)] hover:text-[var(--brand-primary)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-lg font-semibold ${SITE.transition} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} disabled:cursor-not-allowed disabled:opacity-50 ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
