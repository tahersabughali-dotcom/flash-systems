import Link from "next/link";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { matchTalent } from "@/lib/ai-service";
import { ROUTES, SITE } from "@/lib/constants";
import { searchServices } from "@/lib/services";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const categoryResults = query ? searchServices(query) : [];
  const talentResults = query ? await matchTalent({ query, limit: 6 }) : [];

  return (
    <div className={`${SITE.container} py-12`}>
      <header className="mb-10 max-w-2xl space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0070F3]">Search Results</p>
        <h1 className="text-3xl font-bold tracking-tight text-[#0A2540] sm:text-4xl">
          {query ? `Results for "${query}"` : "Search Flash Systems"}
        </h1>
        <p className="text-base leading-7 text-[#64748B]">
          {query
            ? `${categoryResults.length} services and ${talentResults.length} AI matches found.`
            : "Enter a search term to find services and talent."}
        </p>
      </header>

      {!query ? (
        <Button href={ROUTES.home}>Back to Home</Button>
      ) : (
        <div className="space-y-12">
          {categoryResults.length > 0 ? (
            <section aria-labelledby="category-results-heading">
              <h2 id="category-results-heading" className="mb-6 text-xl font-semibold text-[#0A2540]">
                Matching Services
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryResults.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </section>
          ) : null}

          {talentResults.length > 0 ? (
            <section aria-labelledby="talent-results-heading">
              <h2 id="talent-results-heading" className="mb-6 text-xl font-semibold text-[#0A2540]">
                AI Talent Matches
              </h2>
              <ul className="space-y-4" role="list">
                {talentResults.map((talent) => (
                  <li
                    key={talent.id}
                    className="rounded-2xl border border-[#0070F3]/10 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-[#0A2540]">{talent.name}</p>
                        <p className="mt-1 text-sm text-[#64748B]">{talent.headline}</p>
                        <p className="mt-2 text-xs text-[#0070F3]">{talent.category}</p>
                      </div>
                      <span className="rounded-full bg-[#E8F4FF] px-3 py-1 text-xs font-semibold text-[#0070F3]">
                        {Math.round(talent.score * 100)}% match
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {categoryResults.length === 0 && talentResults.length === 0 ? (
            <p className="text-[#64748B]">No results found. Try a different search term.</p>
          ) : null}

          <Link href={ROUTES.home} className="inline-block text-sm font-semibold text-[#0070F3] hover:underline">
            ← Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
