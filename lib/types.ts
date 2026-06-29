/** Lucide icon names used in servicesData — mapped in ServiceCard */
export type ServiceIconName = "Code2" | "CreditCard" | "LineChart";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: ServiceIconName;
  highlights: string[];
}

export interface NavigationLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
}
