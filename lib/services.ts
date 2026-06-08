import { servicesData } from "@/lib/constants";
import type { ServiceItem } from "@/lib/types";

export function getAllServices(): ServiceItem[] {
  return servicesData;
}

export function getServiceById(id: string): ServiceItem | undefined {
  return servicesData.find((service) => service.id === id);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((service) => service.route === `/services/${slug}`);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((service) => service.id);
}

export function searchServices(query: string): ServiceItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return servicesData.filter(
    (service) =>
      service.title.toLowerCase().includes(normalized) ||
      service.description.toLowerCase().includes(normalized),
  );
}
