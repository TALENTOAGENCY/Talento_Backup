import React from 'react';
import { Globe, ArrowRight, MapPin, Clock } from 'lucide-react';
import { getLocationBySlug, locationsData, isValidLocationRole, getRoleBySlug } from '../data';
import type { LocationEntity } from '../types/content';

export interface RelatedLocationsProps {
  locationSlugs?: string[];
  locations?: LocationEntity[];
  roleSlug?: string;
  title?: string;
  subtitle?: string;
  contextName?: string;
  layout?: 'grid' | 'cards' | 'sidebar' | 'compact';
  className?: string;
  limit?: number;
}

export const RelatedLocations: React.FC<RelatedLocationsProps> = ({
  locationSlugs,
  locations,
  roleSlug,
  title = 'Target Hiring Geographies & Talent Corridors',
  subtitle = 'Cross-border recruitment corridors and international talent hubs serving scaling enterprises globally.',
  contextName,
  layout = 'grid',
  className = '',
  limit = 5
}) => {
  // Resolve role details if roleSlug is provided
  const role = roleSlug ? getRoleBySlug(roleSlug) : undefined;
  const roleName = role?.name || contextName;

  // Resolve location entities
  let resolvedLocations: LocationEntity[] = [];

  if (locations && locations.length > 0) {
    resolvedLocations = locations;
  } else if (locationSlugs && locationSlugs.length > 0) {
    resolvedLocations = locationSlugs
      .map((slug) => getLocationBySlug(slug))
      .filter((loc): loc is LocationEntity => Boolean(loc));
  } else {
    resolvedLocations = locationsData.slice(0, limit);
  }

  if (limit && resolvedLocations.length > limit) {
    resolvedLocations = resolvedLocations.slice(0, limit);
  }

  if (resolvedLocations.length === 0) return null;

  // Helper to determine destination URL and descriptive anchor
  const getLocationLinkInfo = (location: LocationEntity) => {
    const hasCorridor = roleSlug ? isValidLocationRole(location.slug, roleSlug) : false;
    if (hasCorridor && roleSlug) {
      return {
        href: `/locations/${location.slug}/${roleSlug}`,
        anchorText: `Hire ${roleName} in ${location.name}`,
        badge: `${location.name} Corridor`
      };
    }
    return {
      href: `/locations/${location.slug}`,
      anchorText: `Explore ${location.name} Hub`,
      badge: location.region
    };
  };

  // Sidebar Layout
  if (layout === 'sidebar') {
    return (
      <div className={`p-6 rounded-2xl bg-slate-900/90 border border-slate-800 ${className}`}>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-amber-400" />
          <span>{title}</span>
        </h3>
        <div className="space-y-3">
          {resolvedLocations.map((location) => {
            const linkInfo = getLocationLinkInfo(location);
            return (
              <a
                key={location.id}
                href={linkInfo.href}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/30 transition-all text-xs text-slate-300 font-medium group"
                title={linkInfo.anchorText}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span className="group-hover:text-white transition-colors">{location.name}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact List Layout
  if (layout === 'compact') {
    return (
      <div className={`space-y-3 ${className}`}>
        {resolvedLocations.map((location) => {
          const linkInfo = getLocationLinkInfo(location);
          return (
            <a
              key={location.id}
              href={linkInfo.href}
              className="flex items-start p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all group"
              title={linkInfo.anchorText}
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mr-3 border border-amber-500/20">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    {location.name}
                  </h4>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {location.shortDescription}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  // Standard Grid / Cards Layout
  return (
    <section className={`py-16 border-b border-slate-800/60 bg-slate-950/60 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 block">
            Global Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {contextName ? `${title} for ${contextName}` : title}
          </h2>
          {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resolvedLocations.map((location) => {
            const linkInfo = getLocationLinkInfo(location);

            return (
              <a
                key={location.id}
                href={linkInfo.href}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-lg shadow-black/20"
                title={linkInfo.anchorText}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {linkInfo.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                    {location.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {location.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform">
                  <span>{linkInfo.anchorText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedLocations;
