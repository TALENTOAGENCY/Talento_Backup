import React from 'react';
import { AlertCircle, ArrowLeft, Home, Globe, Briefcase, Users } from 'lucide-react';
import { SEO } from '../components/SEO';

interface NotFoundPageProps {
  onBackToHome?: () => void;
  message?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onBackToHome,
  message = 'The requested recruitment practice or location page does not exist or is currently unpublished.'
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <SEO
        title="404 - Page Not Found | TALENTO"
        description="The requested recruitment practice, location, or role page could not be found."
        noindex={true}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.12),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block mb-2">
          Error 404 • Resource Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Page Not Available
        </h1>
        <p className="text-sm text-slate-300 mb-8 leading-relaxed">
          {message}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8 text-xs font-medium">
          <a
            href="/services"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-amber-400 transition-colors flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Search Practices</span>
          </a>
          <a
            href="/industries"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-amber-400 transition-colors flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Industry Verticals</span>
          </a>
          <a
            href="/roles"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-amber-400 transition-colors flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>Talent Roles</span>
          </a>
          <a
            href="/locations"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-amber-400 transition-colors flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Global Corridors</span>
          </a>
        </div>

        <button
          onClick={onBackToHome}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-amber-500/20"
        >
          <Home className="w-4 h-4" />
          Return to Homepage
        </button>
      </div>
    </div>
  );
};
