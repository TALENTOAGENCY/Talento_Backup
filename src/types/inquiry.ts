export interface EmployerInquiryFormData {
  full_name: string;
  email: string;
  company: string;
  job_title: string;
  hiring_requirement: string;
  positions_count: string;
  hiring_location: string;
  target_role: string;
  message: string;
  honeypot?: string; // Hidden spam prevention field
}

export interface EmployerInquiryRecord extends EmployerInquiryFormData {
  id?: string;
  created_at?: string;
  status?: 'new' | 'contacted' | 'briefed' | 'retained' | 'closed';
  metadata?: {
    source_url?: string;
    referrer?: string;
    device_type?: 'mobile' | 'tablet' | 'desktop';
    time_to_fill_seconds?: number;
    submitted_at: string;
  };
}

export type FormValidationErrors = Partial<Record<keyof EmployerInquiryFormData, string>>;

export interface AnalyticsEvent {
  event: 'cta_click' | 'form_start' | 'form_submission';
  timestamp: string;
  properties?: Record<string, any>;
}
