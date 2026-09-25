/**
 * TALENTO Production SEO & Conversion Analytics Engine
 * Privacy-first, asynchronous, and non-render-blocking
 */

export type TalentoEventType =
  | 'organic_landing'
  | 'country_view'
  | 'service_page_view'
  | 'role_page_view'
  | 'industry_page_view'
  | 'cta_click'
  | 'consultation_click'
  | 'form_start'
  | 'form_submission'
  | 'email_click'
  | 'phone_click';

export interface TalentoEventPayload {
  event: TalentoEventType;
  timestamp: string;
  path: string;
  url: string;
  referrer: string;
  is_organic: boolean;
  search_engine?: string;
  screen_width: number;
  properties: Record<string, any>;
}

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const SEARCH_ENGINE_REFERRERS: Record<string, string> = {
  'google.': 'Google',
  'bing.com': 'Bing',
  'yahoo.': 'Yahoo',
  'duckduckgo.com': 'DuckDuckGo',
  'baidu.com': 'Baidu',
  'yandex.': 'Yandex',
  'ecosia.org': 'Ecosia'
};

/**
 * Detects if the current visitor arrived via an organic search engine
 */
export function detectOrganicSource(): { isOrganic: boolean; searchEngine?: string } {
  if (typeof document === 'undefined') return { isOrganic: false };

  const referrer = document.referrer.toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  const utmMedium = urlParams.get('utm_medium')?.toLowerCase();
  const utmSource = urlParams.get('utm_source')?.toLowerCase();

  // Check URL UTM params
  if (utmMedium === 'organic') {
    return { isOrganic: true, searchEngine: utmSource || 'Organic Search' };
  }

  // Check Referrer string
  for (const [domainKey, engineName] of Object.entries(SEARCH_ENGINE_REFERRERS)) {
    if (referrer.includes(domainKey)) {
      return { isOrganic: true, searchEngine: engineName };
    }
  }

  return { isOrganic: false };
}

/**
 * Non-blocking Universal Event Dispatcher
 * Dispatches asynchronously using requestIdleCallback or setTimeout
 * to ensure zero impact on First Contentful Paint (FCP) and user interactions.
 */
export function trackEvent(
  event: TalentoEventType,
  properties: Record<string, any> = {}
): void {
  if (typeof window === 'undefined') return;

  const scheduleDispatch = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 0));

  scheduleDispatch(() => {
    try {
      const organicData = detectOrganicSource();

      // Sanitization: Remove any accidental raw PII keys
      const sanitizedProps = { ...properties };
      delete sanitizedProps.password;
      delete sanitizedProps.raw_email;
      delete sanitizedProps.raw_phone;
      delete sanitizedProps.cv_content;

      const payload: TalentoEventPayload = {
        event,
        timestamp: new Date().toISOString(),
        path: window.location.pathname,
        url: window.location.href,
        referrer: document.referrer || 'Direct',
        is_organic: organicData.isOrganic,
        search_engine: organicData.searchEngine,
        screen_width: window.innerWidth,
        properties: sanitizedProps
      };

      // 1. Google Tag Manager / dataLayer push
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: payload.event,
          ...payload.properties,
          talento_metadata: {
            is_organic: payload.is_organic,
            search_engine: payload.search_engine,
            path: payload.path,
            timestamp: payload.timestamp
          }
        });
      }

      // 2. Google Analytics (gtag) push
      if (typeof window.gtag === 'function') {
        window.gtag('event', payload.event, {
          ...payload.properties,
          page_path: payload.path,
          is_organic: payload.is_organic,
          search_engine: payload.search_engine
        });
      }

      // 3. Custom DOM Event for internal components or dev listener
      window.dispatchEvent(
        new CustomEvent('talento_analytics', {
          detail: payload
        })
      );

      // 4. Session Storage Audit Log (Recent 50 Events)
      try {
        const stored = JSON.parse(sessionStorage.getItem('talento_analytics_session') || '[]');
        stored.push(payload);
        if (stored.length > 50) stored.shift();
        sessionStorage.setItem('talento_analytics_session', JSON.stringify(stored));
      } catch {
        // Ignore quota/private browsing errors
      }

      if (import.meta.env.DEV) {
        console.debug(`[TALENTO Analytics: ${event}]`, payload);
      }
    } catch (err) {
      // Analytics must never throw or break user application state
      console.warn('[TALENTO Analytics Dispatch Error]', err);
    }
  });
}

