import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label?: string;
  name?: string;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
  showHomeIcon = true
}) => {
  if (!items || items.length === 0) return null;

  // Schema.org BreadcrumbList structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const displayName = item.label || item.name || '';
      const fullUrl = item.href?.startsWith('http')
        ? item.href
        : `https://www.talento.agency${item.href?.startsWith('/') ? item.href : `/${item.href || ''}`}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: displayName,
        item: fullUrl
      };
    })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-xs sm:text-sm text-slate-400 dark:text-slate-400 ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1 sm:gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => {
            const displayName = item.label || item.name || '';
            const isLast = index === items.length - 1 || item.current;
            const isFirst = index === 0;

            return (
              <li
                key={`${displayName}-${index}`}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={String(index + 1)} />

                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-600 dark:text-slate-600 flex-shrink-0" />
                )}

                {isLast ? (
                  <span
                    className="font-medium text-amber-400 dark:text-amber-400 line-clamp-1"
                    aria-current="page"
                    itemProp="name"
                  >
                    {displayName}
                  </span>
                ) : item.onClick ? (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="flex items-center text-slate-400 hover:text-amber-400 dark:hover:text-amber-300 transition-colors"
                  >
                    {isFirst && showHomeIcon && (
                      <Home className="w-3.5 h-3.5 mr-1.5 inline-block text-slate-400" />
                    )}
                    <span itemProp="name">{displayName}</span>
                  </button>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className="flex items-center text-slate-400 hover:text-amber-400 dark:hover:text-amber-300 transition-colors"
                    itemProp="item"
                  >
                    {isFirst && showHomeIcon && (
                      <Home className="w-3.5 h-3.5 mr-1.5 inline-block text-slate-400" />
                    )}
                    <span itemProp="name">{displayName}</span>
                  </a>
                ) : (
                  <span className="flex items-center text-slate-400">
                    {isFirst && showHomeIcon && (
                      <Home className="w-3.5 h-3.5 mr-1.5 inline-block text-slate-400" />
                    )}
                    <span itemProp="name">{displayName}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
