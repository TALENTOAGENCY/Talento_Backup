import {
  ContentPlanRecord,
  ContentPlanningCategory,
  ContentPlanningFilterOptions,
  ContentPlanningMetrics,
  EditorialStatus
} from '../types/contentPlan';

export const CONTENT_PLAN_CATEGORIES: ContentPlanningCategory[] = [
  'Executive Search',
  'Recruitment',
  'Tech Hiring',
  'Remote Hiring',
  'Leadership',
  'Talent Acquisition',
  'Employer Branding',
  'International Hiring',
  'Industry Hiring',
  'Country Hiring'
];

export const contentPlanDatabase: ContentPlanRecord[] = [
  // 1. Executive Search
  {
    id: 'plan-exec-01',
    title: 'The Board’s Guide to Retained Executive Search: Timelines, Fees & Vetting',
    slug: 'boards-guide-retained-executive-search-timelines-fees',
    category: 'Executive Search',
    primaryKeyword: 'retained executive search guide',
    secondaryKeywords: [
      'executive search process',
      'C-suite headhunting timeline',
      'executive search fees benchmark',
      'board hiring framework'
    ],
    searchIntent: 'commercial',
    audience: 'Board Members / Investors',
    relatedService: 'executive-search',
    relatedIndustry: ['technology', 'apparel', 'healthcare'],
    relatedRole: ['sales-leaders', 'finance-leaders', 'hr-leaders'],
    relatedLocation: ['usa', 'uk', 'uae'],
    cta: {
      action: 'Schedule Board Consultation',
      buttonText: 'Book Executive Search Briefing',
      buttonHref: 'https://calendly.com/talentoagency2/30min',
      targetGoal: 'Lead generation for retained C-suite searches',
      variant: 'primary'
    },
    editorialWorkflow: {
      status: 'approved',
      publishReady: true,
      authorAssigned: 'Managing Partner - Executive Search Practice',
      reviewer: 'TALENTO Governance Committee',
      targetPublishDate: '2026-04-05',
      approvedDate: '2026-03-24',
      businessPriority: 'P1 - High',
      difficultyScore: 'High',
      estimatedWordCount: 2200,
      editorialNotes:
        'Requires verified fee benchmark graphs and anonymized case breakdowns. Human partner review completed.',
      contentOutline: [
        '1. Why Board Appointments Require Retained Methodology',
        '2. The 4-Stage Search Lifecycle & Milestones',
        '3. Fee Structures: Retainer vs Success vs Milestone',
        '4. Discreet 360-Degree Reference Protocols',
        '5. Mitigating C-Suite Onboarding Churn'
      ]
    }
  },
  {
    id: 'plan-exec-02',
    title: 'Executive Compensation Structuring 2026: Balancing Base, Bonus & ESOP',
    slug: 'executive-compensation-structuring-base-bonus-esop-2026',
    category: 'Executive Search',
    primaryKeyword: 'executive compensation structuring 2026',
    secondaryKeywords: [
      'C-suite equity grants',
      'founder dilution management',
      'executive retention incentives',
      'startup executive salary bands'
    ],
    searchIntent: 'informational',
    audience: 'Founders / CEOs',
    relatedService: ['executive-search', 'talent-advisory'],
    relatedIndustry: ['technology', 'fmcg'],
    relatedRole: ['finance-leaders', 'sales-leaders'],
    relatedLocation: ['usa', 'uk', 'canada'],
    cta: {
      action: 'Request Compensation Advisory',
      buttonText: 'Request Custom Compensation Model',
      buttonHref: '/#contact',
      targetGoal: 'Advisory mandate engagement',
      variant: 'primary'
    },
    editorialWorkflow: {
      status: 'in-review',
      publishReady: false,
      authorAssigned: 'Senior Compensation Analyst',
      reviewer: 'Head of Talent Advisory',
      targetPublishDate: '2026-04-15',
      businessPriority: 'P1 - High',
      difficultyScore: 'Medium',
      estimatedWordCount: 1800,
      editorialNotes:
        'Awaiting final verification of 2026 Series A/B equity vesting percentages before sign-off.',
      contentOutline: [
        '1. Macro Shifts in Executive Pay Expectations',
        '2. Cash vs Equity Calibration by Growth Stage',
        '3. Milestone Acceleration & Double-Trigger Cliffs',
        '4. Tax Optimization across International Corridors'
      ]
    }
  },

  // 2. Recruitment
  {
    id: 'plan-rec-01',
    title: 'Contingency vs. Retained Recruitment: When to Deploy Each Model',
    slug: 'contingency-vs-retained-recruitment-comparison',
    category: 'Recruitment',
    primaryKeyword: 'contingency vs retained recruitment',
    secondaryKeywords: [
      'recruitment engagement models',
      'headhunting vs agency recruitment',
      'exclusive search benefits',
      'hiring agency cost comparison'
    ],
    searchIntent: 'commercial',
    audience: 'Hiring Managers',
    relatedService: ['specialist-recruitment', 'executive-search'],
    relatedIndustry: ['technology', 'apparel'],
    relatedRole: ['product-designers', 'platform-engineers'],
    relatedLocation: ['uk', 'usa', 'australia'],
    cta: {
      action: 'Evaluate Engagement Model',
      buttonText: 'Compare Recruitment Options',
      buttonHref: '/services',
      targetGoal: 'Service selection qualification',
      variant: 'secondary'
    },
    editorialWorkflow: {
      status: 'approved',
      publishReady: true,
      authorAssigned: 'Principal Consultant',
      reviewer: 'Managing Partner',
      targetPublishDate: '2026-04-01',
      approvedDate: '2026-03-22',
      businessPriority: 'P2 - Medium',
      difficultyScore: 'Low',
      estimatedWordCount: 1500,
      editorialNotes:
        'Ready for publishing. Excellent comparative breakdown between mid-market specialist needs and executive search.',
      contentOutline: [
        '1. Defining the Core Recruitment Models',
        '2. When Contingency Delivers Fast Results',
        '3. The Inherent Risks of Non-Exclusive Mandates',
        '4. Decision Matrix: Budget vs Urgency vs Scarcity'
      ]
    }
  },

  // 3. Tech Hiring
  {
    id: 'plan-tech-01',
    title: 'Evaluating Senior Backend Architects: System Design & Live Vetting Framework',
    slug: 'evaluating-senior-backend-architects-system-design-framework',
    category: 'Tech Hiring',
    primaryKeyword: 'hire senior backend architects',
    secondaryKeywords: [
      'backend engineer interview questions',
      'distributed systems vetting',
      'evaluating software architecture skills',
      'tech screening scorecard'
    ],
    searchIntent: 'informational',
    audience: 'CTOs / VPs of Engineering',
    relatedService: 'tech-recruitment',
    relatedIndustry: 'technology',
    relatedRole: ['software-engineers', 'platform-engineers'],
    relatedLocation: ['usa', 'uk', 'uae'],
    cta: {
      action: 'Hire Backend Engineers',
      buttonText: 'Request Technical Shortlist',
      buttonHref: '/locations/usa/software-engineers',
      targetGoal: 'Direct role pipeline request',
      variant: 'primary'
    },
    editorialWorkflow: {
      status: 'planned',
      publishReady: false,
      authorAssigned: 'Tech Recruitment Lead',
      targetPublishDate: '2026-04-20',
      businessPriority: 'P1 - High',
      difficultyScore: 'High',
      estimatedWordCount: 2000,
      editorialNotes:
        'Drafting rubric based on live production failures and microservices scaling scenarios.',
      contentOutline: [
        '1. What Separates Senior Developers from Lead Architects',
        '2. Live System Design Interview Scorecards',
        '3. Assessing Latency, Caching & Concurrency Trade-offs',
        '4. Evaluating Asynchronous Documentation Discipline'
      ]
    }
  },

  // 4. Remote Hiring
  {
    id: 'plan-rem-01',
    title: 'Managing Asynchronous Sprint Cycles Across 6+ Hour Time Differences',
    slug: 'managing-asynchronous-sprints-remote-engineering-teams',
    category: 'Remote Hiring',
    primaryKeyword: 'asynchronous sprint management',
    secondaryKeywords: [
      'remote agile workflows',
      'cross-border team synchronization',
      'async standup tools',
      'remote developer productivity'
    ],
    searchIntent: 'informational',
    audience: 'CTOs / VPs of Engineering',
    relatedService: 'remote-recruitment',
    relatedIndustry: ['technology', 'healthcare'],
    relatedRole: ['software-engineers', 'product-designers'],
    relatedLocation: ['usa', 'uk'],
    cta: {
      action: 'Explore Remote Recruitment',
      buttonText: 'View Remote Hiring Model',
      buttonHref: '/services/remote-recruitment',
      targetGoal: 'Service education & consultation',
      variant: 'primary'
    },
    editorialWorkflow: {
      status: 'draft',
      publishReady: false,
      authorAssigned: 'Remote Operations Specialist',
      reviewer: 'Head of Tech Practice',
      targetPublishDate: '2026-04-25',
      businessPriority: 'P2 - Medium',
      difficultyScore: 'Medium',
      estimatedWordCount: 1650,
      editorialNotes:
        'Includes real client workflow diagrams for Notion, Jira, and Slack asynchronous rituals.',
      contentOutline: [
        '1. The Myth of Constant Synchronous Video Calls',
        '2. Structuring Daily 4-Hour Overlap Windows',
        '3. Writing Effective Architectural Decision Records (ADRs)',
        '4. Preventing Async Team Isolation & Burnout'
      ]
    }
  },

  // 5. Leadership
  {
    id: 'plan-lead-01',
    title: 'Scaling from Founder-Led Sales to a VP of Sales: The Transition Roadmap',
    slug: 'scaling-founder-led-sales-to-vp-of-sales-roadmap',
    category: 'Leadership',
    primaryKeyword: 'hiring VP of sales startup',
    secondaryKeywords: [
      'founder led sales transition',
      'first sales leader hiring guide',
      'VP sales scorecard',
      'B2B sales compensation plan'
    ],
    searchIntent: 'commercial',
    audience: 'Founders / CEOs',
    relatedService: ['leadership-recruitment', 'executive-search'],
    relatedIndustry: ['technology', 'fmcg'],
    relatedRole: 'sales-leaders',
    relatedLocation: ['usa', 'uk', 'uae'],
    cta: {
      action: 'Retain Sales Search',
      buttonText: 'Hire Proven Sales Leaders',
      buttonHref: '/roles/sales-leaders',
      targetGoal: 'Sales leader search mandate',
      variant: 'primary'
    },
    editorialWorkflow: {
      status: 'in-review',
      publishReady: false,
      authorAssigned: 'Commercial Practice Partner',
      reviewer: 'Managing Partner',
      targetPublishDate: '2026-05-02',
      businessPriority: 'P1 - High',
      difficultyScore: 'High',
      estimatedWordCount: 2100,
      editorialNotes:
        'Covers the difference between a "Trailblazer VP" vs "Scaler VP". Under final review.',
      contentOutline: [
        '1. Signs Your Startup Has Outgrown Founder-Led Sales',
        '2. Archetypes: The Player-Coach vs Process Architect',
        '3. Defining the Commission & Quota Calibration',
        '4. Interview Frameworks for Revenue Leaders'
      ]
    }
  },

  // 6. Talent Acquisition
  {
    id: 'plan-ta-01',
    title: 'Embedded Talent Advisory: How High-Growth Companies Build Scalable In-House Engines',
    slug: 'embedded-talent-advisory-building-in-house-recruitment-engines',
    category: 'Talent Acquisition',
    primaryKeyword: 'embedded talent advisory',
    secondaryKeywords: [
      'RPO vs embedded recruitment',
      'talent acquisition strategy for scaleups',
      'in-house recruitment process optimization',
      'reducing cost per hire'
    ],
    searchIntent: 'commercial',
    audience: 'CHROs / Talent Leaders',
    relatedService: 'talent-advisory',
    relatedIndustry: ['technology', 'healthcare', 'apparel'],
    relatedRole: 'hr-leaders',
    relatedLocation: ['usa', 'uk', 'canada', 'australia'],
    cta: {
      action: 'Explore Talent Advisory',
      buttonText: 'Learn About Embedded Advisory',
      buttonHref: '/services/talent-advisory',
      targetGoal: 'Talent advisory consultation',
      variant: 'primary'
    },
    editorialWorkflow: {
      status: 'approved',
      publishReady: true,
      authorAssigned: 'Talent Advisory Lead',
      reviewer: 'Managing Partner',
      targetPublishDate: '2026-04-10',
      approvedDate: '2026-03-24',
      businessPriority: 'P2 - Medium',
      difficultyScore: 'Medium',
      estimatedWordCount: 1700,
      editorialNotes:
        'Approved by leadership. Highlights TALENTO embedded advisory model vs traditional rigid RPO.',
      contentOutline: [
        '1. The Limits of Transactional Agency Hiring',
        '2. What is Embedded Talent Advisory?',
        '3. Rebuilding Your Tech Stack, ATS & Scorecards',
        '4. Case Example: 45 Hires in 6 Months with Zero Fee Bloat'
      ]
    }
  },

  // 7. Employer Branding
  {
    id: 'plan-eb-01',
    title: 'Employer Value Proposition (EVP) for Remote & Cross-Border Engineering Teams',
    slug: 'employer-value-proposition-remote-engineering-teams',
    category: 'Employer Branding',
    primaryKeyword: 'employer value proposition remote teams',
    secondaryKeywords: [
      'tech employer branding',
      'attracting passive software engineers',
      'remote company culture EVP',
      'competitive non-salary tech perks'
    ],
    searchIntent: 'informational',
    audience: 'CHROs / Talent Leaders',
    relatedService: ['talent-advisory', 'remote-recruitment'],
    relatedIndustry: 'technology',
    relatedRole: ['software-engineers', 'hr-leaders'],
    relatedLocation: ['usa', 'uk', 'uae'],
    cta: {
      action: 'Enhance Employer Brand',
      buttonText: 'Consult on Employer Branding',
      buttonHref: '/#contact',
      targetGoal: 'Advisory inquiry',
      variant: 'secondary'
    },
    editorialWorkflow: {
      status: 'planned',
      publishReady: false,
      authorAssigned: 'Brand & Culture Strategist',
      targetPublishDate: '2026-05-15',
      businessPriority: 'P3 - Low',
      difficultyScore: 'Medium',
      estimatedWordCount: 1600,
      editorialNotes:
        'Outlining core pillars: autonomy, continuous learning stipends, hardware budgets, and async respect.',
      contentOutline: [
        '1. Why Salary Alone Does Not Attract Tier-1 Engineers',
        '2. The 4 Pillars of a Compelling Tech EVP',
        '3. Crafting Transparent Job Profiles That Stand Out',
        '4. Measuring EVP Impact on Candidate Offer Acceptance'
      ]
    }
  },

  // 8. International Hiring
  {
    id: 'plan-intl-01',
    title: 'Cross-Border Talent Corridors: Tax Compliance, Work Contracts & EOR Considerations',
    slug: 'cross-border-talent-corridors-compliance-contracts-eor',
    category: 'International Hiring',
    primaryKeyword: 'cross border international hiring compliance',
    secondaryKeywords: [
      'employer of record EOR international',
      'remote hiring legal contracts',
      'cross border tax compliance',
      'global contractor to full time conversion'
    ],
    searchIntent: 'informational',
    audience: 'CHROs / Talent Leaders',
    relatedService: ['remote-recruitment', 'talent-advisory'],
    relatedIndustry: ['technology', 'finance-leaders'],
    relatedRole: ['finance-leaders', 'hr-leaders'],
    relatedLocation: ['usa', 'uk', 'uae', 'canada', 'australia'],
    cta: {
      action: 'Review Cross-Border Strategy',
      buttonText: 'Schedule International Compliance Briefing',
      buttonHref: '/locations',
      targetGoal: 'International practice lead generation',
      variant: 'primary'
    },
    editorialWorkflow: {
      status: 'draft',
      publishReady: false,
      authorAssigned: 'International Legal & Advisory Consultant',
      reviewer: 'Managing Partner',
      targetPublishDate: '2026-05-20',
      businessPriority: 'P1 - High',
      difficultyScore: 'High',
      estimatedWordCount: 2400,
      editorialNotes:
        'Must maintain TALENTO disclaimer: Advisory intelligence only, not formal legal advice. Awaiting partner review.',
      contentOutline: [
        '1. The Legal Complexity of Hiring Across Borders',
        '2. Direct Contractor vs Employer of Record (EOR)',
        '3. Intellectual Property (IP) Protection Clauses',
        '4. Currency Fluctuations & Safe Payment Protocols'
      ]
    }
  },

  // 9. Industry Hiring
  {
    id: 'plan-ind-01',
    title: 'The Modernization of Apparel Manufacturing Leadership: COO & Lean Engineering Profiles',
    slug: 'apparel-manufacturing-leadership-modernization-coo-profiles',
    category: 'Industry Hiring',
    primaryKeyword: 'apparel manufacturing executive search',
    secondaryKeywords: [
      'garment factory COO recruitment',
      'lean manufacturing leadership hiring',
      'RMG executive search South Asia',
      'sustainable apparel operations leaders'
    ],
    searchIntent: 'commercial',
    audience: 'Board Members / Investors',
    relatedService: ['executive-search', 'leadership-recruitment'],
    relatedIndustry: 'apparel',
    relatedRole: ['sales-leaders', 'hr-leaders', 'finance-leaders'],
    relatedLocation: ['uk', 'canada', 'australia'],
    cta: {
      action: 'Retain Apparel Search',
      buttonText: 'Explore Apparel Practice',
      buttonHref: '/industries/apparel',
      targetGoal: 'Industrial practice engagement',
      variant: 'primary'
    },
    editorialWorkflow: {
      status: 'approved',
      publishReady: true,
      authorAssigned: 'Apparel & Industrial Practice Lead',
      reviewer: 'Managing Partner',
      targetPublishDate: '2026-04-18',
      approvedDate: '2026-03-23',
      businessPriority: 'P2 - Medium',
      difficultyScore: 'High',
      estimatedWordCount: 1950,
      editorialNotes:
        'Approved. Incorporates real case benchmarks from 20,000-headcount factory complex turnarounds.',
      contentOutline: [
        '1. Industry 4.0 in Global Garment Supply Chains',
        '2. The New COO Archetype: Automation + Floor Credibility',
        '3. ESG Compliance & Buyer Audit Leadership Standards',
        '4. Expatriate vs Local Leadership Calibration'
      ]
    }
  },

  // 10. Country Hiring
  {
    id: 'plan-cnt-01',
    title: 'Hiring Software Engineers for US Startups: Time-Zone Alignment, Vetting & Velocity',
    slug: 'hiring-software-engineers-us-startups-time-zone-velocity',
    category: 'Country Hiring',
    primaryKeyword: 'hire software engineers US startups',
    secondaryKeywords: [
      'remote developers US EST overlap',
      'cross-border tech hiring for US companies',
      'San Francisco engineering team scaling',
      'vetted international software developers'
    ],
    searchIntent: 'commercial',
    audience: 'CTOs / VPs of Engineering',
    relatedService: ['tech-recruitment', 'remote-recruitment'],
    relatedIndustry: 'technology',
    relatedRole: 'software-engineers',
    relatedLocation: 'usa',
    cta: {
      action: 'Access US Candidate Pipeline',
      buttonText: 'Explore US Software Engineer Corridor',
      buttonHref: '/locations/usa/software-engineers',
      targetGoal: 'US software engineering corridor mandates',
      variant: 'primary'
    },
    editorialWorkflow: {
      status: 'approved',
      publishReady: true,
      authorAssigned: 'US Practice Partner',
      reviewer: 'Executive Committee',
      targetPublishDate: '2026-03-28',
      approvedDate: '2026-03-24',
      businessPriority: 'P1 - High',
      difficultyScore: 'Medium',
      estimatedWordCount: 1900,
      editorialNotes:
        'Fully calibrated to link directly to /locations/usa/software-engineers corridor. Approved.',
      contentOutline: [
        '1. The US Engineering Capacity Deficit',
        '2. Structuring 4–6 Hours of Synchronous EST/PST Overlap',
        '3. Technical Vetting: Live System Design & Clean Code',
        '4. Case Studies of US Tech Scaleups Scaling with TALENTO'
      ]
    }
  },
  {
    id: 'plan-cnt-02',
    title: 'Recruiting for London Fintech Scaleups: Regulatory Rigor, Microservices & GMT Sync',
    slug: 'recruiting-london-fintech-scaleups-microservices-gmt',
    category: 'Country Hiring',
    primaryKeyword: 'hire fintech software engineers UK',
    secondaryKeywords: [
      'London tech recruitment corridor',
      'fintech developer hiring GMT overlap',
      'cross-border tech hiring UK',
      'senior backend developers London'
    ],
    searchIntent: 'commercial',
    audience: 'CTOs / VPs of Engineering',
    relatedService: ['tech-recruitment', 'remote-recruitment'],
    relatedIndustry: ['technology', 'fmcg'],
    relatedRole: 'software-engineers',
    relatedLocation: 'uk',
    cta: {
      action: 'Access UK Candidate Pipeline',
      buttonText: 'Explore UK Software Engineer Corridor',
      buttonHref: '/locations/uk/software-engineers',
      targetGoal: 'UK software engineering corridor mandates',
      variant: 'primary'
    },
    editorialWorkflow: {
      status: 'approved',
      publishReady: true,
      authorAssigned: 'UK Practice Partner',
      reviewer: 'Executive Committee',
      targetPublishDate: '2026-03-29',
      approvedDate: '2026-03-24',
      businessPriority: 'P1 - High',
      difficultyScore: 'Medium',
      estimatedWordCount: 1850,
      editorialNotes:
        'Calibrated to link to /locations/uk/software-engineers corridor. Approved.',
      contentOutline: [
        '1. London Fintech Ecosystem Demand Dynamics',
        '2. Financial Transaction Security & High-Concurrency Standards',
        '3. Operating with Full Daytime Working Hour Overlap',
        '4. Retaining Tier-1 Technical Leads in Competitive Markets'
      ]
    }
  },
  {
    id: 'plan-cnt-03',
    title: 'Dubai & UAE Tech Expansion: Sourcing Senior Mobile & Super-App Engineers',
    slug: 'dubai-uae-tech-expansion-mobile-super-app-engineers',
    category: 'Country Hiring',
    primaryKeyword: 'hire software engineers Dubai UAE',
    secondaryKeywords: [
      'Dubai tech recruitment practice',
      'UAE remote developers GST overlap',
      'mobile app developers UAE Dubai',
      'Abu Dhabi tech talent acquisition'
    ],
    searchIntent: 'commercial',
    audience: 'Founders / CEOs',
    relatedService: ['tech-recruitment', 'leadership-recruitment'],
    relatedIndustry: ['technology', 'apparel', 'healthcare'],
    relatedRole: 'software-engineers',
    relatedLocation: 'uae',
    cta: {
      action: 'Access UAE Candidate Pipeline',
      buttonText: 'Explore UAE Software Engineer Corridor',
      buttonHref: '/locations/uae/software-engineers',
      targetGoal: 'UAE software engineering corridor mandates',
      variant: 'primary'
    },
    editorialWorkflow: {
      status: 'approved',
      publishReady: true,
      authorAssigned: 'UAE Practice Partner',
      reviewer: 'Executive Committee',
      targetPublishDate: '2026-03-30',
      approvedDate: '2026-03-24',
      businessPriority: 'P1 - High',
      difficultyScore: 'Medium',
      estimatedWordCount: 1800,
      editorialNotes:
        'Calibrated to link to /locations/uae/software-engineers corridor. Approved.',
      contentOutline: [
        '1. The UAE as the Digital Epicenter of MENA',
        '2. High-Frequency Super-App & Logistics Architecture Requirements',
        '3. Near-Zero Time-Zone Gap (GST / GMT+4 Sync)',
        '4. Dual Delivery Models: Dedicated Remote Hubs vs Relocation'
      ]
    }
  }
];

