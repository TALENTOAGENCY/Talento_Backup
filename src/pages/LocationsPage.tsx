import React from 'react';
import { Globe, ArrowRight, ShieldCheck, CheckCircle2, Building, Users, Clock, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { LocationCard } from '../components/LocationCard';
import { locationsData, servicesData, industriesData } from '../data';
import { CTASection } from '../components/CTASection';

interface LocationsPageProps {
  onBackToHome?: () => void;
  onNavigateLocation?: (slug: string) => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({
  onBackToHome,
  onNavigateLocation
}) => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'International Locations', href: '/locations', current: true }
  ];

  // Schema: ItemList for International Practice Hub
  const locationsListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TALENTO International Recruitment Corridors & Global Practice Markets',
    description: 'International recruitment practices, executive search corridors, and cross-border talent acquisition services by TALENTO.',
    itemListElement: locationsData.map((loc, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${loc.name} Recruitment Practice`,
      url: `https://www.talento.agency/locations/${loc.slug}`,
      description: loc.shortDescription
    }))
  };

  const hubFaqs = [
    {
      question: 'Where is TALENTO headquartered and where does it operate?',
      answer: 'TALENTO is headquartered in Dhaka, Bangladesh. We deliver cross-border executive search, specialist headhunting, and dedicated remote engineering talent acquisition for companies in the USA, UK, UAE, Canada, Australia, and regional emerging markets.'
    },
    {
      question: 'How does TALENTO handle cross-border hiring without local physical offices in every country?',
      answer: 'We operate through specialized international talent corridors, identifying and thoroughly vetting senior technical and leadership talent capable of working remotely, on-site via relocation, or through compliant global employment frameworks.'
    },
    {
      question: 'What time-zone alignments are supported for international clients?',
      answer: 'We evaluate candidates specifically for time-zone overlap. For North America (USA/Canada), candidates provide 4–6 hours of synchronous daytime overlap. For the UK and UAE, clients enjoy extensive real-time collaboration with minimal 0–4 hour offsets. For Australia, our talent network operates with near-complete business-hour alignment.'
    },
    {
      question: 'What is the vetting process for international placements?',
      answer: 'Every candidate undergoes multi-stage screening: functional/technical architecture assessments, live code/system design evaluations, communication testing for professional English fluency, and comprehensive reference verifications.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <SEO
        title="International Recruitment Practices & Global Talent Corridors | TALENTO"
        description="Explore TALENTO's international recruitment practices across the USA, UK, UAE, Canada, and Australia. Connecting global employers with vetted engineering and leadership talent."
        canonical="https://www.talento.agency/locations"
        schema={[locationsListSchema]}
        keywords={[
          'international recruitment agency',
          'cross border executive search',
          'hire global tech talent',
          'remote software engineering recruitment',
          'TALENTO international locations'
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.15),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest mb-6">
              <Globe className="w-3.5 h-3.5" />
              Global Corridors & Practice Markets
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Cross-Border Talent Acquisition Across Key Global Corridors
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light mb-8">
              TALENTO connects high-growth enterprises and tech organizations in the USA, UK, UAE, Canada, and Australia with rigorously vetted, senior engineering talent and specialized leaders.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 font-medium">Vetted Cross-Border Talent</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 font-medium">Time-Zone Synchronized</span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 font-medium">Replacement Protection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 block">
                Practice Markets
              </span>
              <h2 className="text-3xl font-bold text-white">
                Explore Country-Specific Talent Corridors
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Select a practice corridor below to review market hiring context, relevant roles, industry verticals, and international search methodologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationsData.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onNavigate={onNavigateLocation}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Operating Model & International Methodology */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
              International Delivery
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              How TALENTO Delivers Cross-Border Recruitment
            </h2>
            <p className="text-slate-400 text-sm">
              We operate as a high-precision executive search and talent advisory partner, enabling international employers to access vetted talent without regional friction:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 border border-amber-500/20">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Dedicated Talent Corridors</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We establish structured recruitment pipelines connecting employers in North America, Europe, the Middle East, and Asia-Pacific with high-concentration engineering ecosystems.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 border border-amber-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Time-Zone Calibration</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Candidates are screened for proven ability to work within required synchronous collaboration hours, ensuring active sprint communication and zero project delays.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 border border-amber-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Pre-Vetted Quality Standards</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every candidate is evaluated through live technical interviews, system architecture reviews, and rigorous English communication benchmarks before presentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 border-b border-slate-800/60 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 block">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              International Hiring & Cross-Border Recruitment
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Common questions from global founders, CTOs, and HR leaders regarding international search mandates and engagement models.
            </p>
          </div>

          <div className="space-y-4">
            {hubFaqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h3 className="text-base font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Build Your International Talent Pipeline?"
        subtitle="Connect with our global recruitment team to discuss hiring requirements for the US, UK, UAE, Canada, or Australia."
        primaryButtonText="Schedule Global Consultation"
        primaryButtonHref="#contact"
        secondaryButtonText="Explore Search Practices"
        secondaryButtonHref="/services"
      />
    </div>
  );
};
