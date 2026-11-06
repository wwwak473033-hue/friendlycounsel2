import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, ArrowUpRight, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { SiteConfig } from '../types';
import { buildWhatsAppUrl, buildInstagramUrl, buildMailtoUrl, buildTelegramUrl } from '../utils/config';

interface ContactSectionProps {
  config: SiteConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [serviceInterest, setServiceInterest] = useState('7-Day Friendly Support');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const standardWhatsAppText = `Hi ${config.creatorName}! I visited your website and I’m interested in your personal emotional support services. Could you please share details?`;
  const whatsappUrl = buildWhatsAppUrl(config.whatsappNumber, standardWhatsAppText);
  const instagramUrl = buildInstagramUrl(config.instagramUsername);
  const telegramUrl = buildTelegramUrl(config.telegramUsername);
  const emailUrl = buildMailtoUrl(
    config.email,
    'Personal Emotional Support Enquiry',
    standardWhatsAppText
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!contactMethod.trim()) {
      setFormError('Please enter your WhatsApp, Telegram, or email so I can reply.');
      return;
    }

    setFormError('');
    setFormSubmitted(true);
  };

  const handleSendViaWhatsAppFromForm = () => {
    const text = `Hi ${config.creatorName}! My name is ${name}. I am contacting you regarding: ${serviceInterest}.\n\nMy Contact: ${contactMethod}${message ? `\n\nNote: ${message}` : ''}`;
    window.open(buildWhatsAppUrl(config.whatsappNumber, text), '_blank');
  };

  const handleResetForm = () => {
    setName('');
    setContactMethod('');
    setMessage('');
    setFormSubmitted(false);
    setFormError('');
  };

  return (
    <section id="contact" className="py-14 md:py-20 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F1EA] rounded-full text-xs font-semibold text-[#324C36] mb-2.5">
            <span>Direct & Personal Connection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2F23] tracking-tight mb-2">
            Let’s Talk 💚
          </h2>
          <p className="text-xs sm:text-sm text-[#4C6150] leading-relaxed max-w-md mx-auto">
            Choose your preferred way to connect—swipe left to right for WhatsApp, Instagram, Telegram, or Email.
          </p>
        </div>

        {/* Logo-type left-to-right scrollable channels bar (WhatsApp, Instagram, Telegram, Email) */}
        <div className="mb-8 max-w-5xl mx-auto">
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 overflow-x-auto snap-x scroll-smooth pb-2 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Logo 1: WhatsApp (Primary) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="snap-start shrink-0 w-[240px] sm:w-auto p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#EBF7EE] to-[#E0F2E4] border-2 border-[#25D366] hover:shadow-md transition-all flex items-center gap-3.5 group shadow-2xs"
            >
              <div className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6 fill-white text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-sm text-[#143B1B]">WhatsApp</h3>
                  <span className="text-[9px] bg-[#2D4532] text-[#9FE2AB] px-1.5 py-0.5 rounded font-bold uppercase">
                    Instant
                  </span>
                </div>
                <p className="text-[11px] text-[#406848] font-medium truncate mt-0.5">
                  {config.whatsappNumber}
                </p>
                <span className="text-[10px] text-[#1E5627] font-semibold flex items-center gap-0.5 mt-1 group-hover:underline">
                  Chat 1-on-1 <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>

            {/* Logo 2: Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="snap-start shrink-0 w-[240px] sm:w-auto p-3.5 sm:p-4 rounded-2xl bg-white border border-[#DFECE2] hover:border-[#D54381] hover:shadow-md transition-all flex items-center gap-3.5 group shadow-2xs"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-sm text-[#233527]">Instagram</h3>
                  <span className="text-[9px] bg-[#FAF2F5] text-[#9E2A6C] px-1.5 py-0.5 rounded font-semibold">
                    Direct
                  </span>
                </div>
                <p className="text-[11px] text-[#697E6E] font-medium truncate mt-0.5">
                  @{config.instagramUsername.replace(/^@/, '')}
                </p>
                <span className="text-[10px] text-[#8E2861] font-semibold flex items-center gap-0.5 mt-1 group-hover:underline">
                  Send DM <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>

            {/* Logo 3: Telegram (NEW) */}
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="snap-start shrink-0 w-[240px] sm:w-auto p-3.5 sm:p-4 rounded-2xl bg-white border border-[#DFECE2] hover:border-[#229ED9] hover:shadow-md transition-all flex items-center gap-3.5 group shadow-2xs"
            >
              <div className="w-11 h-11 rounded-xl bg-[#229ED9] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Send className="w-5 h-5 -rotate-12 ml-0.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-sm text-[#233527]">Telegram</h3>
                  <span className="text-[9px] bg-[#EBF6FC] text-[#0E7CB5] px-1.5 py-0.5 rounded font-semibold">
                    Private
                  </span>
                </div>
                <p className="text-[11px] text-[#697E6E] font-medium truncate mt-0.5">
                  @{config.telegramUsername?.replace(/^@/, '') || 'friendlycounsel'}
                </p>
                <span className="text-[10px] text-[#0E7CB5] font-semibold flex items-center gap-0.5 mt-1 group-hover:underline">
                  Open Chat <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>

            {/* Logo 4: Email */}
            <a
              href={emailUrl}
              className="snap-start shrink-0 w-[240px] sm:w-auto p-3.5 sm:p-4 rounded-2xl bg-white border border-[#DFECE2] hover:border-[#1A73E8] hover:shadow-md transition-all flex items-center gap-3.5 group shadow-2xs"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1A73E8] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-sm text-[#233527]">Email</h3>
                  <span className="text-[9px] bg-[#EBF3FC] text-[#1A73E8] px-1.5 py-0.5 rounded font-semibold">
                    Inbox
                  </span>
                </div>
                <p className="text-[11px] text-[#697E6E] font-medium truncate mt-0.5">
                  {config.email}
                </p>
                <span className="text-[10px] text-[#1A73E8] font-semibold flex items-center gap-0.5 mt-1 group-hover:underline">
                  Compose <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 text-[11px] text-[#637C68] mt-1.5">
            <span>← Swipe channels left to right →</span>
          </div>
        </div>

        {/* Contact Enquiry Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#E0ECE2] shadow-xs">
          <div className="mb-5">
            <h3 className="text-lg sm:text-xl font-bold text-[#203223] mb-1">
              Leave a Message or Quick Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#536B58]">
              Fill out this quick form or forward directly to WhatsApp with 1 click.
            </p>
          </div>

          {/* Sensitive boundary note */}
          <div className="mb-5 p-3 bg-[#FAF7F0] border border-[#E5DECD] rounded-xl flex items-start gap-2.5 text-xs text-[#63553E]">
            <AlertCircle className="w-4 h-4 text-[#8C7449] shrink-0 mt-0.5" />
            <span>
              <strong>Safe Boundary Note:</strong> This service offers friendly emotional guidance and companion support, not psychiatric emergency care.
            </span>
          </div>

          {formSubmitted ? (
            <div className="text-center py-6 px-4 bg-[#F2F7F3] rounded-2xl border border-[#CCE0D1]">
              <div className="w-12 h-12 rounded-full bg-[#324D37] text-white flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-[#9FE2AB]" />
              </div>
              <h4 className="text-lg font-bold text-[#203223] mb-1.5">
                Thank You, {name}!
              </h4>
              <p className="text-xs sm:text-sm text-[#4E6753] max-w-md mx-auto mb-5">
                Your enquiry has been prepared. You can send it directly to WhatsApp right now:
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleSendViaWhatsAppFromForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2D4532] hover:bg-[#1E3023] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#9FE2AB]" />
                  <span>Send to WhatsApp Now</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-4 py-2 text-xs text-[#526D57] hover:underline"
                >
                  Submit Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#304533] uppercase mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5E2D7] bg-[#FAF8F5] text-sm text-[#253929] focus:outline-none focus:ring-2 focus:ring-[#527357] focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#304533] uppercase mb-1">
                  Your WhatsApp Number or Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                  placeholder="e.g. 0300 1234567 or email@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5E2D7] bg-[#FAF8F5] text-sm text-[#253929] focus:outline-none focus:ring-2 focus:ring-[#527357] focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#304533] uppercase mb-1">
                  I Am Interested In
                </label>
                <select
                  value={serviceInterest}
                  onChange={(e) => setServiceInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5E2D7] bg-[#FAF8F5] text-sm text-[#253929] focus:outline-none focus:ring-2 focus:ring-[#527357] focus:bg-white transition-all"
                >
                  <option value="Plan 1: Friendly Text Chat">Plan 1: Friendly Text Chat (1-to-1 Chat)</option>
                  <option value="Plan 2: Chat + Voice Messages">Plan 2: Chat + Voice Messages</option>
                  <option value="Plan 3: Full Care & Voice Calls">Plan 3: Full Care (Chats, Voice Notes & Calls)</option>
                  <option value="Share Stories / Sorrows / Life Events">Share Stories / Sorrows / Life Events</option>
                  <option value="Share Relationship Stories">Share Relationship Stories</option>
                  <option value="General Friendly Conversation">General Friendly Conversation</option>
                  <option value="Discuss Personal Problems">Discuss Personal Problems</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#304533] uppercase mb-1">
                  Brief Note (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Anything specific on your mind?"
                  rows={3}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5E2D7] bg-[#FAF8F5] text-sm text-[#253929] focus:outline-none focus:ring-2 focus:ring-[#527357] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2D4532] hover:bg-[#1E3023] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Submit & Prepare WhatsApp Forward
              </button>
            </form>
          )}
        </div>

        {/* Crisis Hotline Reassurance */}
        <div className="mt-8 text-center text-xs text-[#6F8674] max-w-xl mx-auto">
          <span>In urgent psychiatric emergencies in Pakistan, please call Umang Helpline (<strong>0311-7786264</strong>) or Rozan (<strong>0800-03000</strong>).</span>
        </div>

      </div>
    </section>
  );
};
