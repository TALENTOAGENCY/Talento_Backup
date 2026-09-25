import React from 'react';
import { Users, ArrowRight, Building, Briefcase, MapPin } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RoleCard } from '../components/RoleCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { rolesData } from '../data/roles';
import { servicesData } from '../data/services';
import { industriesData } from '../data/industries';
import { locationsData } from '../data/locations';

interface RolesPageProps {
  onBackToHome?: () => void;
  onNavigateRole?: (slug: string) => void;
}

export const RolesPage: React.FC<RolesPageProps> = ({
  onBackToHome,
  onNavigateRole
}) => {
  const rolesPageFaqs = [
    {
      question: 'Does TALENTO recruit for individual contributor roles or only leadership positions?',
      answer: 'We recruit across multiple seniority levels — from senior individual contributors (Senior Engineers, Senior Designers) through team leads and directors to VP and C-suite executives. Our role pages detail the specific seniority tiers we support for each function.'
    },
    {
      question: 'How does role specialization improve recruitment outcomes?',
      answer: 'Role-specialized recruiters understand the specific competencies, vetting criteria, and market dynamics for each function. This produces higher-quality shortlists, more accurate compensation benchmarking, and better culture fit assessment compared to generalist recruitment.'
    },
    {
      question: 'Can TALENTO recruit for roles not listed on this page?',
      answer: 'Yes. The roles listed here represent our most active search verticals. We regularly recruit for additional functions including legal, supply chain, operations, and specialized technical roles. Contact our team to discuss your specific requirements.'
    },
    {
      question: 'How do you assess candidates for cross-functional collaboration?',
      answer: 'Beyond functional expertise, we evaluate candidates\' track record working across departments — their communication style, stakeholder management skills, and ability to drive outcomes in matrixed organizational structures.'
    },
    {
      question: 'What is the typical timeline for role-specific recruitment?',
      answer: 'Timelines vary by seniority and specialization. Senior individual contributor roles typically complete in 2-4 weeks, while VP and C-suite leadership searches require 4-8 weeks for comprehensive market mapping and executive assessment.'
    }
  ];

  const rolesListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TALENTO Role-Based Recruitment Specializations',
    description: 'Specialized recruitment across key functional roles and leadership positions.',
    itemListElement: rolesData.map((role, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Occupation',
        name: role.name,
        description: role.shortDescription,
        url: `https://www.talento.agency/roles/${role.slug}`,
        occupationalCategory: role.department
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <SEO
        title="Role-Based Recruitment & Talent Specializations | TALENTO"
        description="TALENTO recruits across key functional roles: Software Engineers, Product Designers, Platform Engineers, Data Analysts, Sales Leaders, Marketing Leaders, HR Leaders, and Finance Leaders."
        canonicalUrl="https://www.talento.agency/roles"
        schemas={[rolesListSchema]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-talento-50/40 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 pt-28 pb-16 md:pt-32 md:pb-20 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', onClick: onBackToHome },
              { label: 'Roles', href: '/roles' }
            ]}
          />

          <div className="max-w-3xl mt-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-talento-100/80 dark:bg-talento-950 border border-talento-200 dark:border-talento-800/60 mb-5">
              <Users className="w-4 h-4 text-talento-700 dark:text-talento-400" />
              <span className="text-xs font-semibold text-talento-800 dark:text-talento-300 uppercase tracking-wide">
                Talent Specializations
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-5">
              Role-Based Recruitment & Talent Search
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              TALENTO recruits across key functional roles — from senior software engineers and product designers to commercial leaders and C-suite executives. Each recruitment specialization is supported by role-specific assessment frameworks, competency benchmarking, and market-calibrated compensation data.
            </p>
          </div>
        </div>
      </section>

      {/* Roles Grid */}
      <section className="py-16 md:py-20 bg-gray-50/50 dark:bg-gray-900/50" aria-label="Roles List">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rolesData.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                onNavigate={onNavigateRole}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Linking: Services, Industries & Locations */}
      <section className="py-16 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-talento-600 dark:text-talento-400 text-xs font-semibold tracking-wider uppercase">
              Connected Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1.5 mb-3">
              Explore Related Services, Industries & Markets
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Our role-based recruitment connects with specialized service practices, industry verticals, and global talent markets.
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
        faqs={rolesPageFaqs}
        title="Role-Based Recruitment FAQ"
        subtitle="Common questions about our functional talent specializations and recruitment process."
        className="bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200/80 dark:border-gray-800"
      />

      {/* CTA Section */}
      <CTASection
        title="Need Talent for a Specific Role?"
        description="Consult with our role-specialist recruiters to discuss your hiring requirements, seniority expectations, and compensation benchmarking."
        primaryButtonText="Book Talent Consultation"
        primaryButtonHref="https://calendly.com/talentoagency2/30min"
        secondaryButtonText="Submit Hiring Inquiry"
        secondaryButtonHref="/#contact"
      />
    </div>
  );
};
