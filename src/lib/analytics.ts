// ============================================================================
// AN FOCUS — Analytics & Tracking Integration
// Ready for Google Analytics (GA4) and Meta Pixel (gtag / fbq).
// Uses environment variables NEXT_PUBLIC_GA_ID and NEXT_PUBLIC_META_PIXEL_ID.
// ============================================================================

import { analyticsConfig } from '@/config/site';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type EventType =
  | 'cta_click'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'contact_form_submit'
  | 'consultation_request'
  | 'service_inquiry'
  | 'portfolio_view';

export interface EventPayload {
  label?: string;
  category?: string;
  value?: number;
  [key: string]: unknown;
}

export function trackEvent(eventName: EventType, payload?: EventPayload): void {
  if (typeof window === 'undefined') return;

  // Development logger
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.info(`[Analytics Track] ${eventName}:`, payload);
  }

  // Google Analytics (GA4)
  if (analyticsConfig.googleAnalyticsId && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: payload?.category || 'engagement',
      event_label: payload?.label,
      value: payload?.value,
      ...payload,
    });
  }

  // Meta Pixel
  if (analyticsConfig.metaPixelId && typeof window.fbq === 'function') {
    if (eventName === 'contact_form_submit') {
      window.fbq('track', 'Lead', payload);
    } else if (eventName === 'consultation_request') {
      window.fbq('track', 'Schedule', payload);
    } else if (eventName === 'whatsapp_click' || eventName === 'phone_click') {
      window.fbq('track', 'Contact', payload);
    } else {
      window.fbq('trackCustom', eventName, payload);
    }
  }
}
