"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { BrandConfig } from "@/lib/branding";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { getRoutes } from "@/lib/i18n/routes";

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
  routes: ReturnType<typeof getRoutes>;
  brand: BrandConfig;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  locale: Locale;
  dict: Dictionary;
  brand: BrandConfig;
  children: ReactNode;
}

export function LocaleProvider({ locale, dict, brand, children }: LocaleProviderProps) {
  const routes = getRoutes(locale);

  return (
    <LocaleContext.Provider value={{ locale, dict, routes, brand }}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
