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
    "border border-[#0070F3] bg-[#0070F3] text-white shadow-[0_8px_24px_rgba(0,112,243,0.25)] hover:bg-[#0059d4]",
  secondary:
    "border border-[#0070F3]/25 bg-white text-[#0A2540] hover:border-[#0070F3]/40 hover:bg-[#E8F4FF]",
  ghost: "border border-transparent bg-transparent text-[#64748B] hover:bg-[#E8F4FF] hover:text-[#0070F3]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
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
  const classes = `inline-flex items-center justify-center rounded-full font-semibold ${SITE.transition} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} disabled:cursor-not-allowed disabled:opacity-50 ${className}`;

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
