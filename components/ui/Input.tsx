import type { InputHTMLAttributes } from "react";
import { SITE } from "@/lib/constants";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-[0.28em] text-[#64748B]">
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        className={`w-full rounded-2xl border border-[#0070F3]/15 bg-white px-4 py-3 text-base font-medium text-[#0A2540] outline-none placeholder:text-[#94A3B8] ring-1 ring-transparent ${SITE.transition} focus:border-[#0070F3] focus:shadow-[0_0_0_3px_rgba(0,112,243,0.12)] focus:ring-[#0070F3]/20 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
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
