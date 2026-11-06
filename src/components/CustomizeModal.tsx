import React, { useState } from 'react';
import { X, RotateCcw, Check, SlidersHorizontal, HelpCircle } from 'lucide-react';
import { SiteConfig } from '../types';
import { DEFAULT_CONFIG } from '../utils/config';

interface CustomizeModalProps {
  config: SiteConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: SiteConfig) => void;
  onOpenHostingGuide: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  config,
  isOpen,
  onClose,
  onSave,
  onOpenHostingGuide,
}) => {
  const [formData, setFormData] = useState<SiteConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof SiteConfig, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSavedSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    setFormData(DEFAULT_CONFIG);
    onSave(DEFAULT_CONFIG);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-xl border border-[#D5E2D7] relative my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B8370] hover:bg-[#EFF5F0] transition-colors"
          aria-label="Close customization panel"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2EC] text-[#345139] flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1F2F23]">Live Details & Placeholders</h3>
            <p className="text-xs text-[#5C7561]">
              Customize your brand, contact, and pricing to see immediate updates across the site.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
                Brand Name
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => handleChange('brandName', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
                placeholder="[Your Brand Name]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={formData.creatorName}
                onChange={(e) => handleChange('creatorName', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
                placeholder="[Your Name]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
                placeholder="+92 300 1234567"
                required
              />
              <span className="text-[10px] text-[#6E8873]">For wa.me links</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
                Instagram Handle
              </label>
              <input
                type="text"
                value={formData.instagramUsername}
                onChange={(e) => handleChange('instagramUsername', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
                placeholder="[Your Instagram Username]"
                required
              />
              <span className="text-[10px] text-[#6E8873]">Username without @</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
                placeholder="[Your Email]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
                7-Day Support Price
              </label>
              <input
                type="text"
                value={formData.sevenDayPrice}
                onChange={(e) => handleChange('sevenDayPrice', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
                placeholder="PKR [Your Price]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
                30-Day Support Price
              </label>
              <input
                type="text"
                value={formData.thirtyDayPrice || 'PKR [Your 30-Day Price]'}
                onChange={(e) => handleChange('thirtyDayPrice', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
                placeholder="PKR [Your 30-Day Price]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
                Session Format / Notes
              </label>
              <input
                type="text"
                value={formData.sessionDuration}
                onChange={(e) => handleChange('sessionDuration', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
                placeholder="[Your Session Duration]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
                Qualifications / Credentials
              </label>
              <input
                type="text"
                value={formData.qualifications}
                onChange={(e) => handleChange('qualifications', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
                placeholder="[Your Qualifications]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
                Main Hero Headline
              </label>
              <input
                type="text"
                value={formData.heroHeadline}
                onChange={(e) => handleChange('heroHeadline', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
                placeholder="All You Need Is a Friend, Not a Therapist."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
                Subheading
              </label>
              <input
                type="text"
                value={formData.heroSubheadline}
                onChange={(e) => handleChange('heroSubheadline', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
                placeholder="Connect with me for your emotional support and guidance."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
              About Me Headline
            </label>
            <input
              type="text"
              value={formData.bioHeadline}
              onChange={(e) => handleChange('bioHeadline', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D3F30] uppercase mb-1">
              About Me Bio Story
            </label>
            <textarea
              rows={3}
              value={formData.bioStory}
              onChange={(e) => handleChange('bioStory', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D0DEC4] bg-[#FAF8F5] text-[#1E2E20] focus:ring-2 focus:ring-[#527357] focus:outline-none resize-none"
            />
          </div>

          <div className="pt-4 border-t border-[#EEF4EF] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#59705E] hover:text-[#233527] hover:bg-[#F0F5F1] rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Placeholders</span>
              </button>
              <button
                type="button"
                onClick={onOpenHostingGuide}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#405F46] hover:underline"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Deploy Guide</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#2D4532] hover:bg-[#1E3023] rounded-xl transition-colors shadow-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#9FE2AB]" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Apply to Website</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
