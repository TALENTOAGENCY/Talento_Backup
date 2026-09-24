import React from 'react';
import {
  Users,
  ArrowRight,
  Code,
  Palette,
  Server,
  BarChart3,
  TrendingUp,
  Megaphone,
  UserCog,
  DollarSign
} from 'lucide-react';
import type { RoleEntity } from '../types/content';

interface RoleCardProps {
  role: RoleEntity;
  onNavigate?: (slug: string) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, onNavigate }) => {
  const getIcon = (slug: string) => {
    const iconClass = 'w-6 h-6 text-talento-600 dark:text-talento-400';
    switch (slug) {
      case 'software-engineers':
        return <Code className={iconClass} />;
      case 'product-designers':
        return <Palette className={iconClass} />;
      case 'platform-engineers':
        return <Server className={iconClass} />;
      case 'data-analysts':
        return <BarChart3 className={iconClass} />;
      case 'sales-leaders':
        return <TrendingUp className={iconClass} />;
      case 'marketing-leaders':
        return <Megaphone className={iconClass} />;
      case 'hr-leaders':
        return <UserCog className={iconClass} />;
      case 'finance-leaders':
        return <DollarSign className={iconClass} />;
      default:
        return <Users className={iconClass} />;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(role.slug);
    } else {
      window.history.pushState({}, '', `/roles/${role.slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-7 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-talento-500/50 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="p-3 rounded-xl bg-talento-50 dark:bg-talento-950/60 border border-talento-100 dark:border-talento-900/40 group-hover:scale-105 transition-transform">
            {getIcon(role.slug)}
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-talento-100/80 dark:bg-talento-950 text-talento-800 dark:text-talento-300 border border-talento-200/50 dark:border-talento-800/40">
            {role.department}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2.5 group-hover:text-talento-600 dark:group-hover:text-talento-400 transition-colors">
          <a href={`/roles/${role.slug}`} onClick={handleClick}>
            {role.name}
          </a>
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {role.shortDescription}
        </p>

        <div className="space-y-2 mb-6">
          <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Core Competencies:
          </div>
          {role.coreCompetencies.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
              <Users className="w-3.5 h-3.5 text-talento-600 dark:text-talento-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Timeline: {role.averageTimeToHire || '2-4 Weeks'}
        </span>

        <a
          href={`/roles/${role.slug}`}
          onClick={handleClick}
          className="inline-flex items-center text-xs font-bold text-talento-600 dark:text-talento-400 hover:text-talento-700 dark:hover:text-talento-300 group/link"
        >
          <span>View Role Details</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};
