import React from 'react';
import { Building, ArrowRight, Users, MapPin, Briefcase } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { IndustryCard } from '../components/IndustryCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { industriesData } from '../data/industries';
import { servicesData } from '../data/services';
import { rolesData } from '../data/roles';
import { locationsData } from '../data/locations';

interface IndustriesPageProps {
  onBackToHome?: () => void;
  onNavigateIndustry?: (slug: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onBackToHome,
  onNavigateIndustry
}) => {
  const industriesPageFaqs = [
    {
      question: 'Does TALENTO specialize in specific industries or recruit across all sectors?',
      answer: 'We operate dedicated industry practices led by sector-specialist partners. Our core industry verticals include Technology & Startups, Apparel & RMG, Healthcare & Life Sciences, FMCG & Retail, Hospitality & Tourism, and NGO & International Development. Each practice is staffed by recruiters with deep domain expertise and active industry networks.'
    },
    {
      question: 'How does industry specialization improve executive search outcomes?',
      answer: 'Industry-specialist recruiters maintain ongoing relationships with passive senior leaders, understand sector-specific compensation structures, and can accurately assess candidates\' domain expertise. This produces higher-quality shortlists, faster placements, and stronger long-term retention compared to generalist recruitment approaches.'
    },
    {
      question: 'Can TALENTO handle executive searches for industries not listed on this page?',
      answer: 'Yes. While our listed verticals represent our deepest expertise, we have successfully completed executive mandates across financial services, energy, education, real estate, and logistics. Contact our Managing Partners to discuss your specific industry requirements.'
    },
    {
      question: 'Do you recruit for both multinational corporations and local enterprises?',
      answer: 'Yes. Our industry practices serve VC-backed startups, mid-market enterprises, large local conglomerates, and multinational corporation subsidiaries. We calibrate our search methodology, candidate pool, and compensation benchmarking to match each client\'s organizational context and hiring maturity.'
    },
    {
      question: 'How do you ensure genuinely industry-specific candidate assessment?',
      answer: 'Our sector-specialist partners conduct structured domain assessments that evaluate industry-specific competencies — such as ESG compliance for RMG, WHO-GMP familiarity for pharma, or donor compliance for NGOs — beyond generic leadership and cultural fit evaluations.'
    }
  ];

  // Industries listing schema
  const industriesListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TALENTO Industry Recruitment Practices',
    description: 'Specialized executive search and leadership recruitment across key industry verticals.',
    itemListElement: industriesData.map((industry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: `${industry.name} Executive Search`,
        description: industry.shortDescription,
        url: `https://www.talento.agency/industries/${industry.slug}`,
        provider: {
          '@id': 'https://www.talento.agency/#organization'
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <SEO
        title="Industry-Focused Executive Search & Recruitment | TALENTO"
        description="TALENTO delivers specialized executive search across Technology, Apparel & RMG, Healthcare, FMCG, Hospitality, and NGO sectors. Industry-specific recruitment expertise for senior leadership roles."
        canonicalUrl="https://www.talento.agency/industries"
        schemas={[industriesListSchema]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-talento-50/40 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 pt-28 pb-16 md:pt-32 md:pb-20 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', onClick: onBackToHome },
              { label: 'Industries', href: '/industries' }
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-talento-100/80 dark:bg-talento-950 border border-talento-200 dark:border-talento-800/60 mb-5">
              <Building className="w-4 h-4 text-talento-700 dark:text-talento-400" />
              <span className="text-xs font-semibold text-talento-800 dark:text-talento-300 uppercase tracking-wide">
                Industry Practices
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-5">
              Industry-Focused Executive Search & Recruitment
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              TALENTO operates dedicated industry practices, each led by sector-specialist partners with deep domain expertise. From venture-backed tech startups to multinational manufacturing conglomerates, our industry verticals ensure every search mandate benefits from genuine sector knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 md:py-20 bg-gray-50/50 dark:bg-gray-900/50" aria-label="Industries List">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesData.map((industry) => (
              <IndustryCard
                key={industry.id}
                industry={industry}
                onNavigate={onNavigateIndustry}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Linking: Services, Roles & Locations */}
      <section className="py-16 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
              Connected Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1.5 mb-3">
              Explore Related Search Practices & Talent Corridors
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Our industry expertise connects seamlessly with specialized service practices, leadership functions, and global talent markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Services Column */}
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800">
              <div className="flex items-center space-x-2 text-talento-600 dark:text-talento-400 mb-4 font-bold text-sm">
                <Briefcase className="w-5 h-5" />
                <span>Search Practices</span>
              </div>
              <ul className="space-y-2.5">
                {servicesData.map((svc) => (
                  <li key={svc.id}>
                    <a
                      href={`/services/${svc.slug}`}
                      className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-talento-600 dark:hover:text-talento-400 flex items-center justify-between group"
                    >
                      <span>{svc.name}</span>
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
        faqs={industriesPageFaqs}
        title="Industry Recruitment FAQ"
        subtitle="Common questions about our industry-focused executive search practices."
        className="bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200/80 dark:border-gray-800"
      />

      {/* CTA Section */}
      <CTASection
        title="Looking for Industry-Specialist Executive Recruiters?"
        description="Consult with our sector-specialist Managing Partners to discuss your leadership requirements, industry-specific hiring challenges, and search strategy."
        primaryButtonText="Book Industry Practice Briefing"
        primaryButtonHref="https://calendly.com/talentoagency2/30min"
        secondaryButtonText="Submit Hiring Inquiry"
        secondaryButtonHref="/#contact"
      />
    </div>
  );
};
