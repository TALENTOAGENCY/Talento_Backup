import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InsightCard } from '../components/InsightCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { insightsData } from '../data/insights';
import type { InsightEntity } from '../types/content';

interface InsightsPageProps {
  onBackToHome?: () => void;
  onNavigateInsight?: (slug: string) => void;
}

const CATEGORIES = [
  'All',
  'Market Report',
  'Hiring Guide',
  'Salary Trends',
  'Executive Search'
];

export const InsightsPage: React.FC<InsightsPageProps> = ({
  onBackToHome,
  onNavigateInsight
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredInsights = useMemo(() => {
    return insightsData.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.seo.keywords &&
          item.seo.keywords.some((k) =>
            k.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredInsight = useMemo(() => {
    return (
      filteredInsights.find((item) => item.category === 'Market Report') ||
      filteredInsights[0]
    );
  }, [filteredInsights]);

  const remainingInsights = useMemo(() => {
    if (!featuredInsight) return [];
    return filteredInsights.filter((item) => item.id !== featuredInsight.id);
  }, [filteredInsights, featuredInsight]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Insights & Market Reports', href: '/insights', current: true }
  ];

  // CollectionPage Structured Schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'TALENTO Insights: Market Reports, Salary Benchmarks & Executive Hiring Guides',
    description:
      'Executive research, compensation data, and hiring playbooks for technology scaleups, founders, and global enterprise leadership.',
    url: 'https://www.talento.agency/insights',
    publisher: {
      '@type': 'Organization',
      name: 'TALENTO',
      url: 'https://www.talento.agency/'
    },
    hasPart: insightsData.map((item) => ({
      '@type': 'Article',
      headline: item.name,
      description: item.metaDescription,
      url: `https://www.talento.agency/insights/${item.slug}`,
      datePublished: item.publishedAt,
      dateModified: item.updatedAt || item.publishedAt,
      author: {
        '@type': 'Organization',
        name: item.author.name
      }
    }))
  };

  const insightsPageFaqs = [
    {
      question: 'Where does TALENTO obtain its compensation and market data?',
      answer: 'Our insights synthesize proprietary data from over 3,500 executive candidate interviews, 450+ verified cross-border placements, and confidential disclosures from partner tech firms across South Asia, the US, UK, and UAE.'
    },
    {
      question: 'How frequently are salary benchmarks and hiring guides updated?',
      answer: 'We update our compensation models and market reports bi-annually to reflect rapid shifts in technology demand, currency dynamics, and global remote work trends.'
    },
    {
      question: 'Can our organization request a custom compensation benchmark for our headcount stage?',
      answer: 'Yes. Our talent advisory practice conducts bespoke executive compensation benchmarking tailored to your specific industry, funding round, and geographical footprint.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <SEO
        title="Executive Recruitment Insights, Salary Reports & Hiring Guides | TALENTO"
        description="Explore TALENTO's proprietary market intelligence reports, tech salary benchmarks, and C-suite hiring guides for fast-growing companies and founders."
        canonical="https://www.talento.agency/insights"
        ogType="website"
        schema={[collectionSchema]}
        keywords={[
          'executive recruitment insights',
          'tech salary report 2026',
          'hiring guides for founders',
          'cross-border recruitment report',
          'CTO compensation benchmark',
          'TALENTO market intelligence'
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.12),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-widest mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              <span>TALENTO Research & Advisory Practice</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Market Intelligence, Salary Reports & Hiring Playbooks
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light mb-8">
              Data-backed compensation benchmarks, executive vetting frameworks, and cross-border recruitment intelligence for modern founders and leadership teams.
            </p>

            {/* Search & Category Filter Bar */}
            <div className="space-y-4">
              <div className="relative max-w-xl">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, role, or keyword (e.g., CTO, Salary, Remote)..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                          : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles Listing */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredInsights.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80 p-8">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Reports Found</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                No market reports or hiring guides match your search criteria. Try selecting another category or clearing your search.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-semibold text-xs transition-colors hover:bg-amber-400"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Lead Report (if available and no specific narrow search) */}
              {featuredInsight && (
                <div className="mb-12">
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                    Featured Lead Intelligence
                  </span>
                  <InsightCard
                    insight={featuredInsight}
                    featured={true}
                    onNavigate={onNavigateInsight}
                  />
                </div>
              )}

              {/* Grid of Remaining Articles */}
              {remainingInsights.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <h2 className="text-2xl font-bold text-white">
                      {selectedCategory === 'All'
                        ? 'All Research & Playbooks'
                        : `${selectedCategory} Articles`}
                    </h2>
                    <span className="text-xs text-slate-400">
                      Showing {filteredInsights.length} report{filteredInsights.length === 1 ? '' : 's'}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remainingInsights.map((insight) => (
                      <InsightCard
                        key={insight.id}
                        insight={insight}
                        onNavigate={onNavigateInsight}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-slate-800/60 bg-slate-900/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
              Advisory & Methodology
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions About Our Research
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Learn how our executive intelligence practice compiles, verifies, and publishes benchmark data.
            </p>
          </div>

          <FAQAccordion faqs={insightsPageFaqs} />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Need Custom Compensation or Headcount Intelligence?"
        subtitle="Schedule a consultation with our Managing Partners to receive bespoke salary data and organizational benchmarking for your market."
        primaryButtonText="Request Custom Market Briefing"
        primaryButtonHref="https://calendly.com/talentoagency2/30min"
        secondaryButtonText="Submit Search Inquiry"
        secondaryButtonHref="/#contact"
      />
    </div>
  );
};

export default InsightsPage;
