import type { Dictionary } from "@/lib/i18n/types";

export type ServiceRequestTypeId =
  | "technical-consultation"
  | "software-development"
  | "code-review";

export function getServiceRequestOptions(dict: Dictionary) {
  return dict.serviceRequest.services;
}

export function getServiceFee(
  dict: Dictionary,
  serviceId: string,
): string | undefined {
  const service = dict.serviceRequest.services.find((item) => item.id === serviceId);
  return service?.fee;
}

export function getPayPalPaymentUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_PAYPAL_PAYMENT_URL?.trim();
  return url || null;
}
