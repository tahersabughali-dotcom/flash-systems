import { ServiceCard } from "@/components/ui/ServiceCard";
import { servicesData, SITE } from "@/lib/constants";

export function ServicesSection() {
  return (
    <section id="services" className={`${SITE.container} scroll-mt-24 pb-20`} aria-labelledby="services-heading">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0070F3]">Our Services</p>
        <h2 id="services-heading" className="mt-3 text-3xl font-bold tracking-tight text-[#0A2540] sm:text-4xl">
          Comprehensive digital solutions
        </h2>
        <p className="mt-4 text-base leading-7 text-[#64748B]">
          From AI automation to engineering architecture — Flash Systems Ltd delivers end-to-end professional
          services for modern businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
