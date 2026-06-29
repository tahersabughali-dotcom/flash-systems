import { headers } from "next/headers";
import { DEFAULT_BRAND, getBrandById, type BrandConfig } from "@/lib/branding";

export async function getBrand(): Promise<BrandConfig> {
  const headersList = await headers();
  const brandKey = headersList.get("x-brand-key");
  return getBrandById(brandKey ?? "") ?? DEFAULT_BRAND;
}
