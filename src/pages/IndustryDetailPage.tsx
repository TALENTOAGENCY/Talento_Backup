import React from 'react';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Building,
  Users,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  Target,
  CheckCircle,
  Compass
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { RelatedServices } from '../components/RelatedServices';
import { RelatedIndustries } from '../components/RelatedIndustries';
import { RelatedRoles } from '../components/RelatedRoles';
import { RelatedLocations } from '../components/RelatedLocations';
import { getIndustryBySlug, getRelatedEntities, industriesData, servicesData } from '../data';
import type { IndustryEntity } from '../types/content';

interface IndustryDetailPageProps {
  slug: string;
  onBackToIndustries?: () => void;
  onBackToHome?: () => void;
  onNavigateIndustry?: (slug: string) => void;
}

export const IndustryDetailPage: React.FC<IndustryDetailPageProps> = ({
  slug,
  onBackToIndustries,
  onBackToHome,
  onNavigateIndustry
}) => {
  const industry: IndustryEntity = getIndustryBySlug(slug) || industriesData[0];
  const relations = getRelatedEntities(industry);

  // Service schema for this industry vertical
  const industryServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${industry.name} Executive Search`,
    description: industry.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'TALENTO',
      url: 'https://www.talento.agency/'
    },
    serviceType: `${industry.name} Recruitment`,
    areaServed: ['BD', 'AE', 'SG', 'GB', 'US']
  };

  // FAQ schema
  const faqSchemaData =
    industry.faqs && industry.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: industry.faqs.map((faq) => ({
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
    ? [industryServiceSchema, faqSchemaData]
    : [industryServiceSchema];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <SEO
        title={industry.seo.title || `${industry.name} | TALENTO`}
        description={industry.seo.description || industry.metaDescription}
        canonicalUrl={industry.seo.canonicalUrl || `https://www.talento.agency/industries/${industry.slug}`}
        keywords={industry.seo.keywords}
        ogImage={industry.seo.ogImage || 'https://www.talento.agency/talento.hero.webp'}
        ogType={industry.seo.ogType || 'article'}
        schemas={schemas}
      />

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-50 via-talento-50/40 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 pt-28 pb-16 md:pt-32 md:pb-20 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/', onClick: onBackToHome },
                { label: 'Industries', href: '/industries', onClick: onBackToIndustries },
                { label: industry.name, href: `/industries/${industry.slug}` }
              ]}
            />
            {onBackToIndustries && (
              <button
                onClick={onBackToIndustries}
                className="hidden sm:inline-flex items-center text-xs font-semibold text-talento-600 dark:text-talento-400 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                All Industry Verticals
              </button>
            )}
          </div>

          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-talento-100 dark:bg-talento-950 border border-talento-200 dark:border-talento-800 text-xs font-semibold text-talento-800 dark:text-talento-300 mb-5">
              <Building className="w-4 h-4 text-talento-600 dark:text-talento-400" />
              <span>{industry.heroContent.badge || industry.name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-5">
              {industry.heroContent.headline || industry.name}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {industry.heroContent.subheadline || industry.shortDescription}
            </p>

            {/* Highlights */}
            {industry.heroContent.highlights && industry.heroContent.highlights.length > 0 && (
              <div className="space-y-2.5 mb-8">
                {industry.heroContent.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-talento-600 dark:text-talento-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="https://calendly.com/talentoagency2/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-talento-600 hover:bg-talento-700 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
              >
                <span>Discuss {industry.name} Hiring Needs</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/#contact"
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
              >
                Submit Hiring Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN BODY */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Column (8 cols) */}
            <div className="lg:col-span-8 space-y-16">
              {/* 1. INDUSTRY OVERVIEW */}
              <div id="overview" className="space-y-4">
                <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                  Sector Intelligence
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {industry.name} Recruitment Landscape
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4 text-sm sm:text-base leading-relaxed">
                  {Array.isArray(industry.longDescription) ? (
                    industry.longDescription.map((p, idx) => <p key={idx}>{p}</p>)
                  ) : (
                    <p>{industry.longDescription}</p>
                  )}
                </div>
              </div>

              {/* 2. HIRING CHALLENGES */}
              {industry.hiringChallenges && industry.hiringChallenges.length > 0 && (
                <div id="challenges" className="space-y-4">
                  <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                    Sector Challenges
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Key Hiring Challenges in {industry.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {industry.hiringChallenges.map((challenge, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40"
                      >
                        <div className="flex items-center space-x-2.5 mb-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                            {challenge.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {challenge.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. ROLES / TYPICAL PLACEMENTS */}
              {industry.typicalPlacements && industry.typicalPlacements.length > 0 && (
                <div id="roles" className="space-y-4">
                  <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                    Leadership Placements
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Key Roles We Place in {industry.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {industry.typicalPlacements.map((role, idx) => (
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

              {/* 4. RECRUITMENT SERVICES FOR THIS INDUSTRY */}
              {industry.recruitmentServices && industry.recruitmentServices.length > 0 && (
                <div id="services" className="space-y-4">
                  <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                    How We Deliver
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Recruitment Services for {industry.name}
                  </h3>
                  <div className="space-y-3 pt-2">
                    {industry.recruitmentServices
                      .map((svcSlug) => servicesData.find((s) => s.slug === svcSlug))
                      .filter(Boolean)
                      .map((svc) => (
                        <a
                          key={svc!.id}
                          href={`/services/${svc!.slug}`}
                          className="flex items-start p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:border-talento-400/50 hover:shadow-md transition-all group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-talento-100 dark:bg-talento-950 text-talento-700 dark:text-talento-400 flex items-center justify-center flex-shrink-0 mr-4">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1 group-hover:text-talento-600 dark:group-hover:text-talento-400 transition-colors">
                              {svc!.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                              {svc!.shortDescription}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-talento-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 self-center ml-3" />
                        </a>
                      ))}
                  </div>
                </div>
              )}

              {/* 5. TALENT REQUIREMENTS */}
              {industry.talentRequirements && industry.talentRequirements.length > 0 && (
                <div id="requirements" className="space-y-4">
                  <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                    Candidate Criteria
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    What We Look For in {industry.name} Leaders
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {industry.talentRequirements.map((req, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 p-3.5 rounded-xl bg-talento-50/50 dark:bg-talento-950/20 border border-talento-100/60 dark:border-talento-800/40"
                      >
                        <Target className="w-4 h-4 text-talento-600 dark:text-talento-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. TALENTO APPROACH */}
              {industry.talentoApproach && industry.talentoApproach.length > 0 && (
                <div id="approach" className="space-y-4">
                  <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                    The TALENTO Advantage
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Our Approach to {industry.name} Executive Search
                  </h3>
                  <div className="space-y-4 pt-2">
                    {industry.talentoApproach.map((item, idx) => (
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

              {/* 7. SPECIALIZED PRACTICES */}
              {industry.specializedPractices && industry.specializedPractices.length > 0 && (
                <div id="practices" className="space-y-4">
                  <div className="flex items-center space-x-2 text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
                    <Compass className="w-4 h-4" />
                    <span>Sub-Sector Expertise</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Specialized {industry.name} Practices
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {industry.specializedPractices.map((practice, idx) => (
                      <div
                        key={idx}
                        className="flex items-center p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm"
                      >
                        <div className="w-8 h-8 rounded-full bg-talento-600 text-white font-bold flex items-center justify-center text-xs mr-3.5 flex-shrink-0 shadow-sm">
                          0{idx + 1}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-200">
                          {practice}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Industry Metrics Box */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 space-y-4">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                  Industry Practice
                </h4>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-1">
                    <Building className="w-3.5 h-3.5 mr-1 text-talento-600" />
                    <span>Sector</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {industry.name}
                  </div>
                </div>

                {industry.talentPoolSize && (
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-1">
                      <Users className="w-3.5 h-3.5 mr-1 text-talento-600" />
                      <span>Mapped Talent Pool</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {industry.talentPoolSize}
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-1">
                    <Briefcase className="w-3.5 h-3.5 mr-1 text-talento-600" />
                    <span>Specialized Practices</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {industry.specializedPractices.length} Sub-Sectors
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mb-1">
                    <Target className="w-3.5 h-3.5 mr-1 text-talento-600" />
                    <span>Key Placements</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {industry.typicalPlacements.length} Leadership Roles
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://calendly.com/talentoagency2/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-talento-600 hover:bg-talento-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>Schedule Industry Briefing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Related Services (Sidebar) */}
              {relations.services.length > 0 && (
                <RelatedServices
                  services={relations.services}
                  layout="sidebar"
                  title="Related Search Practices"
                />
              )}

              {/* Related Roles (Sidebar) */}
              {relations.roles.length > 0 && (
                <RelatedRoles
                  roles={relations.roles}
                  layout="sidebar"
                  title="Key Leadership Roles"
                />
              )}

              {/* Other Industries (Sidebar) */}
              <RelatedIndustries
                industries={industriesData.filter((ind) => ind.slug !== industry.slug)}
                layout="sidebar"
                title="Other Industry Verticals"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cross-border Hiring Geographies for this Industry */}
      {relations.locations.length > 0 && (
        <RelatedLocations
          locations={relations.locations}
          title={`International Talent Corridors for ${industry.name}`}
          subtitle={`Discover cross-border executive search and remote staffing hubs for ${industry.name.toLowerCase()} organizations.`}
          contextName={industry.name}
        />
      )}

      {/* 8. FAQ SECTION */}
      {industry.faqs && industry.faqs.length > 0 && (
        <FAQAccordion
          faqs={industry.faqs}
          title={`${industry.name} Recruitment FAQ`}
          subtitle={`Common questions about executive search and leadership hiring in the ${industry.name.toLowerCase()} sector.`}
          className="bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200/80 dark:border-gray-800"
        />
      )}

      {/* 9. CTA SECTION */}
      <CTASection
        cta={industry.cta}
        title={industry.cta?.title || `Discuss ${industry.name} Recruitment Needs`}
        description={industry.cta?.description || 'Schedule a confidential briefing with our industry practice leads.'}
        primaryButtonText={industry.cta?.buttonText || 'Schedule Industry Briefing'}
        primaryButtonHref="https://calendly.com/talentoagency2/30min"
        secondaryButtonText="Submit Hiring Inquiry"
        secondaryButtonHref="/#contact"
      />
    </div>
  );
};
