import React from 'react';
import { ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { getServiceBySlug, servicesData } from '../data';
import type { ServiceEntity } from '../types/content';

export interface RelatedServicesProps {
  serviceSlugs?: string[];
  services?: ServiceEntity[];
  title?: string;
  subtitle?: string;
  contextName?: string;
  layout?: 'grid' | 'cards' | 'sidebar' | 'compact';
  className?: string;
  limit?: number;
}

export const RelatedServices: React.FC<RelatedServicesProps> = ({
  serviceSlugs,
  services,
  title = 'Related Search & Talent Advisory Practices',
  subtitle = 'Strategic recruitment methodologies tailored to solve critical hiring bottlenecks and scale leadership capacity.',
  contextName,
  layout = 'grid',
  className = '',
  limit = 4
}) => {
  // Resolve service entities
  let resolvedServices: ServiceEntity[] = [];

  if (services && services.length > 0) {
    resolvedServices = services;
  } else if (serviceSlugs && serviceSlugs.length > 0) {
    resolvedServices = serviceSlugs
      .map((slug) => getServiceBySlug(slug))
      .filter((s): s is ServiceEntity => Boolean(s));
  } else {
    resolvedServices = servicesData.slice(0, limit);
  }

  if (limit && resolvedServices.length > limit) {
    resolvedServices = resolvedServices.slice(0, limit);
  }

  if (resolvedServices.length === 0) return null;

  // Sidebar Layout
  if (layout === 'sidebar') {
    return (
      <div className={`p-6 rounded-2xl bg-slate-900/90 border border-slate-800 ${className}`}>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span>{title}</span>
        </h3>
        <div className="space-y-3">
          {resolvedServices.map((service) => (
            <a
              key={service.id}
              href={`/services/${service.slug}`}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/30 transition-all text-xs text-slate-300 font-medium group"
              title={`Explore TALENTO's ${service.name} practice`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span className="group-hover:text-white transition-colors">{service.name}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Compact List Layout
  if (layout === 'compact') {
    return (
      <div className={`space-y-3 ${className}`}>
        {resolvedServices.map((service) => (
          <a
            key={service.id}
            href={`/services/${service.slug}`}
            className="flex items-start p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all group"
            title={`Read about ${service.name} practice overview`}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mr-3 border border-amber-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  {service.name}
                </h4>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>
          </a>
        ))}
      </div>
    );
  }

  // Standard Grid / Cards Layout
  return (
    <section className={`py-16 border-b border-slate-800/60 bg-slate-950/60 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 block">
            Practice Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {contextName ? `${title} for ${contextName}` : title}
          </h2>
          {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resolvedServices.map((service) => (
            <a
              key={service.id}
              href={`/services/${service.slug}`}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-lg shadow-black/20"
              title={`Explore TALENTO's ${service.name} recruitment model`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {service.engagementModel || 'Retained Search'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform">
                <span>Explore {service.name} Practice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;
