import React from 'react';
import {
  Users,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Code2,
  Layers,
  Building2,
  MapPin,
  HelpCircle,
  Compass,
  Award,
  Sparkles,
  Search,
  Check
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { RelatedServices } from '../components/RelatedServices';
import { RelatedIndustries } from '../components/RelatedIndustries';
import { RelatedLocations } from '../components/RelatedLocations';
import { RelatedRoles } from '../components/RelatedRoles';
import { getRoleBySlug, getRelatedEntities, rolesData } from '../data';
import type { RoleEntity } from '../types/content';

interface RoleDetailPageProps {
  slug: string;
  onBackToRoles?: () => void;
  onBackToHome?: () => void;
  onNavigateRole?: (slug: string) => void;
}

export const RoleDetailPage: React.FC<RoleDetailPageProps> = ({
  slug,
  onBackToRoles,
  onBackToHome,
  onNavigateRole
}) => {
  const role: RoleEntity = getRoleBySlug(slug) || rolesData[0];
  const relations = getRelatedEntities(role);

  // Schema for Role / JobPosting / Occupation recruitment page
  const occupationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${role.name} Recruitment & Headhunting`,
    description: role.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'TALENTO',
      url: 'https://www.talento.agency/'
    },
    serviceType: `${role.name} Talent Acquisition`,
    areaServed: ['BD', 'AE', 'SG', 'GB', 'US']
  };

  // FAQ schema
  const faqSchemaData =
    role.faqs && role.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: role.faqs.map((faq) => ({
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
    ? [occupationSchema, faqSchemaData]
    : [occupationSchema];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Roles', href: '/roles' },
    { label: role.name, href: `/roles/${role.slug}`, current: true }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <SEO
        title={role.title}
        description={role.metaDescription}
        canonical={role.canonicalUrl || `https://www.talento.agency/roles/${role.slug}`}
        ogType="article"
        schema={schemas}
        keywords={role.seoKeywords}
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
              <Users className="w-3.5 h-3.5" />
              {role.heroContent?.badge || `${role.department} Search`}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              Seniority: {role.seniorityLevel}
            </span>
            {role.averageTimeToHire && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                Avg. Shortlist: {role.averageTimeToHire}
              </span>
            )}
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                {role.heroContent?.headline || `Hire Proven ${role.name}`}
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8 font-light">
                {role.heroContent?.subheadline || role.shortDescription}
              </p>

              {role.heroContent?.highlights && role.heroContent.highlights.length > 0 && (
                <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  {role.heroContent.highlights.map((highlight, idx) => (
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
                    <h3 className="text-sm font-semibold text-white">Need to Hire {role.name}?</h3>
                    <p className="text-xs text-slate-400">Headhunting & Specialist Placement</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-xs text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Function</span>
                    <span className="font-medium text-slate-200">{role.department}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Search Model</span>
                    <span className="font-medium text-slate-200">Retained / Exclusive Contingent</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Vetting</span>
                    <span className="font-medium text-slate-200">Competency & Portfolio/Track-Record</span>
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
                  Request Candidate Shortlist
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Role Overview */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                01. Role Context & Strategic Importance
              </span>
              <h2 className="text-3xl font-bold text-white mb-6">
                The Strategic Role of {role.name}
              </h2>
              <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                {role.longDescription.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Core Competencies Evaluated
                </h3>
                <div className="flex flex-wrap gap-2">
                  {role.coreCompetencies.map((comp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-800/80 text-xs font-medium text-slate-300 border border-slate-700/60"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Rigorous Vetting Standards
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {role.vettingCriteria.map((criterion, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Typical Responsibilities */}
      {role.typicalResponsibilities && role.typicalResponsibilities.length > 0 && (
        <section className="py-20 border-b border-slate-800/60 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                02. Scope & Accountabilities
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Typical Responsibilities of {role.name}
              </h2>
              <p className="text-slate-400 text-sm">
                While exact day-to-day duties vary by company scale and maturity, key accountabilities typically center around these core domains:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {role.typicalResponsibilities.map((resp, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0 border border-amber-500/20">
                      0{idx + 1}
                    </span>
                    <p className="text-sm font-medium text-slate-200 group-hover:text-white leading-relaxed">
                      {resp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Skills Companies Look For */}
      {role.keySkills && role.keySkills.length > 0 && (
        <section className="py-20 border-b border-slate-800/60 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                03. Core Qualifications & Capabilities
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Key Skills Companies Look For
              </h2>
              <p className="text-slate-400 text-sm">
                The technical, analytical, and leadership benchmarks required to deliver high business impact in this discipline:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {role.keySkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 hover:border-amber-500/30 transition-colors"
                >
                  <Code2 className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium leading-relaxed">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Seniority Levels */}
      {role.seniorityLevels && role.seniorityLevels.length > 0 && (
        <section className="py-20 border-b border-slate-800/60 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                04. Career Tiers & Org Placement
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Seniority Levels We Recruit
              </h2>
              <p className="text-slate-400 text-sm">
                We calibrate recruitment according to stage of growth, team complexity, and budget expectations across multiple levels of seniority:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {role.seniorityLevels.map((lvl, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 relative hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {lvl.level}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Tier 0{idx + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{lvl.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">{lvl.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Executive-vetted profile matching</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Relevant Industries */}
      {relations.industries.length > 0 && (
        <RelatedIndustries
          industries={relations.industries}
          title={`Industry Applications for ${role.name}`}
          subtitle={`We specialize in recruiting ${role.name} across high-growth, venture-backed, and enterprise verticals.`}
          contextName={role.name}
        />
      )}

      {/* 6. TALENTO Recruitment Approach */}
      {role.talentoApproach && role.talentoApproach.length > 0 && (
        <section className="py-20 border-b border-slate-800/60 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                06. Sourcing & Evaluation Process
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Recruitment Methodology for {role.name}
              </h2>
              <p className="text-slate-400 text-sm">
                How we identify, screen, and deliver top-tier candidates who meet your exact technical, operational, and cultural standards:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {role.talentoApproach.map((step, idx) => (
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
      {role.faqs && role.faqs.length > 0 && (
        <section className="py-20 border-b border-slate-800/60 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                07. Common Inquiries
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions About Hiring {role.name}
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                Practical insights into search timelines, candidate vetting, market compensation benchmarks, and engagement models.
              </p>
            </div>

            <FAQAccordion faqs={role.faqs} />
          </div>
        </section>
      )}

      {/* Target Geographies & Corridors for this Role */}
      {relations.locations.length > 0 && (
        <RelatedLocations
          locations={relations.locations}
          roleSlug={role.slug}
          title={`Geographic Corridors for ${role.name}`}
          subtitle={`Discover international markets and dedicated country corridors where we place ${role.name.toLowerCase()}.`}
          contextName={role.name}
        />
      )}

      {/* Related Search Practices */}
      {relations.services.length > 0 && (
        <RelatedServices
          services={relations.services}
          title={`Search & Advisory Services for ${role.name}`}
          subtitle={`Strategic talent acquisition and advisory engagement models suited for ${role.name.toLowerCase()} mandates.`}
          contextName={role.name}
        />
      )}

      {/* 8. CTA */}
      <CTASection
        title={role.ctaContent?.headline || `Hire High-Impact ${role.name}`}
        subtitle={role.ctaContent?.subheadline || 'Connect with our specialized talent practice to access shortlisted, vetted candidates within 5 business days.'}
        primaryButtonText={role.ctaContent?.buttonText || 'Schedule Consultation'}
        primaryButtonHref="#contact"
        secondaryButtonText="View All Roles"
        secondaryButtonHref="/roles"
      />
    </div>
  );
};
