import React, { useState, useRef } from 'react';
import { MessageCircle, PhoneCall, Mic, Check, X, Clock, Sparkles, ShieldCheck, ChevronLeft, ChevronRight, Heart, UserCheck, MessageSquareHeart, CreditCard, ArrowRight } from 'lucide-react';
import { SiteConfig } from '../types';
import { buildWhatsAppUrl, DEFAULT_PLAN_PRICES } from '../utils/config';

interface PlansSectionProps {
  config: SiteConfig;
  onSelectPlanForPayment?: (planData: {
    id: string;
    name: string;
    duration: string;
    durationLabel: string;
    amount: string;
  }) => void;
}

type DurationType = '2hours' | '1day' | '1week' | '1month';

interface PlanTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  hasChat: boolean;
  hasVoiceNotes: boolean;
  hasVoiceCalls: boolean;
  callNote?: string;
  prices: Record<DurationType, string>;
  isFeatured?: boolean;
}

export const PlansSection: React.FC<PlansSectionProps> = ({ config, onSelectPlanForPayment }) => {
  const [globalDuration, setGlobalDuration] = useState<DurationType>('1day');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const durationLabels: Record<DurationType, { label: string; badge: string; timeDesc: string }> = {
    '2hours': { label: '2 Hours', badge: 'Quick Relief', timeDesc: '2 hours continuous support' },
    '1day': { label: '1 Day (24h)', badge: 'Most Popular', timeDesc: 'Full 24 hours of daily connection' },
    '1week': { label: '1 Week (7 Days)', badge: 'Best Value', timeDesc: '7 days of daily companion support' },
    '1month': { label: '1 Month (30 Days)', badge: 'Deep Care', timeDesc: '30 days of ongoing guidance' },
  };

  const prices = config.planPrices || DEFAULT_PLAN_PRICES;

  // Short, compact, non-lengthy cards wired to dynamic config
  const plans: PlanTier[] = [
    {
      id: 'plan-1-chat',
      name: 'Plan 1: Friendly Text Chat',
      tagline: 'Quiet, private texting whenever you need to share your thoughts.',
      hasChat: true,
      hasVoiceNotes: false,
      hasVoiceCalls: false,
      prices: prices.chat,
    },
    {
      id: 'plan-2-notes',
      name: 'Plan 2: Chat + Voice Messages',
      badge: 'Most Popular',
      tagline: 'Send & receive audio voice notes without live call pressure.',
      isFeatured: true,
      hasChat: true,
      hasVoiceNotes: true,
      hasVoiceCalls: false,
      prices: prices.notes,
    },
    {
      id: 'plan-3-calls',
      name: 'Plan 3: Full Care & Voice Calls',
      badge: 'Complete Support',
      tagline: 'Direct 1-on-1 live voice calls, audio notes, and continuous chats.',
      hasChat: true,
      hasVoiceNotes: true,
      hasVoiceCalls: true,
      callNote: 'Includes live voice call session',
      prices: prices.calls,
    },
  ];

  // Further details separated below the plans
  const furtherDetails = [
    {
      emoji: '👂',
      title: 'I Will Truly Listen to You',
      desc: 'Patient, attentive active listening without rushing, cutting you off, or judging your feelings.',
    },
    {
      emoji: '💡',
      title: 'I Will Advise & Guide You',
      desc: 'Honest outside perspective, thoughtful life advice, and gentle encouragement whenever you ask for direction.',
    },
    {
      emoji: '🌸',
      title: 'A Safe Space to Vent & Cry',
      desc: 'Let it all out without fear. Share heartbreak, family friction, or secrets in 100% confidentiality.',
    },
    {
      emoji: '🫂',
      title: 'A Friend Who Checks In',
      desc: 'Warm daily check-ins so you always know someone is in your corner and you never feel alone.',
    },
    {
      emoji: '🎙️',
      title: 'Voice Notes for Easy Comfort',
      desc: 'Available in Plan 2 & 3 whenever typing feels too exhausting and you just want to hear a friendly voice.',
    },
    {
      emoji: '📞',
      title: 'Live 1-on-1 Voice Calls',
      desc: 'Included in Plan 3 so you can talk through your day in a real-time, comforting voice conversation.',
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="plans" className="py-14 md:py-20 bg-[#F5F2EB]/60 border-y border-[#E7E2DA]">
      {/* Anchor for previous links to #support */}
      <div id="support" className="-mt-14 pt-14 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#E8F0EA] border border-[#CCDCD0] rounded-full text-xs font-semibold text-[#29422F] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#527357]" />
            <span>Swipe & Select Duration</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2F23] tracking-tight mb-2 text-balance">
            Choose Your Friendly Support Plan
          </h2>
          <p className="text-sm text-[#4E6352] max-w-md mx-auto mb-6">
            Pick your time duration, then scroll left-to-right to select your plan.
          </p>

          {/* Time Duration Switcher (Pill Bar) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#E4EDE6] rounded-2xl border border-[#CCDCD0] shadow-2xs">
            {(Object.keys(durationLabels) as DurationType[]).map((durKey) => (
              <button
                key={durKey}
                type="button"
                onClick={() => setGlobalDuration(durKey)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  globalDuration === durKey
                    ? 'bg-[#2D4532] text-white shadow-xs'
                    : 'text-[#3E5543] hover:text-[#203423] hover:bg-white/60'
                }`}
              >
                <span>{durationLabels[durKey].label}</span>
              </button>
            ))}
          </div>

          {/* Current Selection & Scroll Hint */}
          <div className="flex items-center justify-between max-w-md mx-auto mt-4 px-2 text-xs text-[#627C67]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#476B4C]" />
              <strong>{durationLabels[globalDuration].timeDesc}</strong>
            </span>
            <span className="text-[11px] font-medium text-[#486D4E]">
              ← Swipe sideways to compare plans →
            </span>
          </div>
        </div>

        {/* Horizontal Left-to-Right Scrollable Compact Cards */}
        <div className="relative mb-12">
          {/* Arrow Left */}
          <button
            type="button"
            onClick={scrollLeft}
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-[#2D4532] border border-[#CCDCD0] shadow-md items-center justify-center hover:bg-[#EBF2EC] transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Arrow Right */}
          <button
            type="button"
            onClick={scrollRight}
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-[#2D4532] border border-[#CCDCD0] shadow-md items-center justify-center hover:bg-[#EBF2EC] transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Horizontal scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-5 pt-2 px-1 scroll-smooth horizontal-scroll -mx-4 sm:mx-0 px-4 sm:px-0"
          >
            {plans.map((plan) => {
              const currentPrice = plan.prices[globalDuration];
              const bookingMessage = `Hi ${config.creatorName}! I want to book: ${plan.name} for ${durationLabels[globalDuration].label} (${currentPrice}). Please let me know how we can start!`;
              const waBookingUrl = buildWhatsAppUrl(config.whatsappNumber, bookingMessage);

              return (
                <div
                  key={plan.id}
                  className={`w-[85vw] sm:w-[330px] md:w-[340px] snap-center shrink-0 bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md ${
                    plan.isFeatured
                      ? 'border-2 border-[#3F6345] ring-2 ring-[#4F7A56]/20'
                      : 'border-[#DFE8E1]'
                  }`}
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#637C67] bg-[#F2F6F3] px-2 py-0.5 rounded">
                        {plan.id === 'plan-1-chat' && '💬 Text Only'}
                        {plan.id === 'plan-2-notes' && '🎙️ Chat + Audio'}
                        {plan.id === 'plan-3-calls' && '📞 Chat + Voice Call'}
                      </span>
                      {plan.badge && (
                        <span className="px-2.5 py-0.5 bg-[#2D4532] text-white text-[10px] font-bold uppercase rounded-full tracking-wider shadow-2xs">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    {/* Plan Title & Tagline (compact) */}
                    <h3 className="text-base sm:text-lg font-bold text-[#1F2F23] mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[#556D59] leading-relaxed mb-4">
                      {plan.tagline}
                    </p>

                    {/* Price Block */}
                    <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E7EFE9] mb-4">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-[#738B77] block">
                            Price
                          </span>
                          <span className="text-2xl font-extrabold text-[#233527] tracking-tight">
                            {currentPrice}
                          </span>
                          <span className="text-xs text-[#637C67] ml-1">
                            / {durationLabels[globalDuration].label}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-[#37543C] bg-[#E8F2EA] px-2 py-0.5 rounded">
                          {durationLabels[globalDuration].badge}
                        </span>
                      </div>
                    </div>

                    {/* 3 Core Highlights (Non-lengthy, super clean) */}
                    <div className="space-y-2 py-1 mb-4 text-xs">
                      {/* Chat */}
                      <div className="flex items-center justify-between py-1 border-b border-[#F5F8F5]">
                        <span className="text-[#3A503D] font-medium flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5 text-[#4A7250]" />
                          1-to-1 Friendly Chats
                        </span>
                        <span className="text-[11px] font-bold text-[#2D4532] flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-[#3E6143] stroke-[3]" /> Included
                        </span>
                      </div>

                      {/* Voice Messages */}
                      <div className="flex items-center justify-between py-1 border-b border-[#F5F8F5]">
                        <span className="text-[#3A503D] font-medium flex items-center gap-1.5">
                          <Mic className="w-3.5 h-3.5 text-[#4A7250]" />
                          Voice Messages
                        </span>
                        {plan.hasVoiceNotes ? (
                          <span className="text-[11px] font-bold text-[#2D4532] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-[#3E6143] stroke-[3]" /> Included
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#A66161] flex items-center gap-1">
                            <X className="w-3.5 h-3.5 text-[#A66161] stroke-[3]" /> No Audio
                          </span>
                        )}
                      </div>

                      {/* Voice Calls */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-[#3A503D] font-medium flex items-center gap-1.5">
                          <PhoneCall className="w-3.5 h-3.5 text-[#4A7250]" />
                          Live Voice Calls
                        </span>
                        {plan.hasVoiceCalls ? (
                          <span className="text-[11px] font-bold text-[#2D4532] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-[#3E6143] stroke-[3]" /> Included
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#A66161] flex items-center gap-1">
                            <X className="w-3.5 h-3.5 text-[#A66161] stroke-[3]" /> No Calls
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Booking & Payment Actions */}
                  <div className="pt-3 border-t border-[#F0F5F1] space-y-2">
                    {onSelectPlanForPayment ? (
                      <button
                        type="button"
                        onClick={() =>
                          onSelectPlanForPayment({
                            id: plan.id,
                            name: plan.name,
                            duration: globalDuration,
                            durationLabel: durationLabels[globalDuration].label,
                            amount: currentPrice,
                          })
                        }
                        className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs active:scale-98 cursor-pointer ${
                          plan.isFeatured
                            ? 'bg-[#2D4532] hover:bg-[#1E3023] text-white shadow-sm'
                            : 'bg-[#1E3023] hover:bg-[#2D4532] text-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-[#A6F4C5]" />
                        <span>Pay via JazzCash / TID</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#A6F4C5]" />
                      </button>
                    ) : (
                      <a
                        href={waBookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs active:scale-98 cursor-pointer bg-[#2D4532] text-white"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Book for {durationLabels[globalDuration].label}</span>
                      </a>
                    )}

                    <a
                      href={waBookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-[11px] font-semibold text-[#48634F] hover:text-[#1F2F23] hover:bg-[#F2F7F3] rounded-lg transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Or chat on WhatsApp first</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SEPARATE PORTION ATTACHED BELOW PLANS: Further Details & Inclusions */}
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#DFE8E1] shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#EEF5EF] text-[#334E37] rounded-full text-xs font-semibold mb-2">
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#4A7250]" />
              <span>Full Clarity & Care</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1F2F23] tracking-tight">
              What You Always Receive as My Client
            </h3>
            <p className="text-xs sm:text-sm text-[#556E59] mt-1">
              No robotic replies or formal clinic atmosphere. Here is how I will be there for you across all plans:
            </p>
          </div>

          {/* 6 Clarifying Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {furtherDetails.map((detail, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-[#E7EFE9] flex items-start gap-3.5 hover:border-[#CCDCD0] transition-colors"
              >
                <span className="text-2xl shrink-0 p-2 bg-white rounded-xl border border-[#DFECE1] shadow-2xs">
                  {detail.emoji}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#203423] mb-1">
                    {detail.title}
                  </h4>
                  <p className="text-xs text-[#526955] leading-relaxed">
                    {detail.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Reassurance Footer Strip */}
          <div className="mt-8 pt-5 border-t border-[#EEF4F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526B57]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4A7250] shrink-0" />
              <span>
                <strong>100% Confidential:</strong> Everything we discuss in chat or calls is completely private.
              </span>
            </div>
            <a
              href="#contact"
              className="text-[#2D4532] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Have a question first? Contact Me</span>
              <span>→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
