import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFrappeGetCall } from 'frappe-react-sdk';

type AnalyticsPayload = {
  google_analytics_id?: string;
  google_analytics_anonymize_ip?: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ga?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const location = useLocation();
  const { data } = useFrappeGetCall('travel_agency_website.api.get_public_website_analytics');
  const payload = data?.message as AnalyticsPayload | undefined;
  const measurementId = payload?.google_analytics_id?.trim() ?? '';
  const anonymizeIp = Boolean(payload?.google_analytics_anonymize_ip);

  const [scriptsReady, setScriptsReady] = useState(false);

  useEffect(() => {
    if (!measurementId) return;
    if (!measurementId.startsWith('G-') && !measurementId.startsWith('UA-')) {
      console.warn(
        '[GoogleAnalytics] Use a GA4 ID starting with G- or a Universal Analytics ID starting with UA-. Other values are ignored.'
      );
      return;
    }

    if (measurementId.startsWith('G-')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      script.onload = () => {
        window.dataLayer = window.dataLayer ?? [];
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer!.push(args);
        };
        window.gtag('js', new Date());
        setScriptsReady(true);
      };
      document.head.appendChild(script);
      return () => {
        setScriptsReady(false);
      };
    }

    if (measurementId.startsWith('UA-')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.google-analytics.com/analytics.js';
      script.onload = () => {
        window.ga?.('create', measurementId, 'auto');
        if (anonymizeIp) {
          window.ga?.('set', 'anonymizeIp', true);
        }
        setScriptsReady(true);
      };
      document.head.appendChild(script);
      return () => {
        setScriptsReady(false);
      };
    }
  }, [measurementId, anonymizeIp]);

  useEffect(() => {
    if (!measurementId || !scriptsReady) return;

    const path = `${location.pathname}${location.search}`;

    if (measurementId.startsWith('G-') && window.gtag) {
      window.gtag('config', measurementId, {
        page_path: path,
        send_page_view: true,
        ...(anonymizeIp ? { anonymize_ip: true } : {}),
      });
      return;
    }

    if (measurementId.startsWith('UA-') && window.ga) {
      window.ga('set', 'page', path);
      window.ga('send', 'pageview');
    }
  }, [location.pathname, location.search, measurementId, anonymizeIp, scriptsReady]);

  return null;
}
