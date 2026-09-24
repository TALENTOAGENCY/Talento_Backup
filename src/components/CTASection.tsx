import React from 'react';
import { ArrowRight, Calendar, Mail } from 'lucide-react';
import type { CTA } from '../types/content';

interface CTASectionProps {
  cta?: CTA;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  cta,
  title = cta?.title || 'Partner with TALENTO for Your Next Critical Search',
  description = cta?.description || 'Schedule a confidential consultation with our Managing Partners to discuss your leadership, technical, and strategic talent requirements.',
  primaryButtonText = cta?.buttonText || 'Schedule Search Consultation',
  primaryButtonHref = cta?.buttonHref || 'https://calendly.com/talentoagency2/30min',
  secondaryButtonText = 'Submit Search Mandate',
  secondaryButtonHref = '/#contact',
  className = ''
}) => {
  return (
    <section className={`py-16 ${className}`} aria-label="Call to action">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-talento-800 via-talento-700 to-talento-950 text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl border border-talento-600/30">
          {/* Subtle background ornamentation */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-talento-500/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-talento-100 uppercase tracking-wider mb-4">
              Executive Search & Talent Advisory
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-talento-100/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={primaryButtonHref}
                target={primaryButtonHref.startsWith('http') ? '_blank' : undefined}
                rel={primaryButtonHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-full sm:w-auto bg-white hover:bg-talento-50 text-talento-800 font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>{primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href={secondaryButtonHref}
                className="w-full sm:w-auto bg-talento-900/60 hover:bg-talento-900 text-white border border-white/20 font-semibold px-7 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>{secondaryButtonText}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
