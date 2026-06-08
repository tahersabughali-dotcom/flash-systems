"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ROUTES, SITE } from "@/lib/constants";

type AccountType = "client" | "talent";

export function SignupForm() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("client");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      router.push(ROUTES.home);
    } catch {
      setError("Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-[#0070F3]/10 bg-white p-8 shadow-[0_8px_30px_rgba(0,112,243,0.06)] sm:p-10 ${SITE.transition}`}
    >
      <header className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-[#0A2540]">Join Flash Systems Ltd</h1>
        <p className="text-sm text-[#64748B]">Unified signup for clients and professionals</p>
      </header>

      <fieldset className="mb-6">
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#64748B]">
          I want to
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { value: "client", label: "Hire Talent" },
              { value: "talent", label: "Offer Services" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setAccountType(option.value)}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${SITE.transition} ${
                accountType === option.value
                  ? "border-[#0070F3] bg-[#0070F3] text-white shadow-[0_8px_24px_rgba(0,112,243,0.25)]"
                  : "border-[#0070F3]/15 bg-white text-[#0A2540] hover:border-[#0070F3]/30 hover:bg-[#E8F4FF]"
              }`}
              aria-pressed={accountType === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="space-y-5">
        <Input
          id="signup-name"
          name="fullName"
          type="text"
          label="Full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Jordan Ellis"
          autoComplete="name"
          required
        />
        <Input
          id="signup-email"
          name="email"
          type="email"
          label="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
        <Input
          id="signup-password"
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimum 8 characters"
          autoComplete="new-password"
          hint="Use at least 8 characters with mixed case and numbers."
          required
        />
        {error ? (
          <p className="text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Creating account…" : "Create Account"}
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-[#64748B]">
        Already have an account?{" "}
        <Link href={ROUTES.login} className="font-semibold text-[#0070F3] hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
