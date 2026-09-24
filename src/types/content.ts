export interface CTA {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'primary' | 'secondary' | 'dark';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOFieldData {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  keywords?: string[];
  noindex?: boolean;
  schemaType?: string;
}

export interface HeroContentData {
  headline: string;
  subheadline: string;
  badge?: string;
  primaryCTA?: CTA;
  secondaryCTA?: CTA;
  highlights?: string[];
}

export interface BaseContentEntity {
  id: string;
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  shortDescription: string;
  longDescription: string | string[];
  heroContent: HeroContentData;
  faqs: FAQItem[];
  relatedServices?: string[];   // Slugs of related services
  relatedIndustries?: string[]; // Slugs of related industries
  relatedRoles?: string[];      // Slugs of related roles
  relatedLocations?: string[];  // Slugs of related locations
  cta: CTA;
  seo: SEOFieldData;
}

// 1. Services Model
export interface ServiceEntity extends BaseContentEntity {
  iconName?: string;
  engagementModel: 'Retained Search' | 'Contingency' | 'Embedded Advisory' | 'Interim' | 'On-Demand';
  keyDeliverables: string[];
  clientProblems?: string[];
  talentoApproach?: Array<{ title: string; description: string }>;
  rolesCovered?: string[];
  searchLifecycle: Array<{ phase: string; title: string; description: string }>;
  searchTimeline?: string;
  guaranteePeriod?: string;
}

// 2. Industries Model
export interface IndustryEntity extends BaseContentEntity {
  iconName?: string;
  typicalPlacements: string[];
  marketChallenges: string[];
  specializedPractices: string[];
  talentPoolSize?: string;
  hiringChallenges?: Array<{ title: string; description: string }>;
  talentRequirements?: string[];
  talentoApproach?: Array<{ title: string; description: string }>;
  recruitmentServices?: string[];
}

// 3. Roles Model
export interface RoleEntity extends BaseContentEntity {
  seniorityLevel: 'C-Suite' | 'Executive / VP' | 'Director' | 'Lead / Specialist' | 'Multi-Level';
  department: string;
  coreCompetencies: string[];
  vettingCriteria: string[];
  averageTimeToHire?: string;
  typicalSalaryRange?: string;
  typicalResponsibilities?: string[];
  keySkills?: string[];
  seniorityLevels?: Array<{ level: string; title: string; description: string }>;
  talentoApproach?: Array<{ title: string; description: string }>;
}

// 4. Locations Model
export interface LocationEntity extends BaseContentEntity {
  country: string;
  countryCode: string;
  city?: string;
  region: string;
  isPhysicalOffice: boolean;
  officeAddress?: string;
  operatingModel?: string;
  specializedCorridors?: string[];
  hiringContext?: Array<{ title: string; description: string }>;
  recruitmentApproach?: Array<{ title: string; description: string }>;
  compensationInsights?: Array<{ role: string; range: string; currency: string }>;
  regulatoryCompliance?: string[];
}

// 5. Insights Model
export interface InsightEntity extends BaseContentEntity {
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
    linkedInUrl?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  category: 'Market Report' | 'Hiring Guide' | 'Salary Trends' | 'Executive Search';
  tableOfContents?: Array<{ id: string; title: string }>;
  contentSections: Array<{
    heading: string;
    body: string;
    takeaways?: string[];
  }>;
}

// 6. Case Studies Model
export interface CaseStudyEntity extends BaseContentEntity {
  clientIndustry: string;
  rolePlaced: string;
  timeToShortlist: string;
  timeToHire: string;
  retentionRate?: string;
  situation: string;
  challenge: string;
  approach: string[];
  outcome: string[];
  clientTestimonial?: {
    quote: string;
    clientRole: string;
    companyType: string;
  };
}

// 7. Location + Role Matrix Model (for Scalable Cross-Sectional SEO)
export interface LocationRoleEntity {
  id: string;
  countrySlug: string;
  roleSlug: string;
  countryName: string;
  roleName: string;
  title: string;
  metaDescription: string;
  canonicalUrl?: string;
  seoKeywords?: string[];
  headline: string;
  subheadline: string;
  badge?: string;
  highlights?: string[];
  overview: string[];
  marketDynamics: Array<{ title: string; description: string }>;
  responsibilitiesInMarket: string[];
  requiredCompetencies: string[];
  talentoApproach: Array<{ title: string; description: string }>;
  timeZoneAndCollaboration: {
    overlapHours: string;
    keyDetails: string[];
  };
  faqs: Array<{ question: string; answer: string }>;
  ctaHeadline?: string;
  ctaSubheadline?: string;
  relatedServices: string[];
  relatedIndustries: string[];
  published: boolean; // safeguard against incomplete/thin pages
}

export type ContentEntityType = 'service' | 'industry' | 'role' | 'location' | 'insight' | 'caseStudy';
