import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";
import { BRAND, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Join ${BRAND.name}`,
  description: `Create a ${BRAND.name} account to hire talent or offer professional services.`,
};

export default function SignupPage() {
  return (
    <div className={`${SITE.container} flex min-h-[60vh] items-center justify-center py-16`}>
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
