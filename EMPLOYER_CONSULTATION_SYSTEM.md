# TALENTO Premium Employer Inquiry & Consultation System

## 1. Overview
The **Employer Inquiry & Consultation System** is a mobile-first, high-conversion recruitment intake pipeline built for TALENTO. It enables founders, C-suite executives, board members, and talent leaders to initiate confidential search mandates and schedule executive consultations.

---

## 2. Core Specifications

### Primary CTA
- **`"Schedule a Consultation"`**

### Supported Form Fields
| Field Name | Type | Key Validation / Options |
|---|---|---|
| **Full Name** | `text` | Required, min 2 chars, alphabet and standard punctuation only |
| **Work Email** | `email` | RFC 5322 regex validation, warning/tip for free public email domains (`gmail.com`, `yahoo.com`, etc.) |
| **Company** | `text` | Required, min 2 chars |
| **Job Title** | `text` | Required (e.g. CEO, VP of Engineering, CHRO, Board Director) |
| **Hiring Requirement** | `select` | 7 Core Practices: Executive Search, Leadership Recruitment, Tech Recruitment, Specialist Recruitment, Remote Hiring, Embedded Talent Advisory, Interim Leadership |
| **Number of Positions** | `select` | 1 Key Role, 2–5 Positions, 6–10 Positions, 10+ Positions |
| **Hiring Location** | `select` | USA, UK/Europe, UAE/MENA, Singapore/APAC, Canada, Australia, Bangladesh/South Asia, Global Remote |
| **Target Role** | `select` | Software Engineering, Platform/DevOps, Product, Sales/Revenue, Finance/CFO, HR/People, Executive/C-Suite, Specialist |
| **Message** | `textarea` | Required, min 10 chars, character counter indicator |

---

## 3. Security, Privacy & Anti-Spam Protections

1. **Anti-Spam Trap 1 (Honeypot):**
   - Hidden input field `website_url` rendered off-screen with `tabIndex={-1}` and `aria-hidden="true"`.
   - Any automated bot attempting to fill all DOM inputs will trigger this trap; submissions are discarded cleanly without alerting the bot.
2. **Anti-Spam Trap 2 (Velocity Check):**
   - Form fill duration is measured from initial user interaction (`formStartTimeRef`). Submissions occurring in `< 1.5 seconds` are flagged as bot submissions.
3. **Frontend Security (No Exposed Secrets):**
   - Only Supabase `anon` public key is utilized. No `service_role` keys or internal secrets are exposed on the client.
4. **Resilient Data Backup:**
   - Submissions persist to Supabase `employer_inquiries` / `contact_forms` with fallback handling and are mirrored to an encrypted local queue to prevent data loss during network dropouts.
5. **Clear Privacy Notice:**
   - Prominently displays: *"Strict Non-Disclosure Guarantee: All corporate inquiries and hiring specifications are held under strict mutual confidentiality standards. TALENTO never discloses client identities or requirement briefs to third parties."*

---

## 4. Conversion & Telemetry Tracking (`src/utils/analytics.ts`)

The system tracks all key conversion touchpoints through `trackEvent`:

```typescript
// 1. CTA Click
trackEvent('cta_click', {
  cta_text: 'Schedule a Consultation',
  source_location: 'homepage_contact_section',
  company: 'Acme Corp'
});

// 2. Form Start (First User Interaction)
trackEvent('form_start', {
  form_name: 'employer_consultation',
  source_location: 'consultation_page'
});

// 3. Form Submission (Success / Failure)
trackEvent('form_submission', {
  form_name: 'employer_consultation',
  status: 'success',
  reference_id: 'TLN-849201',
  hiring_requirement: 'Executive Search',
  positions_count: '1 Key Role',
  hiring_location: 'United States'
});
```

- Integrates automatically with **Google Tag Manager (`dataLayer.push`)**, **Google Analytics (`gtag`)**, and emits custom DOM `talento_analytics` events.

---

## 5. User Experience & States

### Error State
- Visual red border indicators on invalid fields with alert icons.
- Inline contextual error hints and assistive `aria-invalid` attributes.
- Auto-focus jumps to the first erroneous field upon submission attempt.

### Success State
- Animated confirmation badge and celebratory header.
- Generated confidential **Reference Dossier ID** (e.g. `TLN-849201`).
- Clear **Response SLA** (&lt; 12 Business Hours).
- **Direct Calendly Bridge:** Instant one-click scheduling option for employers wanting an immediate 30-minute video scoping call with a Managing Partner.
- "Submit another inquiry" state reset button.

---

## 6. Architecture & Files
- [`src/types/inquiry.ts`](file:///d:/Talento_SEO%20Backup/Talento_Backup/src/types/inquiry.ts): Type definitions for inquiry payloads, validation states, and telemetry.
- [`src/utils/analytics.ts`](file:///d:/Talento_SEO%20Backup/Talento_Backup/src/utils/analytics.ts): Analytics and event dispatching utility.
- [`src/components/EmployerInquiryForm.tsx`](file:///d:/Talento_SEO%20Backup/Talento_Backup/src/components/EmployerInquiryForm.tsx): The primary reusable form component.
- [`src/components/EmployerConsultationModal.tsx`](file:///d:/Talento_SEO%20Backup/Talento_Backup/src/components/EmployerConsultationModal.tsx): Reusable modal dialog for instant popups.
- [`src/pages/ConsultationPage.tsx`](file:///d:/Talento_SEO%20Backup/Talento_Backup/src/pages/ConsultationPage.tsx): Dedicated landing page at `/consultation` and `/hire`.
- [`src/services/database.ts`](file:///d:/Talento_SEO%20Backup/Talento_Backup/src/services/database.ts): Secure Supabase submission handler.
