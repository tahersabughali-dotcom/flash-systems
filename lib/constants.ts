import type { FeatureItem, NavigationLink, ServiceItem } from "@/lib/types";

export const BRAND = {
  name: "Flash Systems Ltd",
  shortName: "Flash Systems",
  tagline: "Smart Digital Services for Modern Businesses",
  description:
    "Flash Systems Ltd provides AI services, software development, IT consultancy, automation, digital solutions, dashboards, SaaS platforms, design, marketing, finance tools, business support, and engineering services for modern enterprises.",
  phone: "07599773234",
  phoneHref: "tel:07599773234",
  whatsappHref: "https://wa.me/447599773234",
  email: "contact@flashsystems.com",
} as const;

export const LOGO_SRC = "/FLASH SYSTEMS LTD.png";

export const COLORS = {
  navy: "#0A2540",
  primary: "#0070F3",
  sky: "#38BDF8",
  light: "#E8F4FF",
  muted: "#64748B",
} as const;

export const ROUTES = {
  home: "/",
  services: "/#services",
  contact: "/contact",
  login: "/auth/login",
  signup: "/auth/signup",
  search: "/search",
} as const;

export const SITE = {
  container: "mx-auto max-w-7xl px-6 lg:px-8",
  transition: "transition-all duration-300",
} as const;

export const NAV_LINKS: NavigationLink[] = [
  { label: "Services", href: ROUTES.services },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: ROUTES.contact },
];

export const servicesData: ServiceItem[] = [
  {
    id: "ai-services",
    title: "AI Services",
    description:
      "Intelligent automation, machine learning, and AI strategy that help businesses innovate faster and operate smarter.",
    iconName: "Bot",
    route: "/services/ai-services",
  },
  {
    id: "development-it",
    title: "Development & IT",
    description:
      "Custom software, web applications, cloud infrastructure, DevOps, and enterprise IT consultancy built for scale.",
    iconName: "Code2",
    route: "/services/development-it",
  },
  {
    id: "design-creative",
    title: "Design & Creative",
    description:
      "Brand identity, UI/UX design, and creative direction that elevate digital products into premium experiences.",
    iconName: "Palette",
    route: "/services/design-creative",
  },
  {
    id: "sales-marketing",
    title: "Sales & Marketing",
    description:
      "Growth strategy, digital campaigns, and conversion-focused marketing that connect your brand to the right audience.",
    iconName: "Megaphone",
    route: "/services/sales-marketing",
  },
  {
    id: "writing-translation",
    title: "Writing & Translation",
    description:
      "Professional copywriting, technical documentation, and multilingual translation for global business communication.",
    iconName: "Languages",
    route: "/services/writing-translation",
  },
  {
    id: "admin-support",
    title: "Admin & Support",
    description:
      "Virtual assistance, operations support, and business administration services that keep teams running efficiently.",
    iconName: "Headset",
    route: "/services/admin-support",
  },
  {
    id: "finance-accounting",
    title: "Finance & Accounting",
    description:
      "Bookkeeping, financial planning, and accounting solutions tailored for startups, SMEs, and enterprise finance teams.",
    iconName: "Calculator",
    route: "/services/finance-accounting",
  },
  {
    id: "legal",
    title: "Legal",
    description:
      "Business legal advisory, contract review, and compliance support for companies in regulated industries.",
    iconName: "Scale",
    route: "/services/legal",
  },
  {
    id: "hr-training",
    title: "HR & Training",
    description:
      "Talent acquisition, workforce training, and HR operations designed to build high-performing, future-ready teams.",
    iconName: "Users",
    route: "/services/hr-training",
  },
  {
    id: "engineering-architecture",
    title: "Engineering & Architecture",
    description:
      "Systems engineering, solution architecture, and technical leadership for mission-critical digital transformation.",
    iconName: "Building2",
    route: "/services/engineering-architecture",
  },
];

export const whyChooseUsData: FeatureItem[] = [
  {
    id: "expertise",
    title: "Enterprise-Grade Expertise",
    description:
      "Access verified professionals across AI, software, design, and business operations — vetted for quality and reliability.",
  },
  {
    id: "speed",
    title: "Faster Delivery",
    description:
      "Streamlined workflows and intelligent matching help you launch projects, products, and systems with speed and precision.",
  },
  {
    id: "security",
    title: "Trusted & Secure",
    description:
      "Built with corporate standards in mind — secure processes, clear communication, and professional accountability.",
  },
  {
    id: "global",
    title: "Global Reach",
    description:
      "Connect with elite talent and digital solutions worldwide, tailored to your business goals and industry requirements.",
  },
];
