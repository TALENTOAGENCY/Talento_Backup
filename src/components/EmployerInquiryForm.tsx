import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Building,
  Mail,
  User,
  Briefcase,
  Layers,
  Users,
  MapPin,
  Target,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { EmployerInquiryFormData, FormValidationErrors } from '../types/inquiry';
import { DatabaseService } from '../services/database';
import { trackEvent } from '../utils/analytics';

interface EmployerInquiryFormProps {
  sourceLocation?: string;
  defaultHiringRequirement?: string;
  defaultTargetRole?: string;
  defaultLocation?: string;
  onSuccess?: () => void;
  className?: string;
  isModal?: boolean;
}

const HIRING_REQUIREMENTS = [
  'Executive Search (C-Suite / Board)',
  'Leadership Recruitment (VP / Director)',
  'Tech Recruitment (Engineering / Architect)',
  'Specialist Recruitment (Mid-Senior)',
  'Remote / Cross-Border Hiring',
  'Embedded Talent Advisory / RPO',
  'Interim / Turnaround Leadership'
];

const POSITION_COUNTS = [
  '1 Key Role (Strategic Hire)',
  '2 – 5 Positions (Practice Scaling)',
  '6 – 10 Positions (Department Buildout)',
  '10+ Positions (Enterprise Expansion)'
];

const LOCATIONS = [
  'United States (EST / PST Corridors)',
  'United Kingdom / Europe (GMT / CET)',
  'United Arab Emirates & MENA (GST)',
  'Singapore & Southeast Asia (SGT)',
  'Canada (EST / PST)',
  'Australia & New Zealand (AEST)',
  'Bangladesh & South Asia (GMT+6)',
  'Global Remote / Distributed'
];

const TARGET_ROLES = [
  'Software Engineer / Tech Lead / Architect',
  'Platform / DevOps / Infrastructure Lead',
  'Product Leader / VP of Product',
  'Sales / Commercial / Revenue Leader',
  'Finance Leader / CFO / Controller',
  'HR Leader / VP of Talent / CHRO',
  'Executive / General Management / C-Suite',
  'Other Specialized Discipline'
];

const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'mail.com',
  'protonmail.com'
];

