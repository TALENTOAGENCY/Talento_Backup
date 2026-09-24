import React from 'react';
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  Award,
  ArrowRight,
  ArrowLeft,
  Building,
  Users
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { getServiceBySlug, getRelatedEntities, servicesData } from '../data';
import type { ServiceEntity } from '../types/content';

interface ServiceDetailPageProps {
  slug: string;
  onBackToServices?: () => void;
  onBackToHome?: () => void;
  onNavigateService?: (slug: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  onBackToServices,
  onBackToHome,
  onNavigateService
}) => {
  const service: ServiceEntity | undefined = getServiceBySlug(slug) || servicesData[0];
  const relations = getRelatedEntities(service);

  const serviceSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'TALENTO',
      url: 'https://www.talento.agency/'
    },
    serviceType: service.name,
    areaServed: ['BD', 'AE', 'SG', 'GB', 'US']
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <SEO
        title={service.seo.title || `${service.name} | TALENTO`}
        description={service.seo.description || service.metaDescription}
        canonicalUrl={service.seo.canonicalUrl || `https://www.talento.agency/services/${service.slug}`}
        keywords={service.seo.keywords}
        schemas={[serviceSchemaData]}
      />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-slate-50 via-talento-50/40 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 pt-28 pb-16 md:pt-32 md:pb-20 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/', onClick: onBackToHome },
                { label: 'Services', href: '/services', onClick: onBackToServices },
                { label: service.name, href: `/services/${service.slug}` }
              ]}
            />
            {onBackToServices && (
              <button
                onClick={onBackToServices}
                className="hidden sm:inline-flex items-center text-xs font-semibold text-talento-600 dark:text-talento-400 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                All Services
              </button>
            )}
          </div>

          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-talento-100 dark:bg-talento-950 border border-talento-200 dark:border-talento-800 text-xs font-semibold text-talento-800 dark:text-talento-300 mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-talento-600 dark:text-talento-400" />
              <span>{service.heroContent.badge || service.engagementModel}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-5">
              {service.heroContent.headline || service.name}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {service.heroContent.subheadline || service.shortDescription}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="https://calendly.com/talentoagency2/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-talento-600 hover:bg-talento-700 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <span>Initiate {service.name} Mandate</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/#contact"
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
              >
                Request Proposal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Search Scope Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Area */}
            <div className="lg:col-span-8 space-y-12">
              {/* Detailed Practice Overview */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Practice Overview & Strategic Purpose
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4 text-sm sm:text-base leading-relaxed">
                  {Array.isArray(service.longDescription) ? (
                    service.longDescription.map((p, idx) => <p key={idx}>{p}</p>)
                  ) : (
                    <p>{service.longDescription}</p>
                  )}
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-200/80 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Key Deliverables & Search Outcomes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.keyDeliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-start text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-talento-600 dark:text-talento-400 mr-2.5 flex-shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Phase Search Lifecycle */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {service.name} Execution Lifecycle
                </h3>
                <div className="space-y-4">
                  {service.searchLifecycle.map((phase, idx) => (
                    <div
                      key={idx}
                      className="flex items-start p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-full bg-talento-100 dark:bg-talento-950 text-talento-700 dark:text-talento-400 font-bold flex items-center justify-center text-xs mr-4 flex-shrink-0">
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-talento-600 dark:text-talento-400 uppercase">
                          {phase.phase}
                        </div>
                        <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                          {phase.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Key Engagement Facts & Related Entities */}
            <div className="lg:col-span-4 space-y-6">
              {/* Service Metadata Box */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 space-y-4">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                  Mandate Parameters
                </h4>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-talento-600" />
                    <span>Engagement Model</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {service.engagementModel}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-1">
                    <Clock className="w-3.5 h-3.5 mr-1 text-talento-600" />
                    <span>Target Shortlist Timeline</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {service.searchTimeline || '10–14 Days'}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-1">
                    <Award className="w-3.5 h-3.5 mr-1 text-talento-600" />
                    <span>Guarantee Period</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {service.guaranteePeriod || '3–6 Months'}
                  </div>
                </div>
              </div>

              {/* Related Practice Areas */}
              {relations.industries.length > 0 && (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800">
                  <div className="flex items-center space-x-2 text-talento-600 dark:text-talento-400 mb-3 font-bold text-xs uppercase tracking-wider">
                    <Building className="w-4 h-4" />
                    <span>Primary Industry Focus</span>
                  </div>
                  <div className="space-y-2">
                    {relations.industries.map((ind) => (
                      <div key={ind.id} className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        • {ind.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Roles */}
              {relations.roles.length > 0 && (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800">
                  <div className="flex items-center space-x-2 text-talento-600 dark:text-talento-400 mb-3 font-bold text-xs uppercase tracking-wider">
                    <Users className="w-4 h-4" />
                    <span>Common Placements</span>
                  </div>
                  <div className="space-y-2">
                    {relations.roles.map((r) => (
                      <div key={r.id} className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        • {r.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Navigation to other services */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800">
                <div className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                  Other Search Practices
                </div>
                <ul className="space-y-2">
                  {servicesData
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <li key={s.id}>
                        <a
                          href={`/services/${s.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (onNavigateService) {
                              onNavigateService(s.slug);
                            } else {
                              window.history.pushState({}, '', `/services/${s.slug}`);
                              window.dispatchEvent(new PopStateEvent('popstate'));
                            }
                          }}
                          className="text-xs text-talento-600 dark:text-talento-400 hover:underline flex items-center justify-between"
                        >
                          <span>{s.name}</span>
                          <ArrowRight className="w-3 h-3 text-gray-400" />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <FAQAccordion
          faqs={service.faqs}
          title={`${service.name} FAQ`}
          subtitle={`Frequently asked questions regarding our ${service.name} recruitment process.`}
          className="bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200/80 dark:border-gray-800"
        />
      )}

      {/* CTA Section */}
      <CTASection
        cta={service.cta}
        title={`Ready to Retain Our ${service.name} Practice?`}
        description={service.cta?.description || 'Schedule a confidential briefing with our Managing Partners.'}
        primaryButtonText={service.cta?.buttonText || 'Schedule Search Consultation'}
        primaryButtonHref="https://calendly.com/talentoagency2/30min"
        secondaryButtonText="Submit Search Mandate"
        secondaryButtonHref="/#contact"
      />
    </div>
  );
};
