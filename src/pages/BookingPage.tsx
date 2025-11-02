// src/pages/BookingPage.tsx
import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface BookingPageProps {
  onBack: () => void;
}

export function BookingPage({ onBack }: BookingPageProps) {
  useEffect(() => {
    // Load Calendly widget script if not already loaded
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Initialize Calendly inline widget
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/your-username/30min',
        parentElement: document.getElementById('calendly-container'),
        prefill: {},
        utm: {}
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-talento-600 hover:text-talento-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Schedule a Consultation</h1>
          <div id="calendly-container" style={{ minHeight: '700px' }}></div>
        </div>
      </div>
    </div>
  );
}