"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLocale } from "@/components/providers/LocaleProvider";
import { sendContactEmail } from "@/lib/emailjs";

export function ContactForm() {
  const { dict, locale, brand } = useLocale();
  const t = dict.contact.form;
  const budgetOptions = dict.contact.budgetOptions;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [scope, setScope] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !company.trim() || !scope.trim() || !budget) {
      setError(t.errorRequired);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t.errorEmail);
      return;
    }

    setLoading(true);
    try {
      await sendContactEmail({
        from_name: name.trim(),
        reply_to: email.trim(),
        company_name: company.trim(),
        project_scope: scope.trim(),
        budget,
        brand_name: brand.shortName[locale],
      });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof Error && err.message === "EMAILJS_NOT_CONFIGURED") {
        setError(t.errorNotConfigured);
      } else {
        setError(t.errorGeneric);
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-[color-mix(in_srgb,var(--brand-primary)_20%,transparent)] bg-white/5 p-10 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--brand-primary)_15%,transparent)] text-[var(--brand-sky)]">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white">{t.successTitle}</h2>
        <p className="mt-3 text-sm leading-7 text-blue-100/80">{t.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="contact-name"
          name="name"
          type="text"
          label={t.fullName}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t.fullNamePlaceholder}
          autoComplete="name"
          required
          variant="dark"
        />
        <Input
          id="contact-email"
          name="email"
          type="email"
          label={t.workEmail}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t.workEmailPlaceholder}
          autoComplete="email"
          required
          variant="dark"
        />
      </div>

      <Input
        id="contact-company"
        name="company"
        type="text"
        label={t.companyName}
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        placeholder={t.companyPlaceholder}
        autoComplete="organization"
        required
        variant="dark"
      />

      <div className="space-y-2">
        <label
          htmlFor="contact-scope"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/70"
        >
          {t.projectScope}
        </label>
        <textarea
          id="contact-scope"
          name="scope"
          rows={5}
          value={scope}
          onChange={(event) => setScope(event.target.value)}
          placeholder={t.projectScopePlaceholder}
          required
          className="w-full resize-y rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none placeholder:text-white/35 ring-1 ring-transparent transition-all duration-300 focus:border-[var(--brand-primary)] focus:ring-[color-mix(in_srgb,var(--brand-primary)_30%,transparent)]"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-budget"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/70"
        >
          {t.estimatedBudget}
        </label>
        <select
          id="contact-budget"
          name="budget"
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none ring-1 ring-transparent transition-all duration-300 focus:border-[var(--brand-primary)] focus:ring-[color-mix(in_srgb,var(--brand-primary)_30%,transparent)]"
        >
          <option value="" disabled className="text-[var(--brand-navy)]">
            {t.selectBudget}
          </option>
          {budgetOptions.map((option) => (
            <option key={option} value={option} className="text-[var(--brand-navy)]">
              {option}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="text-sm font-medium text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" fullWidth disabled={loading} size="lg" className="mt-2">
        {loading ? t.submitting : t.submit}
      </Button>

      <p className="text-center text-xs leading-5 text-blue-200/50">{t.privacy}</p>
    </form>
  );
}
