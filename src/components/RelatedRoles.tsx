import React from 'react';
import { Users, ArrowRight, Code2, Award } from 'lucide-react';
import { getRoleBySlug, rolesData, isValidLocationRole, getLocationBySlug } from '../data';
import type { RoleEntity } from '../types/content';

export interface RelatedRolesProps {
  roleSlugs?: string[];
  roles?: RoleEntity[];
  countrySlug?: string;
  title?: string;
  subtitle?: string;
  contextName?: string;
  layout?: 'grid' | 'cards' | 'sidebar' | 'compact';
  className?: string;
  limit?: number;
}

export const RelatedRoles: React.FC<RelatedRolesProps> = ({
  roleSlugs,
  roles,
  countrySlug,
  title = 'Key Leadership & Specialist Roles',
  subtitle = 'Discover vetted talent benchmarks, core competencies, and search methodologies across high-demand functions.',
  contextName,
  layout = 'grid',
  className = '',
  limit = 4
}) => {
  // Resolve country details if countrySlug is provided
  const country = countrySlug ? getLocationBySlug(countrySlug) : undefined;
  const countryName = country?.name || contextName;

  // Resolve role entities
  let resolvedRoles: RoleEntity[] = [];

  if (roles && roles.length > 0) {
    resolvedRoles = roles;
  } else if (roleSlugs && roleSlugs.length > 0) {
    resolvedRoles = roleSlugs
      .map((slug) => getRoleBySlug(slug))
      .filter((r): r is RoleEntity => Boolean(r));
  } else {
    resolvedRoles = rolesData.slice(0, limit);
  }

  if (limit && resolvedRoles.length > limit) {
    resolvedRoles = resolvedRoles.slice(0, limit);
  }

  if (resolvedRoles.length === 0) return null;

  // Helper to determine destination URL and descriptive anchor
  const getRoleLinkInfo = (role: RoleEntity) => {
    const hasCorridor = countrySlug ? isValidLocationRole(countrySlug, role.slug) : false;
    if (hasCorridor && countrySlug) {
      return {
        href: `/locations/${countrySlug}/${role.slug}`,
        anchorText: `Hire ${role.name} in ${countryName}`,
        badge: `${countryName} Corridor`
      };
    }
    return {
      href: `/roles/${role.slug}`,
      anchorText: `View ${role.name} Benchmarks`,
      badge: role.department
    };
  };

  // Sidebar Layout
  if (layout === 'sidebar') {
    return (
      <div className={`p-6 rounded-2xl bg-slate-900/90 border border-slate-800 ${className}`}>
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-400" />
          <span>{title}</span>
        </h3>
        <div className="space-y-3">
          {resolvedRoles.map((role) => {
            const linkInfo = getRoleLinkInfo(role);
            return (
              <a
                key={role.id}
                href={linkInfo.href}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/30 transition-all text-xs text-slate-300 font-medium group"
                title={linkInfo.anchorText}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span className="group-hover:text-white transition-colors">{role.name}</span>
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
        {resolvedRoles.map((role) => {
          const linkInfo = getRoleLinkInfo(role);
          return (
            <a
              key={role.id}
              href={linkInfo.href}
              className="flex items-start p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all group"
              title={linkInfo.anchorText}
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mr-3 border border-amber-500/20">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    {role.name}
                  </h4>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {role.shortDescription}
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
            Functional Expertise
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {contextName ? `${title} for ${contextName}` : title}
          </h2>
          {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resolvedRoles.map((role) => {
            const linkInfo = getRoleLinkInfo(role);

            return (
              <a
                key={role.id}
                href={linkInfo.href}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-lg shadow-black/20"
                title={linkInfo.anchorText}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {linkInfo.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                    {role.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {role.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform">
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

export default RelatedRoles;
