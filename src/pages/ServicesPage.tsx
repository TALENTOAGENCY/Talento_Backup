import React from 'react';
import { ShieldCheck, ArrowRight, Building, Users, MapPin } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceCard } from '../components/ServiceCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { servicesData } from '../data/services';
import { industriesData } from '../data/industries';
import { rolesData } from '../data/roles';
import { locationsData } from '../data/locations';
import { servicesSchema } from '../lib/schemas';

interface ServicesPageProps {
  onBackToHome?: () => void;
  onNavigateService?: (slug: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onBackToHome,
  onNavigateService
}) => {
  const servicesPageFaqs = [
    {
      question: 'Which engagement model is best suited for our hiring needs?',
      answer: 'For board appointments, CEOs, and critical C-suite roles, our Retained Executive Search provides dedicated partner time and exhaustive market mapping. For functional technical specialists, our Contingency Search offers success-driven agility. For high-growth startups building new org charts, our Embedded Talent Advisory provides strategic benchmarking and full-lifecycle hiring roadmap design.'
    },
    {
      question: 'How does TALENTO source candidates who are not active on job boards?',
      answer: 'Over 80% of our placed candidates are passive executives. We utilize proprietary research mapping, confidential industry referrals, and discrete peer-level partner outreach rather than relying on public job postings.'
    },
    {
      question: 'What is the average timeline to receive a qualified candidate shortlist?',
      answer: 'For standard leadership searches, our partners deliver a calibrated shortlist of 3 to 5 rigorously vetted candidates within 10 to 14 business days.'
    },
    {
      question: 'Do you offer replacement guarantees on executive placements?',
      answer: 'Yes. We provide up to a 12-month replacement guarantee on retained C-suite appointments and standard 3 to 6-month guarantees on specialist and leadership placements.'
    },
    {
      question: 'Can TALENTO manage cross-border or international recruitment?',
      answer: 'Yes. Our cross-border search corridors actively connect companies with leadership and technical talent across Bangladesh, UAE/Dubai, Singapore, the United Kingdom, and the United States.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <SEO
        title="Specialized Recruitment & Executive Search Services | TALENTO"
        description="Explore TALENTO’s executive search, leadership recruitment, specialist sourcing, tech hiring, remote talent acquisition, and strategic talent advisory services."
        canonicalUrl="https://www.talento.agency/services"
        schemas={[servicesSchema]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-talento-50/40 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 pt-28 pb-16 md:pt-32 md:pb-20 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', onClick: onBackToHome },
              { label: 'Services', href: '/services' }
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-talento-100/80 dark:bg-talento-950 border border-talento-200 dark:border-talento-800/60 mb-5">
              <ShieldCheck className="w-4 h-4 text-talento-700 dark:text-talento-400" />
              <span className="text-xs font-semibold text-talento-800 dark:text-talento-300 uppercase tracking-wide">
                Specialized Search Practices
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-5">
              Executive Search & Strategic Recruitment Services
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              TALENTO delivers bespoke talent acquisition solutions tailored for high-growth scale-ups, multinational corporations, and established enterprises. Explore our 6 core recruitment practices below.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 md:py-20 bg-gray-50/50 dark:bg-gray-900/50" aria-label="Services List">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onNavigate={onNavigateService}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Internal Linking: Industries & Roles Matrix */}
      <section className="py-16 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
              Cross-Disciplinary Depth
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1.5 mb-3">
              Explore Related Practice Areas & Talent Corridors
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Our executive searches connect seamlessly across specialized industry verticals and leadership functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Industries Column */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800">
              <div className="flex items-center space-x-2 text-talento-600 dark:text-talento-400 mb-4 font-bold text-sm">
                <Building className="w-5 h-5" />
                <span>Industry Verticals</span>
              </div>
              <ul className="space-y-2.5">
                {industriesData.map((ind) => (
                  <li key={ind.id}>
                    <a
                      href={`/industries/${ind.slug}`}
                      className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-talento-600 dark:hover:text-talento-400 flex items-center justify-between group"
                    >
                      <span>{ind.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-talento-600 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Roles Column */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800">
              <div className="flex items-center space-x-2 text-talento-600 dark:text-talento-400 mb-4 font-bold text-sm">
                <Users className="w-5 h-5" />
                <span>Leadership Functions</span>
              </div>
              <ul className="space-y-2.5">
                {rolesData.map((role) => (
                  <li key={role.id}>
                    <a
                      href={`/roles/${role.slug}`}
                      className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-talento-600 dark:hover:text-talento-400 flex items-center justify-between group"
                    >
                      <span>{role.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-talento-600 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations Column */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800">
              <div className="flex items-center space-x-2 text-talento-600 dark:text-talento-400 mb-4 font-bold text-sm">
                <MapPin className="w-5 h-5" />
                <span>Geographic Hubs</span>
              </div>
              <ul className="space-y-2.5">
                {locationsData.map((loc) => (
                  <li key={loc.id}>
                    <a
                      href={`/locations/${loc.slug}`}
                      className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-talento-600 dark:hover:text-talento-400 flex items-center justify-between group"
                    >
                      <span>{loc.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-talento-600 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion
        faqs={servicesPageFaqs}
        title="Services & Search Practice FAQ"
        subtitle="Key insights into how our bespoke recruitment models and guarantees operate."
        className="bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200/80 dark:border-gray-800"
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Launch a Dedicated Search Mandate?"
        description="Consult with our Managing Partners to calibrate your leadership requirements, timeline, and compensation parameters."
        primaryButtonText="Book Executive Briefing"
        primaryButtonHref="https://calendly.com/talentoagency2/30min"
        secondaryButtonText="Submit Hiring Inquiry"
        secondaryButtonHref="/#contact"
      />
    </div>
  );
};
