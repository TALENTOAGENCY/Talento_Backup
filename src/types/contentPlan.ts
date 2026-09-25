export type ContentPlanningCategory =
  | 'Executive Search'
  | 'Recruitment'
  | 'Tech Hiring'
  | 'Remote Hiring'
  | 'Leadership'
  | 'Talent Acquisition'
  | 'Employer Branding'
  | 'International Hiring'
  | 'Industry Hiring'
  | 'Country Hiring';

export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';

export type TargetAudience =
  | 'Founders / CEOs'
  | 'CTOs / VPs of Engineering'
  | 'CHROs / Talent Leaders'
  | 'Board Members / Investors'
  | 'Hiring Managers'
  | 'Executive Candidates';

export type EditorialStatus =
  | 'planned'
  | 'draft'
  | 'in-review'
  | 'approved'
  | 'published'
  | 'archived';

export interface ContentPlanCTA {
  action: string;
  buttonText: string;
  buttonHref: string;
  targetGoal: string;
  variant?: 'primary' | 'secondary' | 'dark';
}

export interface EditorialWorkflow {
  status: EditorialStatus;
  publishReady: boolean;
  authorAssigned?: string;
  reviewer?: string;
  targetPublishDate?: string;
  approvedDate?: string;
  editorialNotes?: string;
  contentOutline?: string[];
  estimatedWordCount?: number;
  difficultyScore?: 'Low' | 'Medium' | 'High';
  businessPriority?: 'P1 - High' | 'P2 - Medium' | 'P3 - Low';
}

export interface ContentPlanRecord {
  id: string;
  title: string;
  slug: string;
  category: ContentPlanningCategory;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  audience: TargetAudience;
  relatedService: string | string[];
  relatedIndustry: string | string[];
  relatedRole: string | string[];
  relatedLocation: string | string[];
  cta: ContentPlanCTA;
  editorialWorkflow: EditorialWorkflow;
}

export interface ContentPlanningFilterOptions {
  category?: ContentPlanningCategory | 'All';
  status?: EditorialStatus | 'All';
  searchIntent?: SearchIntent | 'All';
  audience?: TargetAudience | 'All';
  searchQuery?: string;
}

export interface ContentPlanningMetrics {
  totalRecords: number;
  publishedCount: number;
  approvedCount: number;
  inReviewCount: number;
  draftCount: number;
  plannedCount: number;
  categoryCounts: Record<ContentPlanningCategory, number>;
}
