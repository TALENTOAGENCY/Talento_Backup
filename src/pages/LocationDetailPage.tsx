import React from 'react';
import {
  Globe,
  ArrowRight,
  ArrowLeft,
  Building,
  Users,
  Briefcase,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Sparkles,
  Search,
  Check,
  Compass,
  MapPin
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { getLocationBySlug, getRelatedEntities, locationsData } from '../data';
import type { LocationEntity } from '../types/content';

interface LocationDetailPageProps {
  slug: string;
  onBackToLocations?: () => void;
  onBackToHome?: () => void;
  onNavigateLocation?: (slug: string) => void;
}

export const LocationDetailPage: React.FC<LocationDetailPageProps> = ({
  slug,
  onBackToLocations,
  onBackToHome,
  onNavigateLocation
}) => {
  const location: LocationEntity = getLocationBySlug(slug) || locationsData[0];
  const relations = getRelatedEntities(location);

  // Schema for International Service Practice
  const locationServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `TALENTO Cross-Border Recruitment - ${location.name}`,
    description: location.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'TALENTO',
      url: 'https://www.talento.agency/'
    },
    serviceType: `Executive Search & Cross-Border Recruitment for ${location.name}`,
    areaServed: location.countryCode
  };

  // FAQ Schema
  const faqSchemaData =
    location.faqs && location.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: location.faqs.map((faq) => ({
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
    ? [locationServiceSchema, faqSchemaData]
    : [locationServiceSchema];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
    { label: location.name, href: `/locations/${location.slug}`, current: true }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <SEO
        title={location.title}
        description={location.metaDescription}
        canonical={location.canonicalUrl || `https://www.talento.agency/locations/${location.slug}`}
        ogType="article"
        schema={schemas}
        keywords={location.seoKeywords}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.12),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest">
              <Globe className="w-3.5 h-3.5" />
              {location.heroContent?.badge || `${location.name} Practice`}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              Region: {location.region}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-950/40 text-amber-400 border border-amber-800/40">
              {location.isPhysicalOffice ? 'Headquarters' : 'Cross-Border Search Corridor'}
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                {location.heroContent?.headline || `Cross-Border Recruitment for ${location.name}`}
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8 font-light">
                {location.heroContent?.subheadline || location.shortDescription}
              </p>

              {location.heroContent?.highlights && location.heroContent.highlights.length > 0 && (
                <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  {location.heroContent.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{highlight}</span>
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
                    <h3 className="text-sm font-semibold text-white">Hiring for {location.name}?</h3>
                    <p className="text-xs text-slate-400">Cross-Border & Dedicated Search</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-xs text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Operating Model</span>
                    <span className="font-medium text-slate-200 text-right">
                      {location.operatingModel || 'Cross-Border Search'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Headquarters</span>
                    <span className="font-medium text-slate-200">Dhaka, Bangladesh</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Vetting</span>
                    <span className="font-medium text-slate-200">Technical & Communication</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Guarantee</span>
                    <span className="font-medium text-emerald-400">Replacement Protection</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-amber-500/20"
                >
                  Initiate Practice Mandate
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Country-Specific Recruitment Introduction */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                01. Market Introduction & Search Corridor
              </span>
              <h2 className="text-3xl font-bold text-white mb-6">
                Talent Acquisition for {location.name} Organizations
              </h2>
              <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                {location.longDescription.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              {location.specializedCorridors && location.specializedCorridors.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-amber-400" />
                    Specialized Talent Corridors
                  </h3>
                  <div className="space-y-2.5">
                    {location.specializedCorridors.map((corridor, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs font-medium text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{corridor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  Operating Model Transparency
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  TALENTO operates out of its primary headquarters in Dhaka, Bangladesh, executing cross-border recruitment and international headhunting mandates for companies hiring in or for the {location.name} market.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hiring Context */}
      {location.hiringContext && location.hiringContext.length > 0 && (
        <section className="py-20 border-b border-slate-800/60 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                02. Market Dynamics
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Hiring Context & Demand Drivers in {location.name}
              </h2>
              <p className="text-slate-400 text-sm">
                Key talent dynamics, operational requirements, and strategic considerations shaping recruitment for this market:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {location.hiringContext.map((item, idx) => (
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
      )}

      {/* 3. Relevant Roles */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
              03. High-Demand Roles
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Key Roles Sourced for {location.name} Companies
            </h2>
            <p className="text-slate-400 text-sm">
              We specialize in placing senior individual contributors, lead architects, and cross-functional leadership:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relations.roles.map((r) => (
              <a
                key={r.id}
                href={`/roles/${r.slug}`}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-3 border border-amber-500/20 group-hover:scale-105 transition-transform">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block mb-1">
                    {r.department}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                    {r.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {r.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>View Role Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Relevant Industries */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
              04. Sector Focus
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Industry Verticals Served in {location.name}
            </h2>
            <p className="text-slate-400 text-sm">
              Our cross-border headhunting practices cater to fast-growing and enterprise sectors:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relations.industries.map((ind) => (
              <a
                key={ind.id}
                href={`/industries/${ind.slug}`}
                className="group p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 border border-amber-500/20 group-hover:scale-110 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {ind.shortDescription}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Industry Practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TALENTO Services */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
              05. Search Practices
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Recruitment Services for {location.name} Mandates
            </h2>
            <p className="text-slate-400 text-sm">
              Tailored search and advisory models matching your growth stage and operational goals:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relations.services.map((srv) => (
              <a
                key={srv.id}
                href={`/services/${srv.slug}`}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-3 border border-amber-500/20 group-hover:scale-105 transition-transform">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {srv.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Practice Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. International Recruitment Approach */}
      {location.recruitmentApproach && location.recruitmentApproach.length > 0 && (
        <section className="py-20 border-b border-slate-800/60 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                06. Delivery Methodology
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Our International Search Process for {location.name}
              </h2>
              <p className="text-slate-400 text-sm">
                How we identify, evaluate, and deliver top-tier international talent aligned with your team's rhythm:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {location.recruitmentApproach.map((step, idx) => (
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
      )}

      {/* 7. FAQs */}
      {location.faqs && location.faqs.length > 0 && (
        <section className="py-20 border-b border-slate-800/60 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                07. Practical Information
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions Regarding {location.name} Searches
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                Direct insights on delivery models, working hour overlaps, vetting standards, and engagement options.
              </p>
            </div>

            <FAQAccordion faqs={location.faqs} />
          </div>
        </section>
      )}

      {/* 8. CTA */}
      <CTASection
        title={location.ctaContent?.headline || `Build Your Global Pipeline for ${location.name}`}
        subtitle={location.ctaContent?.subheadline || 'Connect with our cross-border recruitment team to access shortlisted, pre-vetted candidates within 5 to 7 business days.'}
        primaryButtonText={location.ctaContent?.buttonText || 'Schedule Consultation'}
        primaryButtonHref="#contact"
        secondaryButtonText="View All Locations"
        secondaryButtonHref="/locations"
      />
    </div>
  );
};
