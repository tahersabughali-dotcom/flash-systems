import type { InputHTMLAttributes } from "react";
import { SITE } from "@/lib/constants";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: "light" | "dark";
}

export function Input({
  label,
  error,
  hint,
  id,
  className = "",
  variant = "light",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  const variantStyles =
    variant === "dark"
      ? "border-white/10 bg-white/5 text-white placeholder:text-white/35 focus:border-[var(--brand-primary)] focus:ring-[color-mix(in_srgb,var(--brand-primary)_30%,transparent)]"
      : "border-[color-mix(in_srgb,var(--brand-primary)_15%,transparent)] bg-white text-[var(--brand-navy)] placeholder:text-[#94A3B8] focus:border-[var(--brand-primary)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--brand-primary)_12%,transparent)] focus:ring-[color-mix(in_srgb,var(--brand-primary)_20%,transparent)]";

  const labelStyles =
    variant === "dark"
      ? "text-blue-200/70"
      : "text-[var(--brand-muted)]";

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={inputId} className={`text-xs font-semibold uppercase tracking-[0.28em] ${labelStyles}`}>
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        className={`w-full rounded-lg border px-4 py-3 text-base font-medium outline-none ring-1 ring-transparent ${SITE.transition} disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles} ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />

      {hint && !error ? (
        <p id={`${inputId}-hint`} className="text-xs text-[#94A3B8]">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
