import { CheckCircle2 } from "lucide-react";
import { SITE, whyChooseUsData } from "@/lib/constants";

export function WhyChooseUsSection() {
  return (
    <section
      id="why-us"
      className="scroll-mt-24 border-y border-[#0070F3]/10 bg-gradient-to-b from-[#E8F4FF]/50 to-white py-20"
      aria-labelledby="why-us-heading"
    >
      <div className={SITE.container}>
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0070F3]">Why Choose Us</p>
          <h2 id="why-us-heading" className="mt-3 text-3xl font-bold tracking-tight text-[#0A2540] sm:text-4xl">
            Built for businesses that demand excellence
          </h2>
          <p className="mt-4 text-base leading-7 text-[#64748B]">
            Flash Systems Ltd combines technology expertise, professional service delivery, and a commitment to
            quality that enterprise clients trust.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUsData.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#0070F3]/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,112,243,0.05)]"
            >
              <CheckCircle2 className="h-8 w-8 text-[#0070F3]" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-[#0A2540]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
