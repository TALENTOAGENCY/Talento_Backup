import { useEffect } from 'react';
import {
  trackOrganicLanding,
  trackCountryView,
  trackServicePageView,
  trackRolePageView,
  trackIndustryPageView,
  trackCtaClick,
  trackConsultationClick,
  trackFormStart,
  trackFormSubmission,
  trackEmailClick,
  trackPhoneClick,
  trackEvent,
  TalentoEventType
} from '../utils/analytics';

/**
 * Custom React hook for easy declarative analytics integration
 */
export function useAnalytics() {
  return {
    trackOrganicLanding,
    trackCountryView,
    trackServicePageView,
    trackRolePageView,
    trackIndustryPageView,
    trackCtaClick,
    trackConsultationClick,
    trackFormStart,
    trackFormSubmission,
    trackEmailClick,
    trackPhoneClick,
    trackEvent
  };
}

/**
 * Hook to automatically track pageviews on component mount
 */
export function usePageAnalytics(
  type: 'service' | 'role' | 'industry' | 'country' | 'custom',
  slug: string,
  extra?: string
) {
  useEffect(() => {
    switch (type) {
      case 'service':
        trackServicePageView(slug, extra);
        break;
      case 'role':
        trackRolePageView(slug, extra);
        break;
      case 'industry':
        trackIndustryPageView(slug, extra);
        break;
      case 'country':
        trackCountryView(slug, extra);
        break;
      default:
        break;
    }
  }, [type, slug, extra]);
}
