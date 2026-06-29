export interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export function getEmailJsConfig(templateIdOverride?: string): EmailJsConfig | null {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId =
    templateIdOverride ??
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return null;
  }

  return { serviceId, templateId, publicKey };
}

function getServiceRequestTemplateId(): string | undefined {
  return process.env.NEXT_PUBLIC_EMAILJS_SERVICE_REQUEST_TEMPLATE_ID?.trim() || undefined;
}

export interface ContactFormPayload {
  from_name: string;
  reply_to: string;
  company_name: string;
  project_scope: string;
  budget: string;
  brand_name?: string;
}

export async function sendContactEmail(payload: ContactFormPayload): Promise<void> {
  const config = getEmailJsConfig();

  if (!config) {
    throw new Error("EMAILJS_NOT_CONFIGURED");
  }

  const emailjs = await import("@emailjs/browser");

  await emailjs.send(config.serviceId, config.templateId, { ...payload }, {
    publicKey: config.publicKey,
  });
}

export interface ServiceRequestEmailPayload {
  service_type: string;
  project_brief: string;
  estimated_fee: string;
  payment_status: string;
  brand_name?: string;
}

export async function sendServiceRequestEmail(payload: ServiceRequestEmailPayload): Promise<void> {
  const config = getEmailJsConfig(getServiceRequestTemplateId());

  if (!config) {
    throw new Error("EMAILJS_NOT_CONFIGURED");
  }

  const emailjs = await import("@emailjs/browser");

  await emailjs.send(config.serviceId, config.templateId, { ...payload }, {
    publicKey: config.publicKey,
  });
}
