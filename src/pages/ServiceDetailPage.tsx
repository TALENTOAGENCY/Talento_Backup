import React from 'react';
import {
  ShieldCheck,
  Clock,
  Award,
  ArrowRight,
  ArrowLeft,
  Building,
  Users,
  AlertTriangle,
  Lightbulb,
  Compass,
  Briefcase
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { RelatedServices } from '../components/RelatedServices';
import { RelatedIndustries } from '../components/RelatedIndustries';
import { RelatedRoles } from '../components/RelatedRoles';
import { RelatedLocations } from '../components/RelatedLocations';
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
  const service: ServiceEntity = getServiceBySlug(slug) || servicesData[0];
  const relations = getRelatedEntities(service);

  // Structured Service Schema JSON-LD
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
    areaServed: ['BD', 'AE', 'SG', 'GB', 'US'],
    offers: {
      '@type': 'Offer',
      description: service.engagementModel
    }
  };

  // Structured FAQ Schema JSON-LD
  const faqSchemaData =
    service.faqs && service.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: service.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        }
      : null;

  const schemas = faqSchemaData
    ? [serviceSchemaData, faqSchemaData]
    : [serviceSchemaData];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <SEO
        title={service.seo.title || `${service.name} | TALENTO`}
        description={service.seo.description || service.metaDescription}
        canonicalUrl={service.seo.canonicalUrl || `https://www.talento.agency/services/${service.slug}`}
        keywords={service.seo.keywords}
        ogImage={service.seo.ogImage || 'https://www.talento.agency/talento.hero.webp'}
        ogType={service.seo.ogType || 'article'}
        schemas={schemas}
      />

      {/* 1. HERO SECTION */}
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
                All Search Practices
              </button>
            )}
          </div>

          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-talento-100 dark:bg-talento-950 border border-talento-200 dark:border-talento-800 text-xs font-semibold text-talento-800 dark:text-talento-300 mb-5">
              <ShieldCheck className="w-4 h-4 text-talento-600 dark:text-talento-400" />
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
                Request Proposal Dossier
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN BODY CONTENT */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Column (8 cols) */}
            <div className="lg:col-span-8 space-y-16">
              {/* 2. SERVICE OVERVIEW */}
              <div id="overview" className="space-y-4">
                <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                  Strategic Focus
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {service.name} Practice Overview
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4 text-sm sm:text-base leading-relaxed">
                  {Array.isArray(service.longDescription) ? (
                    service.longDescription.map((p, idx) => <p key={idx}>{p}</p>)
                  ) : (
                    <p>{service.longDescription}</p>
                  )}
                </div>
              </div>

              {/* 3. CLIENT PROBLEMS */}
              {service.clientProblems && service.clientProblems.length > 0 && (
                <div id="challenges" className="space-y-4">
                  <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                    Key Bottlenecks
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Common Challenges Faced by Leadership Teams
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {service.clientProblems.map((problem, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 flex items-start space-x-3"
                      >
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                          {problem}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. TALENTO APPROACH */}
              {service.talentoApproach && service.talentoApproach.length > 0 && (
                <div id="approach" className="space-y-4">
                  <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                    The TALENTO Advantage
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Our Strategic Search Approach
                  </h3>
                  <div className="space-y-4 pt-2">
                    {service.talentoApproach.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 flex items-start space-x-4"
                      >
                        <div className="w-9 h-9 rounded-lg bg-talento-100 dark:bg-talento-950 text-talento-700 dark:text-talento-400 flex items-center justify-center flex-shrink-0">
                          <Lightbulb className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. ROLES COVERED */}
              {(service.rolesCovered || service.keyDeliverables) && (
                <div id="roles" className="space-y-4">
                  <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                    Talent Bench
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Key Positions & Functions Covered
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {(service.rolesCovered || service.keyDeliverables).map((role, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 flex items-center space-x-3 shadow-sm"
                      >
                        <Briefcase className="w-4 h-4 text-talento-600 dark:text-talento-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-200">
                          {role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. RECRUITMENT PROCESS (4 Phases) */}
              <div id="process" className="space-y-6">
                <div className="flex items-center space-x-2 text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                  <Compass className="w-4 h-4" />
                  <span>Execution Methodology</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {service.name} 4-Phase Search Lifecycle
                </h3>

                <div className="space-y-4 pt-2">
                  {service.searchLifecycle.map((phase, idx) => (
                    <div
                      key={idx}
                      className="flex items-start p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-full bg-talento-600 text-white font-bold flex items-center justify-center text-sm mr-4 flex-shrink-0 shadow-sm">
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-talento-600 dark:text-talento-400 uppercase tracking-wider mb-1">
                          {phase.phase}
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5">
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

            {/* Right Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Engagement Parameters Box */}
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

                <div className="pt-2">
                  <a
                    href="https://calendly.com/talentoagency2/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-talento-600 hover:bg-talento-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>Schedule Executive Briefing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 6. RELEVANT INDUSTRIES (Sidebar) */}
              {relations.industries.length > 0 && (
                <RelatedIndustries
                  industries={relations.industries}
                  layout="sidebar"
                  title="Target Industry Verticals"
                />
              )}

              {/* Relevant Roles (Sidebar) */}
              {relations.roles.length > 0 && (
                <RelatedRoles
                  roles={relations.roles}
                  layout="sidebar"
                  title="Target Leadership Roles"
                />
              )}

              {/* Other Search Practices (Sidebar) */}
              <RelatedServices
                services={servicesData.filter((s) => s.slug !== service.slug)}
                layout="sidebar"
                title="Other Search Practices"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Geographies & Corridors for this Service */}
      {relations.locations.length > 0 && (
        <RelatedLocations
          locations={relations.locations}
          title={`Target Corridors for ${service.name}`}
          subtitle={`Deploy ${service.name.toLowerCase()} across our primary international talent corridors.`}
          contextName={service.name}
        />
      )}

      {/* 8. FAQS SECTION */}
      {service.faqs && service.faqs.length > 0 && (
        <FAQAccordion
          faqs={service.faqs}
          title={`${service.name} Practice FAQ`}
          subtitle={`Detailed answers regarding our ${service.name} engagement criteria, guarantees, and timelines.`}
          className="bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200/80 dark:border-gray-800"
        />
      )}

      {/* 10. CTA SECTION */}
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
