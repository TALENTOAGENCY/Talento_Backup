import { AnalyticsEvent } from '../types/inquiry';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Universal event tracker for TALENTO conversion tracking
 * Supports Google Analytics (gtag), GTM dataLayer, and persistent local audit telemetry
 */
export function trackEvent(
  event: 'cta_click' | 'form_start' | 'form_submission',
  properties: Record<string, any> = {}
): void {
  const eventPayload: AnalyticsEvent = {
    event,
    timestamp: new Date().toISOString(),
    properties: {
      url: window.location.href,
      path: window.location.pathname,
      screen_width: window.innerWidth,
      ...properties
    }
  };

  // 1. Google Tag Manager / dataLayer push
  if (typeof window !== 'undefined') {
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(eventPayload);
    }

    // 2. Google Analytics gtag push
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, eventPayload.properties);
    }

    // 3. Dispatch custom DOM event for custom listeners
    window.dispatchEvent(
      new CustomEvent('talento_analytics', {
        detail: eventPayload
      })
    );
  }

  // 4. Local audit storage for conversion analysis
  try {
    const existingEvents: AnalyticsEvent[] = JSON.parse(
      localStorage.getItem('talento_analytics_log') || '[]'
    );
    existingEvents.push(eventPayload);
    // keep recent 50 events
    if (existingEvents.length > 50) {
      existingEvents.shift();
    }
    localStorage.setItem('talento_analytics_log', JSON.stringify(existingEvents));
  } catch (err) {
    // Silent fail for storage quota or private browsing
  }

  if (import.meta.env.DEV) {
    console.info(`[TALENTO Analytics Tracked: ${event}]`, eventPayload);
  }
}
