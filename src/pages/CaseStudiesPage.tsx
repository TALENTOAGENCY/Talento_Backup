import React, { useState, useMemo } from 'react';
import {
  Award,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  Clock,
  TrendingUp,
  Building,
  CheckCircle2,
  Lock,
  Sparkles,
  Users,
  ChevronRight,
  Layers,
  FileCheck
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQAccordion } from '../components/FAQAccordion';
import { caseStudiesData } from '../data/caseStudies';
import type { CaseStudyEntity } from '../types/content';

interface CaseStudiesPageProps {
  onBackToHome?: () => void;
  onNavigateCaseStudy?: (slug: string) => void;
  onNavigateService?: (slug: string) => void;
  onNavigateIndustry?: (slug: string) => void;
  onNavigateConsultation?: () => void;
}

const CASE_STUDY_INDUSTRIES = [
  'All',
  'technology',
  'apparel',
  'healthcare'
];

const CASE_STUDY_FAQS = [
  {
    question: 'Why are certain client names and metrics anonymized in these case studies?',
    answer:
      'TALENTO operates under strict mutual non-disclosure agreements (NDAs) with corporate clients and executive candidates. To safeguard proprietary organizational reorganizations, competitive product timelines, and compensation data, specific identities are anonymized unless explicit written authorization has been granted.'
  },
  {
    question: 'Can prospective clients request verified references from past executive searches?',
    answer:
      'Yes. During confidential partner-level consultations, we can provide direct reference contacts and anonymized candidate placement dossiers from relevant industry practices under bilateral NDA.'
  },
  {
    question: 'What is TALENTO’s average time-to-shortlist for C-suite and specialist roles?',
    answer:
      'Across our retained executive search and specialist practices, an initial calibrated shortlist of 3 to 5 vetted leaders is typically delivered within 10 to 14 business days.'
  },
  {
    question: 'How do you guarantee candidate retention and performance after placement?',
    answer:
      'We offer comprehensive placement warranties backed by post-hire 30, 60, and 90-day onboarding checkpoints to ensure cultural and operational alignment.'
  }
];

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onBackToHome,
  onNavigateCaseStudy,
  onNavigateService,
  onNavigateIndustry,
  onNavigateConsultation
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCaseStudies = useMemo(() => {
    return caseStudiesData.filter((item) => {
      const matchesIndustry =
        selectedIndustry === 'All' ||
        item.industrySlug === selectedIndustry ||
        item.relatedIndustries?.includes(selectedIndustry);

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.rolePlaced.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.clientIndustry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.clientAnonymizedDescription.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesIndustry && matchesSearch;
    });
  }, [selectedIndustry, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <SEO
        title="Executive Search & Recruitment Case Studies | TALENTO Placements"
        description="Explore verified recruitment case studies and executive search outcomes across fintech, manufacturing, healthcare, and global tech corridors. Governed by strict client NDA standards."
        canonical="https://talento.agency/case-studies"
        ogType="website"
      />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Case Studies', href: '/case-studies' }
            ]}
          />

          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5" />
                Verified Practice Outcomes & Placements
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Recruitment Case Studies & Search Dossiers
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Examining real-world executive headhunting, cross-border technical team buildouts, and industrial leadership turnarounds across South Asia, UAE, UK, and US markets.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700 shrink-0">
              <div className="text-center px-3">
                <div className="text-2xl font-bold text-emerald-400">100%</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Retention Rate</div>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="text-center px-3">
                <div className="text-2xl font-bold text-blue-400">10–14d</div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Avg. Shortlist</div>
              </div>
            </div>
          </div>

          {/* Strict Client Privacy & NDA Guarantee Banner */}
          <div className="mt-8 p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="font-semibold text-white">Client Privacy & Non-Disclosure Governance:</strong>{' '}
              TALENTO operates under strict mutual confidentiality protocols. Case studies reflect genuine mandate requirements and verified placement outcomes. Client names and sensitive proprietary figures are anonymized where required by bilateral NDA covenants.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters & Search Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Industry Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Industry:
            </span>
            {CASE_STUDY_INDUSTRIES.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedIndustry === ind
                    ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {ind === 'All' ? 'All Practices' : ind.charAt(0).toUpperCase() + ind.slice(1)}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by role, industry, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Showing {filteredCaseStudies.length} verified placement records</span>
            <span>All mandates backed by retention warranty</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map((study) => (
              <div
                key={study.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all p-6 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {study.clientIndustry}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {study.roleCategory}
                    </span>
                  </div>

                  {/* Title & Role Placed */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      <a
                        href={`/case-studies/${study.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (onNavigateCaseStudy) onNavigateCaseStudy(study.slug);
                        }}
                      >
                        {study.name}
                      </a>
                    </h3>
                    <div className="mt-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      Role Placed: {study.rolePlaced}
                    </div>
                  </div>

                  {/* Client Context */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {study.isClientNameAuthorized && study.clientName
                        ? study.clientName
                        : study.clientAnonymizedDescription}
                    </div>
                    <p className="line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {study.situation}
                    </p>
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/60 text-center">
                      <span className="text-slate-400 block text-[10px] uppercase">Shortlist Delivery</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{study.timeToShortlist || '10 Days'}</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/60 text-center">
                      <span className="text-slate-400 block text-[10px] uppercase">Full Placement</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{study.timeToHire || '30 Days'}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  {study.heroContent.highlights && (
                    <div className="space-y-1.5 pt-1">
                      {study.heroContent.highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Testimonial Snippet if Authorized */}
                  {study.clientTestimonial && study.clientTestimonial.quote && (
                    <blockquote className="italic text-xs text-slate-500 dark:text-slate-400 border-l-2 border-emerald-500 pl-3 py-1 line-clamp-2">
                      &ldquo;{study.clientTestimonial.quote}&rdquo;
                    </blockquote>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Read Search Dossier <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Polished Proof & Confidential Dossier Access Framework */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Private Practice Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Looking for Verified Placements in Your Specific Vertical?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Due to strict NDA covenants with Fortune 500 multinationals, private equity firms, and stealth tech platforms, many of our C-suite and high-impact specialist placements cannot be published online.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              During a confidential partner consultation, we can walk you through relevant candidate scorecards, compensation benchmark models, and anonymized search dossiers matching your exact role criteria.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (onNavigateConsultation) onNavigateConsultation();
                  else window.location.href = '/consultation';
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm gap-2 cursor-pointer"
              >
                <span>Request Confidential Practice Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://calendly.com/talentoagency2/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors gap-2"
              >
                <span>Schedule 30-Min Call on Calendly</span>
              </a>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
              Frequently Asked Questions About Case Studies
            </h2>
            <FAQAccordion items={CASE_STUDY_FAQS} />
          </div>
        </div>
      </div>
    </div>
  );
};
