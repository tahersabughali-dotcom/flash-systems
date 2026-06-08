"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ROUTES, SITE } from "@/lib/constants";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      router.push(ROUTES.home);
    } catch {
      setError("Unable to sign in. Please try again.");
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
        <h1 className="text-3xl font-semibold text-[#0A2540]">Welcome back</h1>
        <p className="text-sm text-[#64748B]">Sign in to your Flash Systems Ltd account</p>
      </header>

      <div className="space-y-5">
        <Input
          id="login-email"
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
          id="login-password"
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
        {error ? (
          <p className="text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Signing in…" : "Log In"}
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-[#64748B]">
        New to Flash Systems?{" "}
        <Link href={ROUTES.signup} className="font-semibold text-[#0070F3] hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
