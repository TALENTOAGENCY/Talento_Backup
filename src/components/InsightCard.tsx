import React from 'react';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';
import type { InsightEntity } from '../types/content';

export interface InsightCardProps {
  insight: InsightEntity;
  featured?: boolean;
  className?: string;
  onNavigate?: (slug: string) => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  featured = false,
  className = '',
  onNavigate
}) => {
  const formattedDate = new Date(insight.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Market Report':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Salary Trends':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Executive Search':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Hiring Guide':
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(insight.slug);
    }
  };

  if (featured) {
    return (
      <article
        className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all group shadow-2xl relative ${className}`}
      >
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getCategoryColor(
              insight.category
            )}`}
          >
            {insight.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {insight.readingTimeMinutes} min read
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {formattedDate}
          </span>
        </div>

        <a
          href={`/insights/${insight.slug}`}
          onClick={handleClick}
          className="block group-hover:text-amber-400 transition-colors"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
            {insight.name}
          </h2>
        </a>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 line-clamp-3">
          {insight.shortDescription}
        </p>

        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {insight.author.avatarUrl ? (
              <img
                src={insight.author.avatarUrl}
                alt={insight.author.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
                loading="lazy"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-white">{insight.author.name}</p>
              <p className="text-[11px] text-slate-400">{insight.author.role}</p>
            </div>
          </div>

          <a
            href={`/insights/${insight.slug}`}
            onClick={handleClick}
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all"
            aria-label={`Read report: ${insight.name}`}
          >
            <span>Read Market Intelligence Report</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-lg shadow-black/20 ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${getCategoryColor(
              insight.category
            )}`}
          >
            {insight.category}
          </span>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {insight.readingTimeMinutes} min
            </span>
          </div>
        </div>

        <a
          href={`/insights/${insight.slug}`}
          onClick={handleClick}
          className="block group-hover:text-amber-400 transition-colors mb-2"
        >
          <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2 leading-snug">
            {insight.name}
          </h3>
        </a>

        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6">
          {insight.shortDescription}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="text-[11px] text-slate-400">
          <span className="font-medium text-slate-300 block">{insight.author.name}</span>
          <span>{formattedDate}</span>
        </div>

        <a
          href={`/insights/${insight.slug}`}
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform"
          aria-label={`Read article: ${insight.name}`}
        >
          <span>Read Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};

export default InsightCard;
