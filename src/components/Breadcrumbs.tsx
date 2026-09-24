import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={`${item.name}-${index}`} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 mx-1.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />}
              {isLast ? (
                <span className="font-semibold text-talento-700 dark:text-talento-300" aria-current="page">
                  {item.name}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="flex items-center hover:text-talento-600 dark:hover:text-talento-400 transition-colors"
                >
                  {isFirst && <Home className="w-4 h-4 mr-1 inline-block" />}
                  {item.name}
                </button>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="flex items-center hover:text-talento-600 dark:hover:text-talento-400 transition-colors"
                >
                  {isFirst && <Home className="w-4 h-4 mr-1 inline-block" />}
                  {item.name}
                </a>
              ) : (
                <span className="flex items-center">
                  {isFirst && <Home className="w-4 h-4 mr-1 inline-block" />}
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
