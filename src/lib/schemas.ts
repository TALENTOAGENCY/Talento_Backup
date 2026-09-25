export const BASE_URL = 'https://www.talento.agency';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  '@id': `${BASE_URL}/#organization`,
  name: 'TALENTO',
  alternateName: 'Talento Boutique Headhunting Agency',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/talento.hero.webp`,
  description:
    'TALENTO is a boutique headhunting firm specializing in executive search, leadership recruitment, and talent acquisition.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot 37, Floor 3, Road 11, Block H, Banani',
    addressLocality: 'Dhaka',
    postalCode: '1213',
    addressCountry: 'BD'
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+880 1973 591514',
      contactType: 'customer service',
      email: 'info@talento-glb.com',
      areaServed: ['BD', 'AE', 'SG', 'GB', 'US'],
      availableLanguage: ['English', 'Bengali']
    }
  ],
  sameAs: [
    'https://www.linkedin.com/company/talento-bespoke-premium-headhunting/'
  ]
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'TALENTO',
  description: 'Boutique Headhunting Agency | Executive Search & Leadership Recruitment',
  publisher: {
    '@id': `${BASE_URL}/#organization`
  }
};

export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'TALENTO Recruitment & Headhunting Services',
  itemListElement: [
    {
      '@type': 'Service',
      name: 'C-Suite Talent Hunt',
      description: 'Executive leadership recruitment for the highest organizational levels (CEO, CTO, CFO, COO).',
      provider: {
        '@id': `${BASE_URL}/#organization`
      },
      serviceType: 'Executive Search'
    },
    {
      '@type': 'Service',
      name: 'Premium Executive Search',
      description: 'Comprehensive search solutions for senior management and director positions.',
      provider: {
        '@id': `${BASE_URL}/#organization`
      },
      serviceType: 'Executive Search'
    },
    {
      '@type': 'Service',
      name: 'Interim Permanent Impact Recruitment',
      description: 'Strategic interim and permanent placement solutions for critical transition phases.',
      provider: {
        '@id': `${BASE_URL}/#organization`
      },
      serviceType: 'Interim Management Recruitment'
    },
    {
      '@type': 'Service',
      name: 'Business Critical & Niche Role Discovery',
      description: 'Specialized recruitment for mission-critical positions and unique skillsets.',
      provider: {
        '@id': `${BASE_URL}/#organization`
      },
      serviceType: 'Specialized Recruitment'
    },
    {
      '@type': 'Service',
      name: 'Specialist Talent Sourcing',
      description: 'Expert sourcing for highly specialized technical, healthcare, and commercial roles.',
      provider: {
        '@id': `${BASE_URL}/#organization`
      },
      serviceType: 'Technical Recruitment'
    },
    {
      '@type': 'Service',
      name: 'On-Demand Freelancer Search',
      description: 'Flexible expert talent solutions for project-based and advisory requirements.',
      provider: {
        '@id': `${BASE_URL}/#organization`
      },
      serviceType: 'Contract Recruitment'
    }
  ]
};
