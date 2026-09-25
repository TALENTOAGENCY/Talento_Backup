import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { EmployerInquiryForm } from './EmployerInquiryForm';

interface EmployerConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultHiringRequirement?: string;
  defaultTargetRole?: string;
  defaultLocation?: string;
  sourceLocation?: string;
}

export const EmployerConsultationModal: React.FC<EmployerConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultHiringRequirement,
  defaultTargetRole,
  defaultLocation,
  sourceLocation = 'modal'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-consultation-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close consultation modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          <EmployerInquiryForm
            isModal={true}
            sourceLocation={sourceLocation}
            defaultHiringRequirement={defaultHiringRequirement}
            defaultTargetRole={defaultTargetRole}
            defaultLocation={defaultLocation}
            onSuccess={() => {
              // Optional callback on success
            }}
          />
        </div>
      </div>
    </div>
  );
};