// Specialized Reusable Event Helpers

export function trackOrganicLanding(): void {
  const organicData = detectOrganicSource();
  if (organicData.isOrganic) {
    trackEvent('organic_landing', {
      landing_page: window.location.pathname,
      search_engine: organicData.searchEngine
    });
  }
}

export function trackCountryView(countrySlug: string, roleSlug?: string): void {
  trackEvent('country_view', {
    country_slug: countrySlug,
    role_slug: roleSlug || 'all_roles',
    page_type: roleSlug ? 'country_role_matrix' : 'country_overview'
  });
}

export function trackServicePageView(serviceSlug: string, serviceName?: string): void {
  trackEvent('service_page_view', {
    service_slug: serviceSlug,
    service_name: serviceName || serviceSlug
  });
}

export function trackRolePageView(roleSlug: string, roleName?: string): void {
  trackEvent('role_page_view', {
    role_slug: roleSlug,
    role_name: roleName || roleSlug
  });
}

export function trackIndustryPageView(industrySlug: string, industryName?: string): void {
  trackEvent('industry_page_view', {
    industry_slug: industrySlug,
    industry_name: industryName || industrySlug
  });
}

export function trackCtaClick(
  ctaText: string,
  destinationUrl?: string,
  sectionName?: string
): void {
  trackEvent('cta_click', {
    cta_text: ctaText,
    destination_url: destinationUrl,
    section: sectionName || 'page_content'
  });
}

export function trackConsultationClick(sourceLocation: string, buttonText?: string): void {
  trackEvent('consultation_click', {
    source_location: sourceLocation,
    button_text: buttonText || 'Schedule a Consultation',
    action_type: 'consultation_initiation'
  });
}

export function trackFormStart(formName: string, sourceLocation?: string): void {
  trackEvent('form_start', {
    form_name: formName,
    source_location: sourceLocation || 'default'
  });
}

export function trackFormSubmission(
  formName: string,
  status: 'success' | 'failure',
  details: Record<string, any> = {}
): void {
  trackEvent('form_submission', {
    form_name: formName,
    status,
    ...details
  });
}

export function trackEmailClick(emailAddress: string, sourceLocation?: string): void {
  trackEvent('email_click', {
    email_destination: emailAddress,
    source_location: sourceLocation || 'page_contact'
  });
}

export function trackPhoneClick(phoneNumber: string, sourceLocation?: string): void {
  trackEvent('phone_click', {
    phone_destination: phoneNumber,
    source_location: sourceLocation || 'page_contact'
  });
}

/**
 * Initializes automatic global click delegation for email (mailto:) and phone (tel:) links
 */
export function initGlobalClickTracking(): () => void {
  if (typeof document === 'undefined') return () => {};

  const handleGlobalClick = (event: MouseEvent) => {
    const target = (event.target as Element)?.closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    if (href.startsWith('mailto:')) {
      const email = href.replace('mailto:', '').split('?')[0];
      trackEmailClick(email, target.getAttribute('data-location') || 'link_click');
    } else if (href.startsWith('tel:')) {
      const phone = href.replace('tel:', '').trim();
      trackPhoneClick(phone, target.getAttribute('data-location') || 'link_click');
    } else if (target.getAttribute('data-analytics-cta')) {
      const ctaName = target.getAttribute('data-analytics-cta') || target.textContent || 'CTA';
      trackCtaClick(ctaName, href, target.getAttribute('data-analytics-section') || 'global_link');
    }
  };

  document.addEventListener('click', handleGlobalClick, { passive: true });

  return () => {
    document.removeEventListener('click', handleGlobalClick);
  };
}
