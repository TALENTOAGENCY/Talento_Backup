import React from 'react';
import {
  Clock,
  Calendar,
  User,
  Linkedin,
  ArrowRight,
  ArrowLeft,
  Share2,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ShieldCheck,
  ListOrdered
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { RelatedServices } from '../components/RelatedServices';
import { RelatedIndustries } from '../components/RelatedIndustries';
import { RelatedLocations } from '../components/RelatedLocations';
import { RelatedInsights } from '../components/RelatedInsights';
import { NotFoundPage } from './NotFoundPage';
import { getInsightBySlug, insightsData, getRelatedEntities } from '../data';
import type { InsightEntity } from '../types/content';

interface InsightDetailPageProps {
  slug: string;
  onBackToInsights?: () => void;
  onBackToHome?: () => void;
  onNavigateInsight?: (slug: string) => void;
}

export const InsightDetailPage: React.FC<InsightDetailPageProps> = ({
  slug,
  onBackToInsights,
  onBackToHome,
  onNavigateInsight
}) => {
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return (
      <NotFoundPage
        onBackToHome={onBackToHome}
        message={`The market report or insight for "${slug}" could not be found in our publications.`}
      />
    );
  }

  const relations = getRelatedEntities(insight);

  const formattedPublishDate = new Date(insight.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedUpdateDate = insight.updatedAt
    ? new Date(insight.updatedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  const breadcrumbs = [
    { label: 'Home', href: '/', onClick: onBackToHome },
    { label: 'Insights', href: '/insights', onClick: onBackToInsights },
    { label: insight.name, href: `/insights/${insight.slug}`, current: true }
  ];

  // Article JSON-LD Structured Data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.name,
    description: insight.metaDescription,
    image: insight.seo.ogImage || 'https://www.talento.agency/talento.hero.webp',
    datePublished: insight.publishedAt,
    dateModified: insight.updatedAt || insight.publishedAt,
    author: {
      '@type': 'Person',
      name: insight.author.name,
      jobTitle: insight.author.role,
      url: insight.author.linkedInUrl || 'https://www.talento.agency'
    },
    publisher: {
      '@type': 'Organization',
      name: 'TALENTO',
      url: 'https://www.talento.agency/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.talento.agency/talento.hero.webp'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.talento.agency/insights/${insight.slug}`
    }
  };

  const faqSchemaData =
    insight.faqs && insight.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: insight.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        }
      : null;

  const schemas = faqSchemaData ? [articleSchema, faqSchemaData] : [articleSchema];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <SEO
        title={insight.seo.title || `${insight.name} | TALENTO Insights`}
        description={insight.seo.description || insight.metaDescription}
        canonical={insight.seo.canonicalUrl || `https://www.talento.agency/insights/${insight.slug}`}
        ogType="article"
        schema={schemas}
        keywords={insight.seo.keywords}
        ogImage={insight.seo.ogImage || 'https://www.talento.agency/talento.hero.webp'}
      />

      {/* Article Header & Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.12),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <Breadcrumbs items={breadcrumbs} />
            {onBackToInsights && (
              <button
                onClick={onBackToInsights}
                className="hidden sm:inline-flex items-center text-xs font-semibold text-amber-400 hover:underline gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All Publications
              </button>
            )}
          </div>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {insight.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {insight.readingTimeMinutes} min read
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Published {formattedPublishDate}
              </span>
              {formattedUpdateDate && (
                <span className="text-xs text-slate-500 font-medium">
                  (Updated {formattedUpdateDate})
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {insight.heroContent.headline || insight.name}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light mb-8">
              {insight.heroContent.subheadline || insight.shortDescription}
            </p>

            {/* Author Byline */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-800">
              {insight.author.avatarUrl ? (
                <img
                  src={insight.author.avatarUrl}
                  alt={insight.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-700 shadow-md"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                  <User className="w-6 h-6" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{insight.author.name}</h3>
                  {insight.author.linkedInUrl && (
                    <a
                      href={insight.author.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                      aria-label="Author LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-400">{insight.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Article Layout */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Highlights Box */}
              {insight.heroContent.highlights && insight.heroContent.highlights.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-lg shadow-amber-500/5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span>Executive Summary & Key Takeaways</span>
                  </div>
                  <div className="space-y-2.5">
                    {insight.heroContent.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-200 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Introduction Overview */}
              <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-base leading-relaxed">
                {Array.isArray(insight.longDescription) ? (
                  insight.longDescription.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p>{insight.longDescription}</p>
                )}
              </div>

              {/* Table of Contents (Mobile & Tablet) */}
              {insight.tableOfContents && insight.tableOfContents.length > 0 && (
                <div className="lg:hidden p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <ListOrdered className="w-4 h-4" />
                    <span>Table of Contents</span>
                  </h4>
                  <ul className="space-y-2">
                    {insight.tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-xs text-slate-300 hover:text-amber-400 transition-colors block"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Structured Content Sections */}
              <div className="space-y-12">
                {insight.contentSections.map((section, idx) => {
                  const sectionId =
                    insight.tableOfContents && insight.tableOfContents[idx]
                      ? insight.tableOfContents[idx].id
                      : `section-${idx + 1}`;

                  return (
                    <div
                      key={idx}
                      id={sectionId}
                      className="scroll-mt-24 space-y-4 border-t border-slate-800/80 pt-8"
                    >
                      <h2 className="text-2xl font-bold text-white tracking-tight">
                        {section.heading}
                      </h2>
                      <div className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                        {section.body}
                      </div>

                      {section.takeaways && section.takeaways.length > 0 && (
                        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 mt-4 space-y-2">
                          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                            Key Strategic Takeaways:
                          </span>
                          {section.takeaways.map((takeaway, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                              <span>{takeaway}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Author Box & Bio */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 flex items-start gap-4">
                {insight.author.avatarUrl ? (
                  <img
                    src={insight.author.avatarUrl}
                    alt={insight.author.name}
                    className="w-14 h-14 rounded-full object-cover border border-slate-700 shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700 shrink-0">
                    <User className="w-7 h-7" />
                  </div>
                )}
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Written by {insight.author.name}
                  </h4>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    {insight.author.role}. Leading proprietary research on compensation benchmarks, executive talent corridors, and organizational scaling across global commercial hubs.
                  </p>
                  {insight.author.linkedInUrl && (
                    <a
                      href={insight.author.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Table of Contents (Desktop Sticky) */}
              {insight.tableOfContents && insight.tableOfContents.length > 0 && (
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 sticky top-28">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ListOrdered className="w-4 h-4" />
                    <span>In This Report</span>
                  </h4>
                  <ul className="space-y-3 text-xs">
                    {insight.tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-slate-400 hover:text-amber-400 transition-colors block py-0.5 border-l-2 border-slate-800 hover:border-amber-400 pl-3"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 mt-6 border-t border-slate-800">
                    <a
                      href="https://calendly.com/talentoagency2/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-lg shadow-amber-500/20"
                    >
                      <span>Discuss Report with Partners</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Related Services in Sidebar */}
              {relations.services.length > 0 && (
                <RelatedServices
                  services={relations.services}
                  layout="sidebar"
                  title="Related Search Practices"
                />
              )}

              {/* Related Industries in Sidebar */}
              {relations.industries.length > 0 && (
                <RelatedIndustries
                  industries={relations.industries}
                  layout="sidebar"
                  title="Related Industry Verticals"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Market Corridors for this Insight */}
      {relations.locations.length > 0 && (
        <RelatedLocations
          locations={relations.locations}
          title="Talent Corridors Highlighted in this Report"
          subtitle="Explore the international hiring corridors and executive search markets analyzed in our research."
        />
      )}

      {/* Related Insights Section */}
      <RelatedInsights
        currentSlug={insight.slug}
        category={insight.category}
        title="More Market Reports & Hiring Playbooks"
        onNavigate={onNavigateInsight}
      />

      {/* FAQ Section */}
      {insight.faqs && insight.faqs.length > 0 && (
        <section className="py-20 border-t border-slate-800/60 bg-slate-900/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
                Report Questions
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <FAQAccordion faqs={insight.faqs} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection
        cta={insight.cta}
        title={insight.cta?.title || 'Need Custom Talent Intelligence?'}
        subtitle={insight.cta?.description || 'Schedule a briefing with our executive research practice to calibrate your hiring roadmap.'}
        primaryButtonText={insight.cta?.buttonText || 'Schedule Strategy Call'}
        primaryButtonHref="https://calendly.com/talentoagency2/30min"
        secondaryButtonText="Submit Search Mandate"
        secondaryButtonHref="/#contact"
      />
    </div>
  );
};

export default InsightDetailPage;
