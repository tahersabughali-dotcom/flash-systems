"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/components/providers/LocaleProvider";
import { sendServiceRequestEmail } from "@/lib/emailjs";
import { getPayPalPaymentUrl, getServiceFee } from "@/lib/service-request";

export function ServiceRequestForm() {
  const { dict, locale, brand } = useLocale();
  const t = dict.serviceRequest.form;
  const services = dict.serviceRequest.services;

  const [serviceType, setServiceType] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const estimatedFee = useMemo(
    () => (serviceType ? getServiceFee(dict, serviceType) ?? "" : ""),
    [dict, serviceType],
  );

  const selectedServiceLabel = useMemo(
    () => services.find((service) => service.id === serviceType)?.label ?? "",
    [services, serviceType],
  );

  const isFormComplete = serviceType.trim() !== "" && projectBrief.trim().length > 0;

  const handlePay = async () => {
    setError("");

    if (!isFormComplete) {
      setError(t.errorRequired);
      return;
    }

    const paypalUrl = getPayPalPaymentUrl();
    if (!paypalUrl) {
      setError(t.errorPayPal);
      return;
    }

    setLoading(true);
    try {
      await sendServiceRequestEmail({
        service_type: selectedServiceLabel,
        project_brief: projectBrief.trim(),
        estimated_fee: estimatedFee,
        payment_status: "PayPal payment initiated",
        brand_name: brand.shortName[locale],
      });

      setSubmitted(true);
      window.open(paypalUrl, "_blank", "noopener,noreferrer");
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
    <div className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="service-type"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/70"
        >
          {t.serviceType}
        </label>
        <select
          id="service-type"
          name="serviceType"
          value={serviceType}
          onChange={(event) => setServiceType(event.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none ring-1 ring-transparent transition-all duration-300 focus:border-[var(--brand-primary)] focus:ring-[color-mix(in_srgb,var(--brand-primary)_30%,transparent)]"
        >
          <option value="" disabled className="text-[var(--brand-navy)]">
            {t.selectService}
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id} className="text-[var(--brand-navy)]">
              {service.label} — {service.fee}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="project-brief"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/70"
        >
          {t.projectBrief}
        </label>
        <textarea
          id="project-brief"
          name="projectBrief"
          rows={6}
          value={projectBrief}
          onChange={(event) => setProjectBrief(event.target.value)}
          placeholder={t.projectBriefPlaceholder}
          className="w-full resize-y rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none placeholder:text-white/35 ring-1 ring-transparent transition-all duration-300 focus:border-[var(--brand-primary)] focus:ring-[color-mix(in_srgb,var(--brand-primary)_30%,transparent)]"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="estimated-fee"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/70"
        >
          {t.estimatedFee}
        </label>
        <input
          id="estimated-fee"
          name="estimatedFee"
          type="text"
          readOnly
          value={estimatedFee}
          placeholder="—"
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-base font-semibold text-[var(--brand-sky)] outline-none ring-1 ring-white/5"
          aria-readonly="true"
        />
      </div>

      {!isFormComplete ? (
        <p className="text-xs leading-5 text-blue-200/50">{t.payHint}</p>
      ) : null}

      {error ? (
        <p className="text-sm font-medium text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="button"
        fullWidth
        size="lg"
        disabled={!isFormComplete || loading}
        onClick={handlePay}
        className="mt-2"
      >
        {loading ? t.paying : t.payButton}
      </Button>
    </div>
  );
}