export const EmployerInquiryForm: React.FC<EmployerInquiryFormProps> = ({
  sourceLocation = 'default',
  defaultHiringRequirement,
  defaultTargetRole,
  defaultLocation,
  onSuccess,
  className = '',
  isModal = false
}) => {
  const [formData, setFormData] = useState<EmployerInquiryFormData>({
    full_name: '',
    email: '',
    company: '',
    job_title: '',
    hiring_requirement: defaultHiringRequirement || '',
    positions_count: '',
    hiring_location: defaultLocation || '',
    target_role: defaultTargetRole || '',
    message: '',
    honeypot: '' // Spam trap
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [emailWarning, setEmailWarning] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string>('');
  const [hasStartedForm, setHasStartedForm] = useState<boolean>(false);

  const formStartTimeRef = useRef<number>(Date.now());

  // Track initial interaction
  const handleFirstInteraction = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      formStartTimeRef.current = Date.now();
      trackEvent('form_start', {
        form_name: 'employer_consultation',
        source_location: sourceLocation
      });
    }
  };

  // Strong validation rules
  const validateField = (name: keyof EmployerInquiryFormData, value: string): string | undefined => {
    switch (name) {
      case 'full_name':
        if (!value.trim()) return 'Full Name is required';
        if (value.trim().length < 2) return 'Please enter at least 2 characters';
        if (!/^[a-zA-Z\s.'-]+$/.test(value.trim())) return 'Please enter a valid name';
        return undefined;

      case 'email':
        if (!value.trim()) return 'Work Email is required';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid corporate email address';

        // Check if free email domain
        const domain = value.split('@')[1]?.toLowerCase();
        if (domain && FREE_EMAIL_DOMAINS.includes(domain)) {
          setEmailWarning('Tip: Using your corporate email guarantees prioritized executive review.');
        } else {
          setEmailWarning(null);
        }
        return undefined;

      case 'company':
        if (!value.trim()) return 'Company Name is required';
        if (value.trim().length < 2) return 'Company name is too short';
        return undefined;

      case 'job_title':
        if (!value.trim()) return 'Your Job Title is required';
        return undefined;

      case 'hiring_requirement':
        if (!value) return 'Please select a hiring requirement';
        return undefined;

      case 'positions_count':
        if (!value) return 'Please select the number of positions';
        return undefined;

      case 'hiring_location':
        if (!value) return 'Please select a target hiring location';
        return undefined;

      case 'target_role':
        if (!value) return 'Please select a target role focus';
        return undefined;

      case 'message':
        if (!value.trim()) return 'Please describe your mandate or hiring context';
        if (value.trim().length < 10) return 'Please provide at least 10 characters with your mandate requirements';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    handleFirstInteraction();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error on change if fixed
    if (errors[name as keyof EmployerInquiryFormData]) {
      const fieldError = validateField(name as keyof EmployerInquiryFormData, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldError = validateField(name as keyof EmployerInquiryFormData, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const validateAll = (): boolean => {
    const newErrors: FormValidationErrors = {};
    const fieldsToValidate: (keyof EmployerInquiryFormData)[] = [
      'full_name',
      'email',
      'company',
      'job_title',
      'hiring_requirement',
      'positions_count',
      'hiring_location',
      'target_role',
      'message'
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field] || '');
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    // Track CTA click
    trackEvent('cta_click', {
      cta_text: 'Schedule a Consultation',
      source_location: sourceLocation,
      company: formData.company,
      hiring_requirement: formData.hiring_requirement
    });

    // Spam Trap 1: Honeypot check
    if (formData.honeypot && formData.honeypot.trim() !== '') {
      console.warn('[SPAM BOT BLOCKED: Honeypot triggered]');
      setIsSuccess(true);
      return;
    }

    // Spam Trap 2: Submission velocity check (< 1.5s is inhuman)
    const elapsedSeconds = (Date.now() - formStartTimeRef.current) / 1000;
    if (elapsedSeconds < 1.5) {
      console.warn('[SPAM BOT BLOCKED: Velocity check]');
      setIsSuccess(true);
      return;
    }

    const isValid = validateAll();
    if (!isValid) {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(`inquiry-${firstErrorField}`);
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await DatabaseService.submitEmployerInquiry({
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        job_title: formData.job_title.trim(),
        hiring_requirement: formData.hiring_requirement,
        positions_count: formData.positions_count,
        hiring_location: formData.hiring_location,
        target_role: formData.target_role,
        message: formData.message.trim(),
        metadata: {
          time_to_fill_seconds: Math.round(elapsedSeconds),
          source_location: sourceLocation,
          submitted_at: new Date().toISOString()
        }
      });

      if (res.success) {
        const generatedRef = `TLN-${Math.floor(100000 + Math.random() * 900000)}`;
        setReferenceId(generatedRef);
        setIsSuccess(true);

        trackEvent('form_submission', {
          form_name: 'employer_consultation',
          status: 'success',
          reference_id: generatedRef,
          hiring_requirement: formData.hiring_requirement,
          positions_count: formData.positions_count,
          hiring_location: formData.hiring_location
        });

        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error(res.error || 'Failed to submit consultation request');
      }
    } catch (err: any) {
      console.error('Submission failed:', err);
      const errMsg = err.message || 'We could not connect to our search server. Please try again or book directly via Calendly.';
      setSubmissionError(errMsg);

      trackEvent('form_submission', {
        form_name: 'employer_consultation',
        status: 'failure',
        error_message: errMsg
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      company: '',
      job_title: '',
      hiring_requirement: defaultHiringRequirement || '',
      positions_count: '',
      hiring_location: defaultLocation || '',
      target_role: defaultTargetRole || '',
      message: '',
      honeypot: ''
    });
    setErrors({});
    setIsSuccess(false);
    formStartTimeRef.current = Date.now();
  };

  // SUCCESS STATE VIEW
  if (isSuccess) {
    return (
      <div className={`bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-emerald-200 dark:border-emerald-800/60 shadow-xl text-center space-y-6 animate-fadeIn ${className}`}>
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            Mandate Received & Confidential
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Consultation Request Confirmed
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Thank you, <strong className="text-slate-900 dark:text-white">{formData.full_name}</strong>. A TALENTO Managing Partner for <span className="font-semibold text-emerald-700 dark:text-emerald-400">{formData.hiring_requirement || 'Executive Search'}</span> has been assigned to review your requirements.
          </p>
        </div>

        {/* Reference Dossier */}
        <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto grid grid-cols-2 gap-3 text-left">
          <div>
            <span className="text-slate-400 block font-mono">Reference Dossier:</span>
            <span className="font-bold font-mono text-slate-800 dark:text-slate-100">{referenceId}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Response SLA:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">&lt; 12 Business Hours</span>
          </div>
          <div>
            <span className="text-slate-400 block">Company:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">{formData.company}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Target Territory:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">{formData.hiring_location || 'Global'}</span>
          </div>
        </div>

        {/* Immediate Calendly Bridge Option */}
        <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-left max-w-lg mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-emerald-600" />
            Prefer Immediate Video Discussion?
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Lock in a direct 30-minute confidential scoping session on our Managing Partner’s live calendar right now:
          </p>
          <a
            href="https://calendly.com/talentoagency2/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('cta_click', { cta_text: 'Book on Calendly (Post-Form)', reference_id: referenceId })}
            className="inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg text-xs transition-colors shadow-sm gap-2"
          >
            <span>Open Managing Partner Calendar (Calendly)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="pt-2">
          <button
            onClick={handleResetForm}
            className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline font-medium"
          >
            Submit another hiring inquiry
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE FORM VIEW
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-800 shadow-xl transition-all ${className}`}
    >
      {/* Header */}
      <div className="mb-8 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Confidential Mandate Initiation
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Schedule an Executive Consultation
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Brief our search practice leads on your leadership or specialized hiring requirements. We operate under strict mutual confidentiality protocols.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Anti-Spam Honeypot Field (Invisibly Hidden for Bots) */}
        <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
          <label htmlFor="inquiry-website_url">Do not fill this field</label>
          <input
            type="text"
            id="inquiry-website_url"
            name="honeypot"
            value={formData.honeypot || ''}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Section 1: Contact Identity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="inquiry-full_name"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                Full Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              id="inquiry-full_name"
              name="full_name"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.full_name)}
              aria-describedby={errors.full_name ? 'error-full_name' : undefined}
              value={formData.full_name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Sarah Jenkins"
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border ${
                errors.full_name
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
              } text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
            />
            {errors.full_name && (
              <p id="error-full_name" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.full_name}
              </p>
            )}
          </div>

          {/* Work Email */}
          <div>
            <label
              htmlFor="inquiry-email"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                Work Email <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="email"
              id="inquiry-email"
              name="email"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'error-email' : undefined}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="sarah.jenkins@company.com"
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
              } text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
            />
            {errors.email ? (
              <p id="error-email" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            ) : emailWarning ? (
              <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">{emailWarning}</p>
            ) : null}
          </div>
        </div>

        {/* Section 2: Organization & Authority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Company */}
          <div>
            <label
              htmlFor="inquiry-company"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-600" />
                Company / Organization <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              id="inquiry-company"
              name="company"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? 'error-company' : undefined}
              value={formData.company}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Apex Global Technologies"
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border ${
                errors.company
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
              } text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
            />
            {errors.company && (
              <p id="error-company" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.company}
              </p>
            )}
          </div>

          {/* Job Title */}
          <div>
            <label
              htmlFor="inquiry-job_title"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                Your Job Title <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              id="inquiry-job_title"
              name="job_title"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.job_title)}
              aria-describedby={errors.job_title ? 'error-job_title' : undefined}
              value={formData.job_title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. CEO / VP of Engineering / CHRO"
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border ${
                errors.job_title
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
              } text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
            />
            {errors.job_title && (
              <p id="error-job_title" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.job_title}
              </p>
            )}
          </div>
        </div>

        {/* Section 3: Mandate Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Hiring Requirement */}
          <div>
            <label
              htmlFor="inquiry-hiring_requirement"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                Hiring Requirement <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              id="inquiry-hiring_requirement"
              name="hiring_requirement"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.hiring_requirement)}
              aria-describedby={errors.hiring_requirement ? 'error-hiring_requirement' : undefined}
              value={formData.hiring_requirement}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border ${
                errors.hiring_requirement
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
              } text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
            >
              <option value="">Select practice discipline</option>
              {HIRING_REQUIREMENTS.map((req) => (
                <option key={req} value={req}>
                  {req}
                </option>
              ))}
            </select>
            {errors.hiring_requirement && (
              <p id="error-hiring_requirement" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.hiring_requirement}
              </p>
            )}
          </div>

          {/* Number of Positions */}
          <div>
            <label
              htmlFor="inquiry-positions_count"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                Number of Positions <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              id="inquiry-positions_count"
              name="positions_count"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.positions_count)}
              aria-describedby={errors.positions_count ? 'error-positions_count' : undefined}
              value={formData.positions_count}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border ${
                errors.positions_count
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
              } text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
            >
              <option value="">Select volume</option>
              {POSITION_COUNTS.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
            {errors.positions_count && (
              <p id="error-positions_count" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.positions_count}
              </p>
            )}
          </div>
        </div>

        {/* Section 4: Target Alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Hiring Location */}
          <div>
            <label
              htmlFor="inquiry-hiring_location"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Hiring Location / Corridor <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              id="inquiry-hiring_location"
              name="hiring_location"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.hiring_location)}
              aria-describedby={errors.hiring_location ? 'error-hiring_location' : undefined}
              value={formData.hiring_location}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border ${
                errors.hiring_location
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
              } text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
            >
              <option value="">Select target jurisdiction</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            {errors.hiring_location && (
              <p id="error-hiring_location" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.hiring_location}
              </p>
            )}
          </div>

          {/* Target Role */}
          <div>
            <label
              htmlFor="inquiry-target_role"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                Target Role Discipline <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              id="inquiry-target_role"
              name="target_role"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.target_role)}
              aria-describedby={errors.target_role ? 'error-target_role' : undefined}
              value={formData.target_role}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border ${
                errors.target_role
                  ? 'border-red-500 focus:ring-red-500/20'
                  : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
              } text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
            >
              <option value="">Select target role category</option>
              {TARGET_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.target_role && (
              <p id="error-target_role" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.target_role}
              </p>
            )}
          </div>
        </div>

        {/* Section 5: Mandate Details Message */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="inquiry-message"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              Mandate Specifications & Message <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {formData.message.length} chars
            </span>
          </div>
          <textarea
            id="inquiry-message"
            name="message"
            rows={4}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'error-message' : undefined}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Please outline key responsibilities, seniority expectations, budget/compensation bracket, timeline urgency, or tech stack requirements..."
            className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 border ${
              errors.message
                ? 'border-red-500 focus:ring-red-500/20'
                : 'border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20'
            } text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
          />
          {errors.message && (
            <p id="error-message" className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.message}
            </p>
          )}
        </div>

        {/* Submission Error Alert */}
        {submissionError && (
          <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong>Submission Issue:</strong> {submissionError}
            </div>
          </div>
        )}

        {/* Confidentiality / Privacy Notice */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-700 dark:text-slate-200">Strict Non-Disclosure Guarantee:</strong>{' '}
            All corporate inquiries and hiring specifications are held under strict mutual confidentiality standards. TALENTO never discloses client identities or requirement briefs to third parties.
          </div>
        </div>

        {/* Primary CTA Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 group cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Confidential Mandate...</span>
            </>
          ) : (
            <>
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
