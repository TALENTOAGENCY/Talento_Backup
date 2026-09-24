import React from 'react';
import {
  Globe,
  Users,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Briefcase,
  Code2,
  Sparkles,
  Layers,
  MapPin,
  Check
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { NotFoundPage } from './NotFoundPage';
import {
  getLocationRole,
  isValidLocationRole,
  getLocationBySlug,
  getRoleBySlug,
  getServiceBySlug,
  getIndustryBySlug
} from '../data';

interface LocationRolePageProps {
  countrySlug: string;
  roleSlug: string;
  onBackToLocations?: () => void;
  onBackToCountry?: (countrySlug: string) => void;
  onBackToRole?: (roleSlug: string) => void;
  onBackToHome?: () => void;
  onNavigateService?: (slug: string) => void;
}

export const LocationRolePage: React.FC<LocationRolePageProps> = ({
  countrySlug,
  roleSlug,
  onBackToLocations,
  onBackToCountry,
  onBackToRole,
  onBackToHome,
  onNavigateService
}) => {
  // Safeguards against invalid country, invalid role, missing content, or thin pages
  const isValid = isValidLocationRole(countrySlug, roleSlug);
  const locationRole = getLocationRole(countrySlug, roleSlug);

  if (!isValid || !locationRole) {
    return (
      <NotFoundPage
        onBackToHome={onBackToHome}
        message={`The recruitment corridor for "${roleSlug}" in "${countrySlug}" is not currently available or registered in our published practices.`}
      />
    );
  }

  const country = getLocationBySlug(countrySlug);
  const role = getRoleBySlug(roleSlug);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
    { label: locationRole.countryName, href: `/locations/${locationRole.countrySlug}` },
    {
      label: locationRole.roleName,
      href: `/locations/${locationRole.countrySlug}/${locationRole.roleSlug}`,
      current: true
    }
  ];

  // Structured Schema: Service + FAQPage
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Hire ${locationRole.roleName} in ${locationRole.countryName}`,
    description: locationRole.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'TALENTO',
      url: 'https://www.talento.agency/'
    },
    serviceType: `${locationRole.roleName} Recruitment for ${locationRole.countryName}`,
    areaServed: country?.countryCode || locationRole.countrySlug.toUpperCase()
  };

  const faqSchemaData =
    locationRole.faqs && locationRole.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: locationRole.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        }
      : null;

  const schemas = faqSchemaData ? [serviceSchema, faqSchemaData] : [serviceSchema];

  // Resolve related services and industries
  const resolvedServices = (locationRole.relatedServices || [])
    .map((s) => getServiceBySlug(s))
    .filter(Boolean);

  const resolvedIndustries = (locationRole.relatedIndustries || [])
    .map((i) => getIndustryBySlug(i))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <SEO
        title={locationRole.title}
        description={locationRole.metaDescription}
        canonical={locationRole.canonicalUrl || `https://www.talento.agency/locations/${locationRole.countrySlug}/${locationRole.roleSlug}`}
        ogType="article"
        schema={schemas}
        keywords={locationRole.seoKeywords}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.14),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest">
              <Globe className="w-3.5 h-3.5" />
              {locationRole.badge || `${locationRole.countryName} Corridor`}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              Role: {locationRole.roleName}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-950/40 text-amber-400 border border-amber-800/40">
              {locationRole.timeZoneAndCollaboration.overlapHours}
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                {locationRole.headline}
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8 font-light">
                {locationRole.subheadline}
              </p>

              {locationRole.highlights && locationRole.highlights.length > 0 && (
                <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  {locationRole.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 shadow-2xl relative">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Hire {locationRole.roleName}
                    </h3>
                    <p className="text-xs text-slate-400">{locationRole.countryName} Corridor</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-xs text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Target Market</span>
                    <span className="font-medium text-slate-200">{locationRole.countryName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Discipline</span>
                    <span className="font-medium text-slate-200">{locationRole.roleName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Time-Zone Sync</span>
                    <span className="font-medium text-amber-400">Synchronous Overlap</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Guarantee</span>
                    <span className="font-medium text-emerald-400">Replacement Protected</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-amber-500/20"
                >
                  Request Candidate Dossiers
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Country + Role Market Overview */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                01. Corridor Overview
              </span>
              <h2 className="text-3xl font-bold text-white mb-6">
                Recruiting {locationRole.roleName} for {locationRole.countryName}
              </h2>
              <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                {locationRole.overview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              {/* Time-Zone Box */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  Time-Zone & Working Hours
                </h3>
                <p className="text-xs font-bold text-amber-400 mb-3 font-mono">
                  {locationRole.timeZoneAndCollaboration.overlapHours}
                </p>
                <div className="space-y-2">
                  {locationRole.timeZoneAndCollaboration.keyDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cross-link pills */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Hub References
                  </h4>
                  <p className="text-xs text-slate-300">Explore complete country & role directories</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/locations/${locationRole.countrySlug}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-amber-400 border border-slate-700 transition-colors"
                  >
                    {locationRole.countryName} Hub
                  </a>
                  <a
                    href={`/roles/${locationRole.roleSlug}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-amber-400 border border-slate-700 transition-colors"
                  >
                    {locationRole.roleName} Hub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Market Dynamics */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
              02. Market Dynamics
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Hiring Drivers for {locationRole.roleName} in {locationRole.countryName}
            </h2>
            <p className="text-slate-400 text-sm">
              Key operational realities, technical benchmarks, and scaling considerations for employers in this market:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {locationRole.marketDynamics.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 relative hover:border-slate-700 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-500/20">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-10">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Responsibilities & Required Competencies */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Responsibilities */}
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                03. Responsibilities in Market
              </span>
              <h2 className="text-2xl font-bold text-white mb-6">
                What Candidates Deliver for {locationRole.countryName} Teams
              </h2>
              <div className="space-y-3">
                {locationRole.responsibilitiesInMarket.map((resp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
                  >
                    <Check className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                    <span className="text-xs text-slate-300 leading-relaxed">{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Competencies */}
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                04. Technical & Communication Benchmarks
              </span>
              <h2 className="text-2xl font-bold text-white mb-6">
                Core Competencies Evaluated
              </h2>
              <div className="space-y-3">
                {locationRole.requiredCompetencies.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
                  >
                    <Code2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                    <span className="text-xs text-slate-300 leading-relaxed">{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TALENTO Search Methodology */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
              05. Search Methodology
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Recruitment Process for {locationRole.countryName}
            </h2>
            <p className="text-slate-400 text-sm">
              How we source, vet, and deliver pre-screened {locationRole.roleName} for {locationRole.countryName} organizations:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locationRole.talentoApproach.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 relative hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-bold text-amber-500/40 font-mono mb-4 block">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQs */}
      {locationRole.faqs && locationRole.faqs.length > 0 && (
        <section className="py-20 border-b border-slate-800/60 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                06. Corridor Inquiries
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions ({locationRole.countryName})
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                Practical information regarding timelines, vetting benchmarks, and engagement options for {locationRole.roleName}.
              </p>
            </div>

            <FAQAccordion faqs={locationRole.faqs} />
          </div>
        </section>
      )}

      {/* 6. Cross-Linking: Related Services & Industries */}
      <section className="py-16 border-b border-slate-800/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Related Services */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-400" />
                Related Hiring Services
              </h3>
              <div className="space-y-3">
                {resolvedServices.map((srv) => (
                  <a
                    key={srv?.id}
                    href={`/services/${srv?.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/30 transition-all text-xs text-slate-300 font-medium group"
                  >
                    <span>{srv?.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Related Industries */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                Relevant Industry Practices
              </h3>
              <div className="space-y-3">
                {resolvedIndustries.map((ind) => (
                  <a
                    key={ind?.id}
                    href={`/industries/${ind?.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/30 transition-all text-xs text-slate-300 font-medium group"
                  >
                    <span>{ind?.name} Industry Practice</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <CTASection
        title={locationRole.ctaHeadline || `Hire Vetted ${locationRole.roleName} for ${locationRole.countryName}`}
        subtitle={locationRole.ctaSubheadline || 'Schedule a technical consultation to access shortlisted, pre-vetted engineers ready to contribute to your roadmap.'}
        primaryButtonText="Schedule Technical Consultation"
        primaryButtonHref="#contact"
        secondaryButtonText="View Country Practice"
        secondaryButtonHref={`/locations/${locationRole.countrySlug}`}
      />
    </div>
  );
};
