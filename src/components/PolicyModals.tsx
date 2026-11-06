import React from 'react';
import { X, Shield, AlertTriangle, PhoneCall } from 'lucide-react';
import { SiteConfig } from '../types';

interface PolicyModalsProps {
  config: SiteConfig;
  isOpen: boolean;
  type: 'privacy' | 'disclaimer' | null;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalsProps> = ({ config, isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-xl border border-[#D8E6DB] relative my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B8370] hover:bg-[#EFF5F0] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EAF2EC] text-[#345139] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1F2F23]">Privacy Policy</h3>
                <p className="text-xs text-[#6B8370]">How your conversations & information are protected</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#465A4B] leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                At <strong>{config.brandName}</strong>, your emotional trust and confidentiality are
                paramount.
              </p>
              <h4 className="font-bold text-[#233527] text-sm">1. 100% Confidential Conversations</h4>
              <p>
                All personal conversations conducted over WhatsApp, Instagram DM, or email are strictly
                between you and {config.creatorName}. We do not share, sell, or disclose your identity,
                stories, or struggles to any third party.
              </p>
              <h4 className="font-bold text-[#233527] text-sm">2. Data Minimization</h4>
              <p>
                We do not collect sensitive clinical records, medical histories, or government IDs. Any
                contact information you submit is solely used to connect directly with you regarding
                support sessions.
              </p>
              <h4 className="font-bold text-[#233527] text-sm">3. Direct Messaging</h4>
              <p>
                Communications take place through standard encrypted messaging platforms (WhatsApp /
                Instagram). You maintain full control over deleting your chat history at any time.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EEF4EF] flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#2D4532] hover:bg-[#1E3023] rounded-xl transition-colors"
              >
                Understood & Close
              </button>
            </div>
          </div>
        )}

        {type === 'disclaimer' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FBF0E4] text-[#855527] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1F2F23]">Disclaimer & Boundaries</h3>
                <p className="text-xs text-[#855527]">Important note on scope of service</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#465A4B] leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <div className="p-3.5 bg-[#FAF3EC] border border-[#ECD9C5] rounded-xl text-[#6D4924] font-medium text-xs">
                {config.brandName} provides non-clinical emotional support, friendly empathetic
                listening, and personal life guidance. It is <strong>NOT</strong> psychiatric treatment,
                formal psychotherapy, or a substitute for professional hospital care.
              </div>

              <h4 className="font-bold text-[#233527] text-sm">Scope of Support</h4>
              <p>
                Our services are designed for everyday life challenges, stress, overthinking, career or
                relationship blues, and personal goal reflection. We do not prescribe medication or
                diagnose mental disorders.
              </p>

              <h4 className="font-bold text-[#233527] text-sm flex items-center gap-2 text-red-700">
                <PhoneCall className="w-4 h-4 text-red-600" />
                Emergency Crisis Helplines in Pakistan
              </h4>
              <p>
                If you or someone you know is in immediate crisis, experiencing severe self-harm thoughts,
                or facing a medical emergency, please reach out directly to licensed emergency services:
              </p>
              <ul className="space-y-2 bg-[#F8F9FA] p-3 rounded-xl border border-[#E9ECEF] text-xs">
                <li>
                  <strong>Umang Pakistan (24/7 Mental Health Helpline):</strong>{' '}
                  <a href="tel:03117786264" className="text-[#2D4532] underline font-semibold">
                    0311-7786264
                  </a>
                </li>
                <li>
                  <strong>Rozan Counseling Helpline:</strong>{' '}
                  <a href="tel:080003000" className="text-[#2D4532] underline font-semibold">
                    0800-03000
                  </a>{' '}
                  (Toll Free)
                </li>
                <li>
                  <strong>Emergency Rescue:</strong> 1122
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EEF4EF] flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#2D4532] hover:bg-[#1E3023] rounded-xl transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
