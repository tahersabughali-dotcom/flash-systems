/** Lucide icon names used in servicesData — mapped in ServiceCard */
export type ServiceIconName =
  | "Bot"
  | "Code2"
  | "Palette"
  | "Megaphone"
  | "Languages"
  | "Headset"
  | "Calculator"
  | "Scale"
  | "Users"
  | "Building2";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: ServiceIconName;
  route: string;
}

export interface NavigationLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
}
