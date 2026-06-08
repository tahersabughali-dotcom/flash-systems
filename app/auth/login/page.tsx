import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { BRAND, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Log In | ${BRAND.name}`,
  description: `Sign in to your ${BRAND.name} account.`,
};

export default function LoginPage() {
  return (
    <div className={`${SITE.container} flex min-h-[60vh] items-center justify-center py-16`}>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
