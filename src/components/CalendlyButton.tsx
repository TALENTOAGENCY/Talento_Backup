// src/components/CalendlyButton.tsx
import React, { useEffect } from 'react';

interface CalendlyButtonProps {
  url: string;
  text?: string;
  className?: string;
}

export function CalendlyButton({ url, text = "Schedule a Consultation", className = "" }: CalendlyButtonProps) {
  useEffect(() => {
    // Load Calendly widget script if not already loaded
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openCalendlyPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: url,
        prefill: {},
        utm: {}
      });
    }
  };

  return (
    <button
      onClick={openCalendlyPopup}
      className={`inline-flex items-center bg-talento-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-talento-700 transition-colors ${className}`}
    >
      {text}
    </button>
  );
}