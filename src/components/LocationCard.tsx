import React from 'react';
import { Globe, ArrowRight, MapPin, Building, ShieldCheck } from 'lucide-react';
import type { LocationEntity } from '../types/content';

interface LocationCardProps {
  location: LocationEntity;
  onNavigate?: (slug: string) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, onNavigate }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(location.slug);
    }
  };

  return (
    <a
      href={`/locations/${location.slug}`}
      onClick={handleClick}
      className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 border border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />

      <div>
        {/* Header with Flag / Code & Region */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                {location.countryCode} • {location.region}
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                {location.name}
              </h3>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {location.isPhysicalOffice ? 'HQ Office' : 'Cross-Border'}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-6">
          {location.shortDescription}
        </p>

        {/* Corridors / Highlights */}
        {location.specializedCorridors && location.specializedCorridors.length > 0 && (
          <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-800/80">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block mb-2">
              Key Talent Corridors:
            </span>
            {location.specializedCorridors.slice(0, 2).map((corridor, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                <span className="line-clamp-1">{corridor}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
        <span>Explore Recruitment Practice</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
      </div>
    </a>
  );
};
