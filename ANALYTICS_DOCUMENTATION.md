# TALENTO SEO & Conversion Analytics Architecture

## 1. Executive Summary
TALENTO’s analytics layer is designed with strict **privacy-first**, **asynchronous non-blocking execution**, and **zero-PII compliance**. It measures end-to-end recruitment funnel conversions—from organic search arrival through practice discovery, corridor exploration, and consultation submission.

---

## 2. Event Catalog & Taxonomy

| Event Name | Trigger Condition | Page / Context | Business Purpose |
|---|---|---|---|
| **`organic_landing`** | Visitor arrives with organic search referrer (`google`, `bing`, `yahoo`, `duckduckgo`, `baidu`, `yandex`) or `utm_medium=organic`. | Any initial entry page | Measures organic SEO search visibility, high-intent landing traffic, and search engine acquisition channels. |
| **`country_view`** | User navigates to a country corridor page (`/locations/[country]`) or country+role matrix (`/locations/[country]/[role]`). | `/locations/*` | Analyzes international demand for talent corridors across USA, UK, UAE, Singapore, Canada, and Australia. |
| **`service_page_view`** | User views an individual recruitment service landing page. | `/services/[slug]` | Gauges interest in specific search practices (Retained Search, Tech Recruitment, Remote Hiring, Advisory). |
| **`role_page_view`** | User views a role-based recruitment architecture page. | `/roles/[slug]` | Measures employer and candidate intent by functional discipline (Software Engineers, Sales Leaders, CFOs). |
| **`industry_page_view`** | User views an industry vertical SEO hub. | `/industries/[slug]` | Evaluates sector-specific recruitment interest (Fintech, Apparel/RMG, Healthcare, FMCG). |
| **`cta_click`** | User clicks any primary/secondary CTA button or card link. | All pages | Tracks user interaction rate, engagement depth, and navigation pathways across the architecture. |
| **`consultation_click`** | User clicks "Schedule a Consultation", "Hire Talent", or direct Calendly booking bridges. | Navbar, Hero, Contact, Practice pages | Measures high-intent commercial lead conversion initiation and briefing interest. |
| **`form_start`** | User focuses or enters their first input into an employer consultation or application form. | Consultation page, Homepage form, Apply form | Tracks form initiation rate and drop-off velocity before final submission. |
| **`form_submission`** | Form is successfully validated and submitted to the backend API (`status: 'success'` or `'failure'`). | Employer Inquiry / Consultation / Candidate form | Core conversion milestone tracking lead volume, reference IDs, and practice allocation. |
| **`email_click`** | User clicks any direct `mailto:` link (`info@talento-glb.com`, `rubz@talento-glb.com`). | Footer, Contact section, Bio cards | Measures direct email engagement from executive prospects and board partners. |
| **`phone_click`** | User clicks any direct `tel:` link (`+880 1973 591514`). | Header, Footer, Direct contact cards | Measures urgent inbound phone inquiries from corporate hiring managers. |

---

## 3. Technical Implementation & Performance Architecture

### 1. Non-Blocking Execution Guarantee
To guarantee **zero impact on Core Web Vitals (FCP, LCP, INP)**, event dispatching is deferred using `window.requestIdleCallback` (with a `setTimeout(..., 0)` fallback):

```typescript
// Async non-blocking dispatch
const scheduleDispatch = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 0));

scheduleDispatch(() => {
  // Dispatches to GTM, Google Analytics (gtag), DOM CustomEvent, and sessionStorage
});
```

### 2. Multi-Destination Telemetry
Every tracked event is automatically broadcast to:
1. **Google Tag Manager (`window.dataLayer.push`)** — for enterprise tag and marketing attribution.
2. **Google Analytics 4 (`window.gtag('event', ...)`)** — for behavioral analytics and conversion goals.
3. **Internal Custom Event (`window.dispatchEvent(new CustomEvent('talento_analytics', ...))`)** — for in-app reactive triggers.
4. **Session Audit Cache (`sessionStorage`)** — stores recent 50 interaction logs for client-side debugging without cookie bloat.

### 3. Automatic Global Click Delegation
The `initGlobalClickTracking()` listener automatically delegates tracking for:
- All `mailto:*` links -> triggers `email_click`
- All `tel:*` links -> triggers `phone_click`
- All elements with `data-analytics-cta="CTA Name"` -> triggers `cta_click`

---

## 4. Privacy & Zero-PII Compliance

1. **No Sensitive PII Collected:**
   - Raw emails, applicant resumes, phone numbers, and passwords are explicitly scrubbed before dispatching analytics payloads.
   - Only anonymized operational data (e.g., `hiring_requirement`, `country_slug`, `screen_width`, `is_organic`) is retained.
2. **No Exposed Secrets:**
   - No backend database secret keys, master API tokens, or service-role keys are exposed in the client-side bundle.

---

## 5. Developer Guide & Usage Examples

### Using the Declarative Hook
```tsx
import { usePageAnalytics, useAnalytics } from '../hooks/useAnalytics';

export const MyServicePage = () => {
  // Auto-track service view on mount
  usePageAnalytics('service', 'executive-search', 'Executive Search Practice');

  const { trackCtaClick, trackConsultationClick } = useAnalytics();

  return (
    <button
      onClick={() => trackConsultationClick('service_hero_button')}
      className="btn-primary"
    >
      Schedule a Consultation
    </button>
  );
};
```

### Direct HTML Data Attributes
```html
<a
  href="/consultation"
  data-analytics-cta="Explore Executive Practices"
  data-analytics-section="homepage_hero"
>
  Explore Practices
</a>
```
