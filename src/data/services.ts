import type { ServiceEntity } from '../types/content';

export const servicesData: ServiceEntity[] = [
  {
    id: 'srv-executive-search',
    slug: 'executive-search',
    name: 'Executive Search',
    title: 'Executive Search & Board Advisory Practice | TALENTO',
    metaDescription: 'Confidential retained executive search for Chief Executive Officers (CEO), Board Members, and C-suite leaders across South Asia and global markets.',
    shortDescription: 'Discreet, partner-led retained search for board members, CEOs, and C-suite executives who shape enterprise trajectory.',
    longDescription: [
      'At the highest corporate tiers, leadership appointments define market competitiveness and shareholder value. TALENTO’s Executive Search practice provides rigorous, research-intensive headhunting tailored for high-growth enterprises, multinational corporations, and established family conglomerates.',
      'Our partners evaluate candidates across strategic capital allocation, board governance, operational transformation, and crisis leadership under strict confidentiality.'
    ],
    heroContent: {
      headline: 'Securing Transformational Executive Leadership',
      subheadline: 'Confidential, partner-led retained search for CEOs, Board Directors, and C-suite officers.',
      badge: 'Retained Executive Search',
      highlights: ['95% Placement Success Rate', 'Average 14-Day Shortlist Window', 'Strict Non-Disclosure Protocols'],
      primaryCTA: {
        title: 'Retain an Executive Search Partner',
        description: 'Schedule a confidential briefing with our managing partners.',
        buttonText: 'Schedule Consultation',
        buttonHref: '/contact'
      }
    },
    engagementModel: 'Retained Search',
    searchTimeline: '3–5 weeks to calibrated shortlist',
    guaranteePeriod: '12-Month Replacement Guarantee',
    keyDeliverables: [
      'Confidential market mapping & organizational benchmarking report',
      'Curated panel of 3–5 rigorously vetted executive candidates',
      'Comprehensive leadership competency scorecards',
      'Executive compensation benchmarking & offer negotiation support',
      '180-day post-placement integration monitoring'
    ],
    searchLifecycle: [
      {
        phase: 'Phase 1',
        title: 'Mandate Scoping & Competency Profiling',
        description: 'Aligning with the Board and Founders on strategic vision, P&L expectations, and leadership scorecards.'
      },
      {
        phase: 'Phase 2',
        title: 'Target Market Mapping & Headhunting',
        description: 'Discreet, direct outreach to top-tier passive executives across target industry ecosystems.'
      },
      {
        phase: 'Phase 3',
        title: 'Rigorous Vetting & Reference Audits',
        description: 'Multi-stage structured interviews, track record verification, and confidential 360-degree reference audits.'
      },
      {
        phase: 'Phase 4',
        title: 'Offer Structuring & Integration',
        description: 'Facilitating complex compensation structures (equity, performance bonuses, non-competes) for seamless onboarding.'
      }
    ],
    faqs: [
      {
        question: 'How long does a retained executive search typically take?',
        answer: 'Our average time to present a calibrated shortlist is 10 to 14 business days, with final placement concluding in 4 to 6 weeks.'
      },
      {
        question: 'How does TALENTO ensure strict confidentiality?',
        answer: 'All candidate market mapping is executed under mutual NDAs with blinded briefing dossiers, protecting your organizational strategy.'
      },
      {
        question: 'What replacement guarantee is provided for Executive Search?',
        answer: 'We provide an industry-leading 12-month replacement guarantee for all retained C-suite appointments.'
      }
    ],
    relatedServices: ['leadership-recruitment', 'talent-advisory'],
    relatedIndustries: ['tech-startups', 'apparel-textiles', 'healthcare-life-sciences', 'fmcg-marketplaces'],
    relatedRoles: ['chief-executive-officer-ceo', 'chief-technology-officer-cto', 'chief-financial-officer-cfo', 'chief-operating-officer-coo'],
    relatedLocations: ['bangladesh', 'uae', 'singapore'],
    cta: {
      title: 'Discuss Your Executive Appointment',
      description: 'Connect with our Managing Partners for a confidential search consultation.',
      buttonText: 'Schedule Consultation',
      buttonHref: '/contact',
      variant: 'primary'
    },
    seo: {
      title: 'Executive Search & Board Headhunting | TALENTO',
      description: 'Confidential executive search for Chief Executive Officers (CEO), Board Members, and C-suite leaders across South Asia and global markets.',
      canonicalUrl: 'https://www.talento.agency/services/executive-search',
      keywords: ['executive search firm', 'C-suite headhunting', 'board recruitment', 'CEO headhunter', 'TALENTO executive search']
    }
  },
  {
    id: 'srv-leadership-recruitment',
    slug: 'leadership-recruitment',
    name: 'Leadership Recruitment',
    title: 'Leadership Recruitment & VP / Director Headhunting | TALENTO',
    metaDescription: 'Headhunting senior directors, Vice Presidents, General Managers, and functional leaders who drive execution and scale operational divisions.',
    shortDescription: 'Targeted headhunting for Vice Presidents, General Managers, and Functional Directors who execute high-level business strategy.',
    longDescription: [
      'Finding mid-to-senior leaders who unite technical mastery with people management is essential for sustainable growth. TALENTO’s Leadership Recruitment practice targets proven functional directors and department heads who are rarely active on open job boards.',
      'Our dedicated search practice blends direct outbound headhunting with deep network access across South Asia, the Middle East, and global tech corridors.'
    ],
    heroContent: {
      headline: 'Empower Your Strategy with Proven Directors & VPs',
      subheadline: 'Headhunting high-impact senior leaders who transform operational vision into measurable outcomes.',
      badge: 'Leadership Search',
      highlights: ['Specialized Sector Teams', 'Comprehensive Competency Matrix', 'Average 14-Day Delivery'],
      primaryCTA: {
        title: 'Launch a Leadership Search',
        description: 'Tell us about your functional leadership vacancy.',
        buttonText: 'Request Leadership Search',
        buttonHref: '/contact'
      }
    },
    engagementModel: 'Retained Search',
    searchTimeline: '2–4 weeks to presentation',
    guaranteePeriod: '6-Month Replacement Guarantee',
    keyDeliverables: [
      'Comprehensive candidate comparative matrix',
      'Verified performance history and leadership competencies',
      'Compensation package benchmarking & negotiation support',
      '360-degree reference verification reports'
    ],
    searchLifecycle: [
      { phase: 'Phase 1', title: 'Role Calibration', description: 'Defining specific KPI metrics, reporting structures, and division OKRs.' },
      { phase: 'Phase 2', title: 'Targeted Sourcing', description: 'Engaging top 10% performers across competitor and adjacent industry ecosystems.' },
      { phase: 'Phase 3', title: 'Evaluation & Shortlist', description: 'Screening for leadership maturity, execution speed, and cultural fit.' },
      { phase: 'Phase 4', title: 'Closing & Transition', description: 'Guiding offer acceptance and smooth transition.' }
    ],
    faqs: [
      {
        question: 'What seniority levels does Leadership Recruitment cover?',
        answer: 'This service covers Vice Presidents (VP), Country Managers, General Managers, Functional Directors, and Heads of Departments.'
      }
    ],
    relatedServices: ['executive-search', 'specialist-recruitment', 'tech-recruitment'],
    relatedIndustries: ['tech-startups', 'apparel-textiles', 'fmcg-marketplaces', 'hospitality'],
    relatedRoles: ['vp-engineering', 'head-of-product', 'chief-operating-officer-coo'],
    relatedLocations: ['bangladesh', 'uae', 'singapore', 'united-kingdom'],
    cta: {
      title: 'Scale Your Leadership Bench',
      description: 'Partner with TALENTO to secure proven directors and senior management talent.',
      buttonText: 'Submit Leadership Mandate',
      buttonHref: '/contact',
      variant: 'primary'
    },
    seo: {
      title: 'Leadership Recruitment & Director Search | TALENTO',
      description: 'Headhunting senior management, vice presidents, and directors across technology, manufacturing, and commerce.',
      canonicalUrl: 'https://www.talento.agency/services/leadership-recruitment',
      keywords: ['leadership recruitment', 'VP headhunting', 'director executive search', 'headhunter agency']
    }
  },
  {
    id: 'srv-specialist-recruitment',
    slug: 'specialist-recruitment',
    name: 'Specialist Recruitment',
    title: 'Specialist Recruitment & Critical Role Discovery | TALENTO',
    metaDescription: 'Specialized headhunting for rare technical skills, proprietary domain knowledge, and mission-critical corporate positions.',
    shortDescription: 'Precision sourcing for hyper-specialized and business-critical roles with scarce talent availability.',
    longDescription: [
      'Certain mission-critical positions cannot be filled through traditional job postings because the qualified candidate pool consists of fewer than 50 professionals nationwide or regionally.',
      'TALENTO’s Specialist Recruitment practice utilizes deep industry intelligence, technical communities, and proactive headhunting to secure elusive technical, operational, and domain specialists.'
    ],
    heroContent: {
      headline: 'Precision Sourcing for Hard-To-Fill Specialist Roles',
      subheadline: 'Finding needles in the talent haystack: principal engineers, quantitative analysts, and specialized domain architects.',
      badge: 'Specialist Search Practice',
      highlights: ['Deep Domain Mapping', 'Active Sourcing of Passive Experts', 'Tailored Evaluation Scorecards'],
      primaryCTA: {
        title: 'Discuss a Critical Vacancy',
        description: 'Tell us about the specialized skills your team requires.',
        buttonText: 'Submit Specialist Role',
        buttonHref: '/contact'
      }
    },
    engagementModel: 'Contingency',
    searchTimeline: '2–4 weeks',
    guaranteePeriod: '3-Month Guarantee',
    keyDeliverables: [
      'Comprehensive talent scarcity mapping report',
      'Technical capability and track-record validation',
      'Interview coordination and detailed candidate feedback'
    ],
    searchLifecycle: [
      { phase: 'Phase 1', title: 'Technical Capability Matrix', description: 'Deconstructing exact skillsets, tools, certifications, and project scale required.' },
      { phase: 'Phase 2', title: 'Exhaustive Talent Mapping', description: 'Searching technical forums, open-source repositories, competitor teams, and niche networks.' },
      { phase: 'Phase 3', title: 'Direct Value Pitch & Vetting', description: 'Engaging passive specialists with compelling career trajectory opportunities.' }
    ],
    faqs: [
      {
        question: 'What types of roles fall under Specialist Recruitment?',
        answer: 'Examples include Principal AI/ML Engineers, Quantitative Analysts, Regulatory Affairs Directors in Pharma, Industrial Automation Leads, and specialized Financial Counsel.'
      }
    ],
    relatedServices: ['tech-recruitment', 'remote-recruitment'],
    relatedIndustries: ['tech-startups', 'healthcare-life-sciences', 'apparel-textiles', 'agri-business'],
    relatedRoles: ['chief-technology-officer-cto', 'vp-engineering', 'head-of-product'],
    relatedLocations: ['bangladesh', 'singapore', 'united-kingdom', 'united-states'],
    cta: {
      title: 'Struggling to Fill a Critical Vacancy?',
      description: 'Let our search specialists map and engage the right candidates.',
      buttonText: 'Contact Search Specialist',
      buttonHref: '/contact',
      variant: 'primary'
    },
    seo: {
      title: 'Specialist Recruitment & Critical Role Discovery | TALENTO',
      description: 'Specialized headhunting for rare technical skills, proprietary domain knowledge, and hard-to-fill corporate positions.',
      canonicalUrl: 'https://www.talento.agency/services/specialist-recruitment',
      keywords: ['specialist recruitment', 'hard to fill tech roles', 'domain expert headhunters', 'talent mapping']
    }
  },
  {
    id: 'srv-tech-recruitment',
    slug: 'tech-recruitment',
    name: 'Tech Recruitment',
    title: 'Technology & Engineering Recruitment | TALENTO Tech Search',
    metaDescription: 'Specialized tech headhunting for software engineers, engineering managers, cloud architects, and data scientists across South Asia and global tech hubs.',
    shortDescription: 'Dedicated technical recruitment for software engineering, cloud infrastructure, AI/ML, and product management teams.',
    longDescription: [
      'Technology scale-ups and modernizing enterprises require engineers who write maintainable code, architect distributed systems, and thrive in agile product squads.',
      'TALENTO’s Tech Recruitment practice connects high-velocity companies with vetted software engineers, engineering managers, and technical leads across Golang, Python, React, Java, Node.js, and Cloud DevOps.'
    ],
    heroContent: {
      headline: 'Vetted Engineering & Tech Talent for High-Growth Teams',
      subheadline: 'Connecting fast-scaling startups and enterprises with top software engineers, architects, and product leads.',
      badge: 'Tech & Engineering Practice',
      highlights: ['Rigorous Code & Architecture Vetting', '15,000+ Pre-Mapped Tech Network', 'Average 10-Day Time-to-Shortlist'],
      primaryCTA: {
        title: 'Scale Your Engineering Team',
        description: 'Hire vetted senior engineers and tech managers.',
        buttonText: 'Request Tech Talent',
        buttonHref: '/contact'
      }
    },
    engagementModel: 'Contingency',
    searchTimeline: '10–20 days',
    guaranteePeriod: '3-Month Guarantee',
    keyDeliverables: [
      'Pre-screened candidate portfolio with code review notes',
      'Technical assessment scorecard covering system design & problem solving',
      'Candidate compensation & notice period verification'
    ],
    searchLifecycle: [
      { phase: 'Step 1', title: 'Tech Stack & Team Mapping', description: 'Understanding your architecture, engineering practices, and sprint velocity.' },
      { phase: 'Step 2', title: 'Technical Evaluation', description: 'Evaluating system architecture, code hygiene, and problem-solving depth.' },
      { phase: 'Step 3', title: 'Placement & Smooth Onboarding', description: 'Facilitating offer closing and Day-1 team integration.' }
    ],
    faqs: [
      {
        question: 'How do you assess technical depth for engineering roles?',
        answer: 'Our evaluators assess past production architecture, code maintainability, distributed systems concepts, and real-world system design history.'
      }
    ],
    relatedServices: ['leadership-recruitment', 'remote-recruitment', 'specialist-recruitment'],
    relatedIndustries: ['tech-startups', 'fmcg-marketplaces', 'healthcare-life-sciences'],
    relatedRoles: ['chief-technology-officer-cto', 'vp-engineering', 'head-of-product'],
    relatedLocations: ['bangladesh', 'singapore', 'uae', 'united-states'],
    cta: {
      title: 'Accelerate Your Engineering Velocity',
      description: 'Hire vetted software engineers who write clean, scalable code.',
      buttonText: 'Hire Tech Talent',
      buttonHref: '/contact',
      variant: 'primary'
    },
    seo: {
      title: 'Tech Recruitment & Software Engineering Headhunting | TALENTO',
      description: 'Hire vetted software engineers, engineering managers, and technical leads with TALENTO Tech Recruitment.',
      canonicalUrl: 'https://www.talento.agency/services/tech-recruitment',
      keywords: ['tech recruitment agency', 'hire software engineers', 'tech headhunters Dhaka', 'developer recruitment Asia']
    }
  },
  {
    id: 'srv-remote-recruitment',
    slug: 'remote-recruitment',
    name: 'Remote Recruitment',
    title: 'Remote & Distributed Team Recruitment | Cross-Border Hiring | TALENTO',
    metaDescription: 'Source, vet, and hire top remote software engineers, designers, and project specialists with timezone alignment and compliance support.',
    shortDescription: 'Cross-border recruitment for distributed teams, offshore hubs, and high-performance remote talent.',
    longDescription: [
      'Modern businesses scale faster and operate 24/7 by building distributed engineering and operational teams in high-talent, cost-efficient hubs.',
      'TALENTO manages end-to-end remote talent acquisition—from candidate sourcing and communication screening to contract compliance and remote team onboarding across South Asia and global markets.'
    ],
    heroContent: {
      headline: 'Build High-Performance Distributed & Remote Teams',
      subheadline: 'Access top 1% vetted remote software engineers and specialists with fluent English and overlapping working hours.',
      badge: 'Distributed & Remote Talent',
      highlights: ['Timezone Alignment (EST / GMT / SGT)', 'Rigorous English & Communication Vetting', 'Compliance & Contractor Onboarding Support'],
      primaryCTA: {
        title: 'Hire Remote Talent',
        description: 'Explore cross-border remote hiring for your company.',
        buttonText: 'Explore Remote Search',
        buttonHref: '/contact'
      }
    },
    engagementModel: 'On-Demand',
    searchTimeline: '7–14 days',
    guaranteePeriod: 'Satisfaction Guarantee',
    keyDeliverables: [
      'Communication and timezone compatibility screening',
      'Technical assessment & remote work hygiene evaluation',
      'Contractor agreement & cross-border payroll guidance'
    ],
    searchLifecycle: [
      { phase: 'Phase 1', title: 'Remote Work Profiling', description: 'Defining timezone overlap, autonomy level, and technical stack.' },
      { phase: 'Phase 2', title: 'Curated Presentation', description: 'Presenting pre-vetted remote candidates with verified internet and work setups.' },
      { phase: 'Phase 3', title: 'Onboarding & Kickoff', description: 'Streamlined contract setup and remote sprint kickoff.' }
    ],
    faqs: [
      {
        question: 'How do you verify English communication skills for remote candidates?',
        answer: 'All remote candidates undergo structured video assessments evaluating spontaneous technical explanations and written documentation clarity.'
      }
    ],
    relatedServices: ['tech-recruitment', 'specialist-recruitment'],
    relatedIndustries: ['tech-startups', 'fmcg-marketplaces'],
    relatedRoles: ['vp-engineering', 'head-of-product'],
    relatedLocations: ['bangladesh', 'singapore', 'united-states', 'united-kingdom', 'uae'],
    cta: {
      title: 'Scale With Global Remote Talent',
      description: 'Build your distributed engineering team with TALENTO.',
      buttonText: 'Request Remote Profiles',
      buttonHref: '/contact',
      variant: 'primary'
    },
    seo: {
      title: 'Remote & Distributed Team Recruitment | TALENTO',
      description: 'Hire top remote software engineers, developers, and project specialists with TALENTO Remote Recruitment.',
      canonicalUrl: 'https://www.talento.agency/services/remote-recruitment',
      keywords: ['remote recruitment agency', 'hire remote developers', 'cross border tech hiring', 'distributed team recruitment']
    }
  },
  {
    id: 'srv-talent-advisory',
    slug: 'talent-advisory',
    name: 'Talent Advisory',
    title: 'Strategic Talent Advisory & Compensation Benchmarking | TALENTO',
    metaDescription: 'Strategic talent advisory, executive compensation benchmarking, organizational design, and leadership succession planning for high-growth boards.',
    shortDescription: 'Strategic advisory on executive compensation, organizational design, succession planning, and talent retention.',
    longDescription: [
      'In high-growth and restructuring environments, talent strategy must be aligned directly with corporate milestones and investor expectations.',
      'TALENTO partners with corporate boards, founders, and CHROs to deliver actionable compensation benchmarking, organizational chart design, leadership succession planning, and executive retention frameworks.'
    ],
    heroContent: {
      headline: 'Strategic Talent Advisory for Boards & Founders',
      subheadline: 'Aligning organizational design, executive compensation, and leadership succession with enterprise growth.',
      badge: 'Board & CHRO Advisory',
      highlights: ['Granular Salary & Equity Benchmarking', 'Organizational Restructuring Roadmaps', 'Confidential Succession Planning'],
      primaryCTA: {
        title: 'Engage Talent Advisory',
        description: 'Consult with our senior talent advisory partners.',
        buttonText: 'Schedule Advisory Briefing',
        buttonHref: '/contact'
      }
    },
    engagementModel: 'Embedded Advisory',
    searchTimeline: '2–4 weeks project scope',
    guaranteePeriod: 'Full Project Advisory Support',
    keyDeliverables: [
      'Comprehensive market compensation & equity benchmark dossier',
      'Organizational structure & reporting lines diagnostic',
      'Leadership succession plan with internal/external talent gap analysis',
      'Executive retention & milestone-based incentive recommendations'
    ],
    searchLifecycle: [
      { phase: 'Phase 1', title: 'Organizational Diagnostic', description: 'Analyzing current team structure, compensation bands, and growth roadmap.' },
      { phase: 'Phase 2', title: 'Market Intelligence Synthesis', description: 'Benchmarking against peer companies in South Asia, UAE, and APAC.' },
      { phase: 'Phase 3', title: 'Executive Strategy Blueprint', description: 'Delivering final advisory recommendations and implementation roadmap.' }
    ],
    faqs: [
      {
        question: 'What is included in a TALENTO compensation benchmark study?',
        answer: 'Our studies provide detailed data on base salary bands, annual performance bonuses, ESOP/equity allocation, and executive perks broken down by industry and funding stage.'
      }
    ],
    relatedServices: ['executive-search', 'leadership-recruitment'],
    relatedIndustries: ['tech-startups', 'apparel-textiles', 'fmcg-marketplaces', 'healthcare-life-sciences'],
    relatedRoles: ['chief-executive-officer-ceo', 'chief-financial-officer-cfo', 'chief-operating-officer-coo'],
    relatedLocations: ['bangladesh', 'singapore', 'uae'],
    cta: {
      title: 'Elevate Your Talent Strategy',
      description: 'Discuss organizational design and compensation benchmarking with our partners.',
      buttonText: 'Request Advisory Consultation',
      buttonHref: '/contact',
      variant: 'primary'
    },
    seo: {
      title: 'Strategic Talent Advisory & Compensation Benchmarking | TALENTO',
      description: 'Executive compensation benchmarking, organizational design, and succession planning with TALENTO Talent Advisory.',
      canonicalUrl: 'https://www.talento.agency/services/talent-advisory',
      keywords: ['talent advisory firm', 'executive compensation benchmarking', 'organizational design consulting', 'succession planning']
    }
  }
];
