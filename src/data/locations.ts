import { LocationEntity } from '../types/content';

export const locationsData: LocationEntity[] = [
  {
    id: 'loc-bangladesh',
    slug: 'bangladesh',
    name: 'Bangladesh',
    title: 'Executive Search & Leadership Recruitment in Bangladesh | TALENTO',
    metaDescription: 'Leading executive search and talent advisory in Dhaka, Bangladesh. Headhunting C-suite executives, senior tech leaders, and industrial heads.',
    shortDescription: 'Premier executive search, C-suite headhunting, and specialized talent recruitment headquarters in Dhaka, Bangladesh.',
    longDescription: [
      'Bangladesh is one of South Asia’s fastest-growing economies, driven by massive manufacturing scale, rapid digital adoption, and a burgeoning tech ecosystem.',
      'Headquartered in Dhaka, TALENTO is the trusted executive search partner for top multinational corporations, leading conglomerates, financial institutions, and venture-funded startups across Bangladesh.'
    ],
    heroContent: {
      headline: 'Executive Search & Talent Advisory in Bangladesh',
      subheadline: 'Connecting high-growth enterprises and multinationals with top executive leadership across Dhaka and Bangladesh.',
      badge: 'Headquarters & South Asia Hub',
      highlights: [
        'Decades of collective executive mapping across Bangladesh’s top corporate groups',
        'Physical presence in Dhaka with local corporate governance expertise',
        'Cross-border search connecting Bangladeshi diaspora executives with home market opportunities'
      ]
    },
    country: 'Bangladesh',
    countryCode: 'BD',
    city: 'Dhaka',
    region: 'South Asia',
    isPhysicalOffice: true,
    officeAddress: 'Level 4, Gulshan 2, Dhaka 1212, Bangladesh',
    compensationInsights: [
      { role: 'Chief Executive Officer (CEO)', range: 'BDT 5,000,000 - 15,000,000+ / yr', currency: 'BDT' },
      { role: 'Chief Technology Officer (CTO)', range: 'BDT 3,500,000 - 9,000,000+ / yr', currency: 'BDT' },
      { role: 'Chief Operating Officer (COO) - RMG', range: 'BDT 4,000,000 - 10,000,000+ / yr', currency: 'BDT' },
      { role: 'Head of Product / VP Eng', range: 'BDT 2,500,000 - 6,000,000+ / yr', currency: 'BDT' }
    ],
    regulatoryCompliance: [
      'Bangladesh Labour Act (2006) & Labour Rules (2015)',
      'National Provident Fund & Gratuity Governance',
      'Expatriate Work Permit & BIDA Visa Processing Guidelines'
    ],
    faqs: [
      {
        question: 'Where is TALENTO’s primary office located in Dhaka?',
        answer: 'Our main talent advisory and executive search office is located in Gulshan 2, Dhaka.'
      },
      {
        question: 'Do you help recruit Bangladeshi expatriates returning to Bangladesh?',
        answer: 'Yes, we run specialized diaspora repatriation searches to bring seasoned overseas executives into local leadership roles.'
      }
    ],
    relatedServices: ['c-suite-talent-hunt', 'executive-search', 'interim-impact-recruitment', 'specialist-talent-sourcing'],
    relatedIndustries: ['apparel-textiles', 'tech-startups', 'fmcg-marketplaces', 'healthcare-life-sciences'],
    relatedRoles: ['chief-executive-officer-ceo', 'chief-technology-officer-cto', 'chief-operating-officer-coo', 'chief-financial-officer-cfo'],
    cta: {
      title: 'Partner with Bangladesh’s Premier Search Firm',
      description: 'Schedule a confidential executive consultation with our Dhaka advisory team.',
      buttonText: 'Contact Dhaka Office',
      buttonHref: '/contact',
      variant: 'primary'
    },
    seo: {
      title: 'Executive Search & Headhunting in Bangladesh | TALENTO Dhaka',
      description: 'Find senior executives and tech leaders in Dhaka, Bangladesh with TALENTO’s executive recruitment practice.',
      keywords: ['executive search Bangladesh', 'headhunters in Dhaka', 'C-suite recruitment Bangladesh', 'hire CTO Dhaka', 'TALENTO Bangladesh']
    }
  },
  {
    id: 'loc-uae',
    slug: 'uae',
    name: 'United Arab Emirates (UAE & Middle East)',
    title: 'Executive Search & Cross-Border Recruitment in UAE & Dubai | TALENTO',
    metaDescription: 'Executive headhunting and cross-border talent acquisition connecting UAE/GCC enterprises with regional and international leadership talent.',
    shortDescription: 'Cross-border executive search connecting Gulf/UAE enterprises with senior tech, finance, and operational leaders.',
    longDescription: [
      'The UAE has cemented its position as the premier business and technology gateway connecting the Middle East, South Asia, and Africa.',
      'TALENTO provides cross-border executive search for Dubai and Abu Dhabi enterprises seeking tech leaders, digital transformation executives, and commercial managers.'
    ],
    heroContent: {
      headline: 'Executive Search for UAE & Middle East Markets',
      subheadline: 'Placing world-class leadership across Dubai, Abu Dhabi, and the wider GCC region.',
      badge: 'GCC & Middle East Practice',
      highlights: [
        'Dedicated talent corridors between UAE, South Asia, and Europe',
        'Expertise in UAE Green Visa, Golden Visa, and Free Zone employment regulations',
        'Specialized headhunting for fintech, real estate tech, and regional logistics giants'
      ]
    },
    country: 'United Arab Emirates',
    countryCode: 'AE',
    city: 'Dubai',
    region: 'Middle East & GCC',
    isPhysicalOffice: false,
    compensationInsights: [
      { role: 'Chief Technology Officer (CTO)', range: 'AED 45,000 - 85,000 / mo', currency: 'AED' },
      { role: 'Chief Financial Officer (CFO)', range: 'AED 50,000 - 90,000 / mo', currency: 'AED' },
      { role: 'VP of Engineering', range: 'AED 35,000 - 65,000 / mo', currency: 'AED' }
    ],
    regulatoryCompliance: [
      'UAE Federal Decree-Law No. 33 on Regulation of Labour Relations',
      'DIFC & ADGM Employment Regulations',
      'Ministry of Human Resources and Emiratisation (MOHRE) Protocols'
    ],
    faqs: [
      {
        question: 'How do you support companies hiring talent in Dubai and Abu Dhabi?',
        answer: 'We provide full lifecycle executive headhunting, candidate relocation advisory, and compensation structuring for tax-free remuneration packages.'
      }
    ],
    relatedServices: ['executive-search', 'c-suite-talent-hunt', 'on-demand-freelancer-search'],
    relatedIndustries: ['tech-startups', 'fmcg-marketplaces'],
    relatedRoles: ['chief-technology-officer-cto', 'chief-financial-officer-cfo', 'head-of-product'],
    cta: {
      title: 'Hire Senior Leadership for UAE & GCC',
      description: 'Discuss your Middle East recruitment mandates with our cross-border search practice.',
      buttonText: 'Inquire for UAE Search',
      buttonHref: '/contact',
      variant: 'primary'
    },
    seo: {
      title: 'Executive Search & Headhunting UAE | TALENTO Dubai Recruitment',
      description: 'Recruit executive leadership and technical talent for UAE and Dubai companies with TALENTO cross-border search.',
      keywords: ['executive search UAE', 'Dubai headhunters', 'tech recruitment Dubai', 'hire CTO UAE', 'GCC executive search']
    }
  },
  {
    id: 'loc-singapore',
    slug: 'singapore',
    name: 'Singapore & Southeast Asia',
    title: 'Executive Search & Tech Headhunting in Singapore | TALENTO',
    metaDescription: 'Executive headhunting and talent solutions for Singapore tech startups, regional headquarters, and APAC enterprises.',
    shortDescription: 'Executive search and engineering headhunting for Southeast Asia’s premier financial and technology hub.',
    longDescription: [
      'Singapore remains the definitive innovation and venture capital hub for Southeast Asia, attracting global enterprises and high-growth scale-ups.',
      'TALENTO assists Singapore-based headquarters in sourcing regional C-suite leaders and distributed engineering talent across the APAC region.'
    ],
    heroContent: {
      headline: 'Executive Search & Talent Acquisition in Singapore',
      subheadline: 'Connecting Southeast Asia’s innovation leaders with high-impact executive and technical talent.',
      badge: 'APAC & Southeast Asia Hub',
      highlights: [
        'Proven track record with Singapore-headquartered venture portfolio companies',
        'Cross-border engineering team building between Singapore, South Asia, and Vietnam',
        'Deep alignment with Employment Pass (EP) and COMPASS framework criteria'
      ]
    },
    country: 'Singapore',
    countryCode: 'SG',
    city: 'Singapore',
    region: 'Southeast Asia',
    isPhysicalOffice: false,
    compensationInsights: [
      { role: 'Chief Technology Officer (CTO)', range: 'SGD 18,000 - 32,000 / mo', currency: 'SGD' },
      { role: 'VP of Engineering', range: 'SGD 14,000 - 24,000 / mo', currency: 'SGD' },
      { role: 'Head of Product', range: 'SGD 12,000 - 20,000 / mo', currency: 'SGD' }
    ],
    regulatoryCompliance: [
      'Ministry of Manpower (MOM) Employment Act & COMPASS Framework',
      'Central Provident Fund (CPF) Regulations',
      'Fair Consideration Framework (FCF)'
    ],
    faqs: [
      {
        question: 'Do you help Singapore companies build offshore engineering hubs in South Asia?',
        answer: 'Yes, we assist Singapore scale-ups in building dedicated distributed engineering teams and leadership hubs across Bangladesh and South Asia.'
      }
    ],
    relatedServices: ['executive-search', 'specialist-talent-sourcing', 'interim-impact-recruitment'],
    relatedIndustries: ['tech-startups', 'healthcare-life-sciences'],
    relatedRoles: ['chief-technology-officer-cto', 'vp-engineering', 'head-of-product'],
    cta: {
      title: 'Connect with Singapore Search Practice',
      description: 'Explore executive headhunting and cross-border engineering solutions for Singapore.',
      buttonText: 'Request APAC Consultation',
      buttonHref: '/contact',
      variant: 'primary'
    },
    seo: {
      title: 'Executive Search Singapore | TALENTO APAC Headhunting',
      description: 'Hire top tech and executive talent for Singapore companies with TALENTO APAC search practice.',
      keywords: ['executive search Singapore', 'tech headhunting Singapore', 'hire CTO Singapore', 'APAC recruitment agency']
    }
  },
  {
    id: 'loc-united-kingdom',
    slug: 'united-kingdom',
    name: 'United Kingdom (London & UK)',
    title: 'Cross-Border Executive Search & Talent Advisory for UK Enterprises | TALENTO',
    metaDescription: 'UK-focused executive search and talent solutions connecting London enterprises and global brands with world-class operational and engineering talent.',
    shortDescription: 'Bridging UK enterprises and global buying offices with executive talent and international sourcing teams.',
    longDescription: [
      'The United Kingdom is a global financial center and headquarters for major retail brands, international development organizations, and technology innovators.',
      'TALENTO provides UK enterprises with senior executive recruitment, sourcing heads for retail supply chains, and distributed technical talent.'
    ],
    heroContent: {
      headline: 'Executive Search & Cross-Border Talent for the UK',
      subheadline: 'Connecting London headquarters and UK enterprises with global talent and supply chain leadership.',
      badge: 'UK & European Practice',
      highlights: [
        'Dedicated practice for UK retail brands managing South Asian supply chains',
        'Executive search for international development NGOs headquartered in London',
        'Compliance with UK employment standards and overseas contractor frameworks'
      ]
    },
    country: 'United Kingdom',
    countryCode: 'GB',
    city: 'London',
    region: 'Europe',
    isPhysicalOffice: false,
    compensationInsights: [
      { role: 'Chief Executive Officer (CEO)', range: 'GBP 120,000 - 250,000+ / yr', currency: 'GBP' },
      { role: 'Head of Global Sourcing & Supply Chain', range: 'GBP 80,000 - 140,000 / yr', currency: 'GBP' },
      { role: 'VP of Engineering', range: 'GBP 90,000 - 160,000 / yr', currency: 'GBP' }
    ],
    regulatoryCompliance: [
      'UK Employment Rights Act & Working Time Regulations',
      'IR35 Off-Payroll Working Rules Advisory',
      'UK GDPR & Data Protection Act 2018'
    ],
    faqs: [
      {
        question: 'How do you support UK brands with supply chain leadership abroad?',
        answer: 'We place on-the-ground Country Managers, Quality Directors, and Sourcing Heads across South Asia who directly report to UK corporate boards.'
      }
    ],
    relatedServices: ['executive-search', 'c-suite-talent-hunt', 'interim-impact-recruitment'],
    relatedIndustries: ['apparel-textiles', 'fmcg-marketplaces', 'ngo-international-development'],
    relatedRoles: ['chief-executive-officer-ceo', 'chief-operating-officer-coo', 'chief-financial-officer-cfo'],
    cta: {
      title: 'Connect with Our UK Advisory Team',
      description: 'Discuss cross-border leadership recruitment and global supply chain headhunting for the UK market.',
      buttonText: 'Schedule UK Discussion',
      buttonHref: '/contact',
      variant: 'primary'
    },
    seo: {
      title: 'Executive Search UK & London | TALENTO Cross-Border Headhunting',
      description: 'Executive search and global talent acquisition for UK enterprises, retail brands, and non-profits with TALENTO.',
      keywords: ['executive search UK', 'London headhunters', 'supply chain recruitment UK', 'cross-border talent agency']
    }
  },
  {
    id: 'loc-united-states',
    slug: 'united-states',
    name: 'United States (US Remote & Distributed)',
    title: 'Cross-Border Tech Talent & Executive Recruitment for US Companies | TALENTO',
    metaDescription: 'Helping US technology startups and global enterprises hire top-tier senior software engineers and executive talent from vetted global hubs.',
    shortDescription: 'Connecting US tech companies and enterprises with pre-vetted senior software engineers, tech leads, and offshore leaders.',
    longDescription: [
      'US technology companies are increasingly looking globally to scale their engineering velocity and build round-the-clock development operations.',
      'TALENTO provides US startups and enterprises with vetted senior software architects, engineering managers, and distributed tech teams with seamless English proficiency and timezone alignment.'
    ],
    heroContent: {
      headline: 'Cross-Border Tech Recruitment for US Enterprises',
      subheadline: 'Helping American tech startups and scale-ups hire top 1% software engineers and tech leaders.',
      badge: 'US & Global Corridor',
      highlights: [
        'Vetted senior talent across Golang, React, Node.js, Python, and Cloud Infrastructure',
        'Compliant contractor onboarding and cross-border payroll facilitation',
        'Overlapping EST/PST working hours for smooth agile sprint integration'
      ]
    },
    country: 'United States',
    countryCode: 'US',
    city: 'New York / San Francisco / Remote',
    region: 'North America',
    isPhysicalOffice: false,
    compensationInsights: [
      { role: 'Staff / Principal Software Engineer', range: 'USD 60,000 - 110,000 / yr (Global)', currency: 'USD' },
      { role: 'Engineering Manager / Tech Lead', range: 'USD 70,000 - 120,000 / yr (Global)', currency: 'USD' }
    ],
    regulatoryCompliance: [
      'W-8BEN International Contractor Compliance',
      'US IP Assignment & Proprietary Information Agreements',
      'SOC2 / HIPAA Compliant Remote Developer Protocols'
    ],
    faqs: [
      {
        question: 'How do you verify the English communication skills of overseas engineers?',
        answer: 'Every candidate completes structured live technical and behavioral video interviews with senior engineering evaluators to ensure fluent, proactive communication.'
      }
    ],
    relatedServices: ['specialist-talent-sourcing', 'on-demand-freelancer-search', 'executive-search'],
    relatedIndustries: ['tech-startups', 'healthcare-life-sciences'],
    relatedRoles: ['chief-technology-officer-cto', 'vp-engineering', 'head-of-product'],
    cta: {
      title: 'Accelerate US Engineering Velocity',
      description: 'Discover how US scale-ups hire top global engineering talent with TALENTO.',
      buttonText: 'Request US Tech Talent Demo',
      buttonHref: '/contact',
      variant: 'primary'
    },
    seo: {
      title: 'US Cross-Border Tech Recruitment | TALENTO Global Talent',
      description: 'Hire vetted global software engineers and tech leaders for US companies with TALENTO cross-border talent search.',
      keywords: ['hire global engineers US', 'cross-border tech recruitment', 'remote developer search US', 'TALENTO global talent']
    }
  }
];
