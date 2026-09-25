import React from 'react';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { getRelatedInsights, insightsData } from '../data/insights';
import type { InsightEntity } from '../types/content';
import { InsightCard } from './InsightCard';

export interface RelatedInsightsProps {
  currentSlug?: string;
  category?: string;
  insights?: InsightEntity[];
  title?: string;
  subtitle?: string;
  layout?: 'grid' | 'sidebar' | 'compact';
  className?: string;
  limit?: number;
  onNavigate?: (slug: string) => void;
}

export const RelatedInsights: React.FC<RelatedInsightsProps> = ({
  currentSlug = '',
  category,
  insights,
  title = 'Related Market Intelligence & Hiring Guides',
  subtitle = 'Actionable benchmarks, compensation data, and executive search methodologies from our advisory practice.',
  layout = 'grid',
  className = '',
  limit = 3,
  onNavigate
}) => {
  let resolvedInsights: InsightEntity[] = [];

  if (insights && insights.length > 0) {
    resolvedInsights = insights;
  } else {
    resolvedInsights = getRelatedInsights(currentSlug, category, limit);
  }

  if (limit && resolvedInsights.length > limit) {
    resolvedInsights = resolvedInsights.slice(0, limit);
  }

  if (resolvedInsights.length === 0) return null;

  // Sidebar Layout
  if (layout === 'sidebar') {
    return (
      <div className={`p-6 rounded-2xl bg-slate-900/90 border border-slate-800 ${className}`}>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>{title}</span>
        </h3>
        <div className="space-y-4">
          {resolvedInsights.map((item) => (
            <a
              key={item.id}
              href={`/insights/${item.slug}`}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(item.slug);
                }
              }}
              className="block p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/30 transition-all group"
            >
              <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                {item.category} • {item.readingTimeMinutes} min
              </span>
              <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mb-1">
                {item.name}
              </h4>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-amber-400">
                Read Report <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Standard Grid Layout
  return (
    <section className={`py-16 border-b border-slate-800/60 bg-slate-950/60 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 block">
            Executive Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{title}</h2>
          {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resolvedInsights.map((item) => (
            <InsightCard
              key={item.id}
              insight={item}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedInsights;
