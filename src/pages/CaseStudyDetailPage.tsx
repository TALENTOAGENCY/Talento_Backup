import React, { useMemo } from 'react';
import {
  Award,
  ShieldCheck,
  Building,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Share2,
  Calendar,
  Layers,
  Target,
  FileCheck,
  Briefcase
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { getCaseStudyBySlug, getAllCaseStudies } from '../data/caseStudies';
import { getServiceBySlug, getIndustryBySlug, getRoleBySlug } from '../data';
import { NotFoundPage } from './NotFoundPage';

interface CaseStudyDetailPageProps {
  slug: string;
  onBackToCaseStudies?: () => void;
  onBackToHome?: () => void;
  onNavigateCaseStudy?: (slug: string) => void;
  onNavigateService?: (slug: string) => void;
  onNavigateIndustry?: (slug: string) => void;
  onNavigateRole?: (slug: string) => void;
  onNavigateConsultation?: () => void;
}

export const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({
  slug,
  onBackToCaseStudies,
  onBackToHome,
  onNavigateCaseStudy,
  onNavigateService,
  onNavigateIndustry,
  onNavigateRole,
  onNavigateConsultation
}) => {
  const caseStudy = useMemo(() => getCaseStudyBySlug(slug), [slug]);

  if (!caseStudy) {
    return <NotFoundPage onBackToHome={onBackToHome} />;
  }

  const relatedServices = useMemo(() => {
    return (caseStudy.relatedServices || [])
      .map((s) => getServiceBySlug(s))
      .filter(Boolean);
  }, [caseStudy]);

  const relatedIndustries = useMemo(() => {
    return (caseStudy.relatedIndustries || [])
      .map((i) => getIndustryBySlug(i))
      .filter(Boolean);
  }, [caseStudy]);

  const relatedRoles = useMemo(() => {
    return (caseStudy.relatedRoles || [])
      .map((r) => getRoleBySlug(r))
      .filter(Boolean);
  }, [caseStudy]);

  const otherCaseStudies = useMemo(() => {
    return getAllCaseStudies().filter((c) => c.slug !== slug);
  }, [slug]);

  // Article / CaseStudy Schema.org JSON-LD
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'TALENTO Executive Search & Talent Advisory'
    },
    publisher: {
      '@type': 'Organization',
      name: 'TALENTO',
      url: 'https://talento.agency',
      logo: {
        '@type': 'ImageObject',
        url: 'https://talento.agency/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://talento.agency/case-studies/${caseStudy.slug}`
    },
    about: {
      '@type': 'Service',
      name: caseStudy.rolePlaced,
      serviceType: caseStudy.roleCategory,
      provider: {
        '@type': 'Organization',
        name: 'TALENTO'
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <SEO
        title={caseStudy.seo?.title || caseStudy.title}
        description={caseStudy.seo?.description || caseStudy.metaDescription}
        canonical={`https://talento.agency/case-studies/${caseStudy.slug}`}
        ogType="article"
        schemas={[caseStudySchema]}
      />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Case Studies', href: '/case-studies' },
              { label: caseStudy.name, href: `/case-studies/${caseStudy.slug}` }
            ]}
          />

          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {caseStudy.clientIndustry}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {caseStudy.roleCategory}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                ✅ Verified Placement
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {caseStudy.heroContent.headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {caseStudy.heroContent.subheadline}
            </p>
          </div>

          {/* Key Metrics Dashboard Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <span className="text-slate-400 text-xs block uppercase">Role Placed</span>
              <span className="text-sm sm:text-base font-bold text-white truncate block mt-0.5">
                {caseStudy.rolePlaced}
              </span>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <span className="text-slate-400 text-xs block uppercase">Shortlist Delivery</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400 block mt-0.5">
                {caseStudy.timeToShortlist || '10 Days'}
              </span>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <span className="text-slate-400 text-xs block uppercase">Full Mandate Timeline</span>
              <span className="text-base sm:text-lg font-bold text-blue-400 block mt-0.5">
                {caseStudy.timeToHire || '30 Days'}
              </span>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <span className="text-slate-400 text-xs block uppercase">Executive Retention</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400 block mt-0.5">
                {caseStudy.retentionRate || '100% Tenured'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Case Dossier Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* NDA Governance Seal */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong className="font-semibold text-amber-800 dark:text-amber-300">Confidentiality Protocol:</strong>{' '}
                {caseStudy.ndaDisclaimer || 'Client organization details and metrics are anonymized under mutual NDA standards.'}
              </div>
            </div>

            {/* Section 1: Executive Overview & Organization Context */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-emerald-600" />
                1. Organization Background & Search Situation
              </h2>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
                <div className="text-slate-500 dark:text-slate-400 font-mono text-xs mb-1">Engaging Entity Profile:</div>
                <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {caseStudy.isClientNameAuthorized && caseStudy.clientName
                    ? caseStudy.clientName
                    : caseStudy.clientAnonymizedDescription}
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {caseStudy.situation}
              </p>
              {Array.isArray(caseStudy.longDescription) && (
                <div className="space-y-2 pt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {caseStudy.longDescription.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Section 2: The Core Hiring Challenge */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" />
                2. The Hiring Challenge & Search Constraints
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {caseStudy.challenge}
              </p>
              {caseStudy.hiringChallenge && Array.isArray(caseStudy.hiringChallenge) && (
                <ul className="space-y-2.5 pt-2">
                  {caseStudy.hiringChallenge.map((ch, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        !
                      </span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Section 3: TALENTO Search & Vetting Approach */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                3. TALENTO Search Methodology & Candidate Vetting
              </h2>
              <div className="space-y-3">
                {(caseStudy.talentoApproach || caseStudy.approach || []).map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Measurable Outcomes & Strategic Impact */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                4. Measurable Placement Outcomes & Value Delivered
              </h2>
              <div className="space-y-3">
                {(caseStudy.outcomeDeliverables || caseStudy.outcome || []).map((res, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                      {res}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Authorized Client Testimonial */}
            {caseStudy.clientTestimonial && caseStudy.clientTestimonial.quote && (
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-md space-y-4">
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Client Endorsement & Executive Testimonial
                </div>
                <blockquote className="text-base sm:text-lg italic text-slate-200 leading-relaxed font-serif">
                  &ldquo;{caseStudy.clientTestimonial.quote}&rdquo;
                </blockquote>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div>
                    <div className="font-semibold text-white">{caseStudy.clientTestimonial.clientRole}</div>
                    <div>{caseStudy.clientTestimonial.companyType}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">
                    Authorized Endorsement
                  </span>
                </div>
              </div>
            )}

            {/* FAQs */}
            {caseStudy.faqs && caseStudy.faqs.length > 0 && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Mandate FAQs
                </h2>
                <FAQAccordion items={caseStudy.faqs} />
              </div>
            )}
          </div>

          {/* Sidebar & Cross-Entity Nav (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* CTA Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                Initiate a Similar Mandate
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Discuss your executive search or specialized hiring requirements with TALENTO’s practice partners under strict confidentiality.
              </p>
              <button
                onClick={() => {
                  if (onNavigateConsultation) onNavigateConsultation();
                  else window.location.href = '/consultation';
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Related Search Practices
                </h4>
                <div className="space-y-2">
                  {relatedServices.map((service) => (
                    <a
                      key={service.id}
                      href={`/services/${service.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigateService) onNavigateService(service.slug);
                      }}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-100 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between transition-colors group"
                    >
                      <span>{service.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Related Industries */}
            {relatedIndustries.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Related Industries
                </h4>
                <div className="space-y-2">
                  {relatedIndustries.map((ind) => (
                    <a
                      key={ind.id}
                      href={`/industries/${ind.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigateIndustry) onNavigateIndustry(ind.slug);
                      }}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-100 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between transition-colors group"
                    >
                      <span>{ind.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Other Case Studies */}
            {otherCaseStudies.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Other Case Studies
                </h4>
                <div className="space-y-2.5">
                  {otherCaseStudies.map((other) => (
                    <a
                      key={other.id}
                      href={`/case-studies/${other.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigateCaseStudy) onNavigateCaseStudy(other.slug);
                      }}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-100 dark:border-slate-700 text-xs block transition-colors group"
                    >
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block uppercase">
                        {other.clientIndustry}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white block mt-0.5 group-hover:text-emerald-600">
                        {other.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