// Helper Functions for Editorial Planning & Governance

export function getAllContentPlans(): ContentPlanRecord[] {
  return contentPlanDatabase;
}

export function getContentPlanById(id: string): ContentPlanRecord | undefined {
  return contentPlanDatabase.find((item) => item.id === id);
}

export function getContentPlansByCategory(category: ContentPlanningCategory): ContentPlanRecord[] {
  return contentPlanDatabase.filter((item) => item.category === category);
}

export function getContentPlansByStatus(status: EditorialStatus): ContentPlanRecord[] {
  return contentPlanDatabase.filter((item) => item.editorialWorkflow.status === status);
}

export function getApprovedContentPlans(): ContentPlanRecord[] {
  return contentPlanDatabase.filter((item) => item.editorialWorkflow.publishReady === true);
}

export function filterContentPlans(options: ContentPlanningFilterOptions): ContentPlanRecord[] {
  return contentPlanDatabase.filter((record) => {
    if (options.category && options.category !== 'All' && record.category !== options.category) {
      return false;
    }
    if (options.status && options.status !== 'All' && record.editorialWorkflow.status !== options.status) {
      return false;
    }
    if (options.searchIntent && options.searchIntent !== 'All' && record.searchIntent !== options.searchIntent) {
      return false;
    }
    if (options.audience && options.audience !== 'All' && record.audience !== options.audience) {
      return false;
    }
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase().trim();
      const matchesTitle = record.title.toLowerCase().includes(q);
      const matchesPrimary = record.primaryKeyword.toLowerCase().includes(q);
      const matchesSecondary = record.secondaryKeywords.some((k) => k.toLowerCase().includes(q));
      if (!matchesTitle && !matchesPrimary && !matchesSecondary) {
        return false;
      }
    }
    return true;
  });
}

export function getContentPlanningMetrics(): ContentPlanningMetrics {
  const publishedCount = contentPlanDatabase.filter(
    (item) => item.editorialWorkflow.status === 'published'
  ).length;
  const approvedCount = contentPlanDatabase.filter(
    (item) => item.editorialWorkflow.status === 'approved'
  ).length;
  const inReviewCount = contentPlanDatabase.filter(
    (item) => item.editorialWorkflow.status === 'in-review'
  ).length;
  const draftCount = contentPlanDatabase.filter(
    (item) => item.editorialWorkflow.status === 'draft'
  ).length;
  const plannedCount = contentPlanDatabase.filter(
    (item) => item.editorialWorkflow.status === 'planned'
  ).length;

  const categoryCounts = CONTENT_PLAN_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = contentPlanDatabase.filter((item) => item.category === cat).length;
    return acc;
  }, {} as Record<ContentPlanningCategory, number>);

  return {
    totalRecords: contentPlanDatabase.length,
    publishedCount,
    approvedCount,
    inReviewCount,
    draftCount,
    plannedCount,
    categoryCounts
  };
}
