import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Clock,
  Globe2,
  Building,
  Award,
  Calendar,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EmployerInquiryForm } from '../components/EmployerInquiryForm';
import { FAQAccordion } from '../components/FAQAccordion';

interface ConsultationPageProps {
  onBackToHome?: () => void;
}

const CONSULTATION_FAQS = [
  {
    question: 'How quickly does TALENTO respond to an employer consultation request?',
    answer:
      'A Managing Partner reviews every submitted corporate inquiry within 12 business hours. For urgent leadership replacements or time-sensitive C-suite mandates, we initiate initial discovery calls on the same business day.'
  },
  {
    question: 'How is confidential employer and mandate data protected?',
    answer:
      'All employer communications and hiring parameters are managed under strict mutual non-disclosure (NDA) standards. We never disclose client organizational changes, compensation brackets, or technical roadmaps to candidates or the market without explicit authorization.'
  },
  {
    question: 'Can we schedule a direct video call without waiting for email correspondence?',
    answer:
      'Yes. Upon form submission (or directly via our Calendly integration), employers can select an immediate 30-minute confidential scoping video session with our practice partners.'
  },
  {
    question: 'What search models are available following the initial consultation?',
    answer:
      'Depending on seniority, scarcity, and urgency, we offer Retained Executive Search (for C-Suite/Board), Contingency Recruitment (for specialized mid-to-senior individual contributors), and Embedded Talent Advisory (for rapid multi-hire scaleups).'
  }
];

export const ConsultationPage: React.FC<ConsultationPageProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <SEO
        title="Schedule a Search Consultation | TALENTO Boutique Headhunting"
        description="Initiate a confidential executive search or specialist recruitment mandate. Connect with TALENTO Managing Partners across USA, UK, UAE, and global markets."
        canonical="https://talento.agency/consultation"
        ogType="website"
      />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Employer Consultation', href: '/consultation' }
            ]}
          />

          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Confidential Client Engagement
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Schedule an Executive Search Consultation
            </h1>
            <p className="mt-2 text-base text-slate-300 leading-relaxed">
              Partner with specialized practice leaders to source proven C-suite executives, senior engineering leaders, and market specialists across global corridors.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Trust Signals & Fast Scheduling */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                The TALENTO Search Guarantee
              </h3>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>10–14 Day Shortlist:</strong> Curated, thoroughly vetted candidate dossiers delivered with comprehensive behavioral & technical evaluation scorecards.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Discreet Executive Outreach:</strong> Direct access to top 5% passive market leaders not visible on public job boards.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cross-Border Corridor Expertise:</strong> Frictionless recruitment across US, UK, UAE, Singapore, Canada, and South Asia.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Comprehensive Replacement Warranty:</strong> Guaranteed candidate retention backing on all retained executive placements.
                  </span>
                </li>
              </ul>
            </div>

            {/* Direct Calendly Alternative Box */}
            <div className="bg-gradient-to-br from-emerald-800 to-slate-900 text-white p-6 rounded-2xl shadow-md space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <Calendar className="w-4 h-4" />
                Immediate Live Scheduling
              </div>
              <h4 className="text-lg font-bold">Book a 30-Minute Video Briefing</h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Need urgent talent advisory or confidential scoping? Access our Managing Partner’s live calendar directly:
              </p>
              <a
                href="https://calendly.com/talentoagency2/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-white text-slate-900 font-semibold py-2.5 px-4 rounded-xl text-xs hover:bg-slate-100 transition-colors shadow-sm gap-2"
              >
                <span>Select Slot on Calendly</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Contact Reference */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white">Direct Partner Inquiries:</div>
              <div>✉️ rubz@talento-glb.com | info@talento-glb.com</div>
              <div>📞 +880 1973 591514 | +880 1341 749853</div>
              <div className="text-[11px] text-slate-400 pt-1">Plot 37, Floor 3, Road 11, Block H, Banani, Dhaka-1213</div>
            </div>
          </div>

          {/* Right Column: Premium Employer Consultation Form */}
          <div className="lg:col-span-7">
            <EmployerInquiryForm
              sourceLocation="consultation_page"
              className="border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
              Frequently Asked Questions by Employers
            </h2>
            <FAQAccordion items={CONSULTATION_FAQS} />
          </div>
        </div>
      </div>
    </div>
  );
};
