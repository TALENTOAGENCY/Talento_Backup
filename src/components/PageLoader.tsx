import React from 'react';
import { Loader2 } from 'lucide-react';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-950 transition-colors">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-talento-200 dark:border-talento-900 border-t-talento-600 dark:border-t-talento-400 animate-spin" />
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
          Loading TALENTO Experience...
        </span>
      </div>
    </div>
  );
};
