import React, { useState } from 'react';
import { MessageCircle, ShieldCheck, Heart, Sparkles, ArrowRight, Lock, Check } from 'lucide-react';
import { SiteConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/config';

interface HeroProps {
  config: SiteConfig;
}

export const Hero: React.FC<HeroProps> = ({ config }) => {
  const [selectedTopic, setSelectedTopic] = useState('🫂 Need someone to talk to');

  // Point-by-point list requested by user, including stories/sorrows and relationship stories
  const supportPoints = [
    {
      id: 'share-stories',
      emoji: '📖',
      title: 'Share your stories / sorrows / life events',
      desc: 'Vent freely about past events, regrets, or personal grief',
      prefill: 'Hi! I want to share my story / sorrows / life events with you and need someone who truly listens.',
    },
    {
      id: 'relationship-stories',
      emoji: '🥀',
      title: 'Your relationship stories & heartbreak',
      desc: 'Breakups, one-sided love, family complications, or trust issues',
      prefill: 'Hi! I want to talk about my relationship story and get your honest, caring thoughts.',
    },
    {
      id: 'heartbroken',
      emoji: '💔',
      title: 'For someone heartbroken & grieving',
      desc: 'Going through rejection, missing someone, or deep hurt',
      prefill: 'Hi! I am going through heartbreak and really need someone friendly to talk to.',
    },
    {
      id: 'need-to-talk',
      emoji: '🫂',
      title: 'Need someone to talk to right now',
      desc: 'Feeling lonely, unheard, or isolated today',
      prefill: 'Hi! I feel alone and just need a friendly person to talk to right now.',
    },
    {
      id: 'life-problems',
      emoji: '🌧️',
      title: 'Want to discuss life problems & stress',
      desc: 'Everyday anxiety, career uncertainty, and heavy thoughts',
      prefill: 'Hi! I want to discuss some personal life problems and stress with you.',
    },
    {
      id: 'friendly-advice',
      emoji: '💡',
      title: 'Need friendly advice & outside guidance',
      desc: 'Stuck in a dilemma and need a neutral, caring perspective',
      prefill: 'Hi! I am stuck with a decision and need your friendly advice and perspective.',
    },
    {
      id: 'honest-review',
      emoji: '🪞',
      title: 'Need an honest review about yourself',
      desc: 'Unbiased feedback on your situation, decisions, and mindset',
      prefill: 'Hi! I want an honest, non-judgmental review about my situation and myself.',
    },
    {
      id: 'friendly-chat',
      emoji: '☕',
      title: 'Just need a friendly daily chat',
      desc: 'Warm, low-pressure conversation to brighten your day',
      prefill: 'Hi! I just want a friendly daily chat and someone who listens.',
    },
  ];

  const primaryFriendUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hi ${config.creatorName}! (Let me be your friend). I saw your website and would love to start friendly chatting and emotional support.`
  );

  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-18 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F5F1E9] to-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Photo Portion: Welcoming Counsellor & Space Showcase */}
        <div className="max-w-lg mx-auto mb-6 flex items-center justify-center gap-3.5 bg-white/70 backdrop-blur-xs p-2.5 sm:p-3 rounded-3xl border border-[#DFE8E1] shadow-2xs">
          <div className="relative group shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#48734E] shadow-md bg-[#EBF1EC]">
              <img
                src={config.portraitImage || '/src/assets/images/counsellor_portrait_1793978423116.jpg'}
                alt={config.creatorName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-[#2D4532] text-[#A6F4C5] text-[9px] font-bold rounded-full border border-white flex items-center gap-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4EDB6A] animate-pulse"></span>
              Online
            </span>
          </div>

          <div className="hidden sm:block w-24 h-16 sm:h-20 rounded-2xl overflow-hidden border border-[#D5E1D7] shadow-xs bg-[#EBF1EC] shrink-0">
            <img
              src={config.heroImage || '/src/assets/images/counselling_space_hero_1793978423999.jpg'}
              alt="Safe counselling space"
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          <div className="text-left min-w-0 pr-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#E8F0EA] border border-[#CCDCD0] rounded-full text-[11px] font-semibold text-[#29422F] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#48734E]"></span>
              <span>1-on-1 Emotional Guide</span>
            </div>
            <p className="text-xs text-[#526B57] font-medium leading-snug">
              Talk directly with {config.creatorName} in a warm, welcoming space.
            </p>
          </div>
        </div>

        {/* Top Centered Header & Adjusted Short Subheading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2A1E] tracking-tight leading-[1.18] mb-3 text-balance">
            {config.heroHeadline || 'All You Need Is a Friend, Not a Therapist.'}
          </h1>

          {/* Adjusted Short Subheading */}
          <p className="text-base sm:text-lg font-medium text-[#4A644E] mb-6">
            {config.heroSubheadline || 'Connect with me for personal emotional support and guidance.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <a
                href={primaryFriendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#2D4532] hover:bg-[#1E3023] rounded-xl transition-all duration-150 shadow-md hover:shadow-lg active:scale-98"
              >
                <MessageCircle className="w-5 h-5 text-[#9FE2AB]" />
                <span>(Let Me Be Your Friend) Send Message</span>
              </a>

              <a
                href="#plans"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-medium text-[#2E4333] bg-[#EAF1EB] hover:bg-[#DFEBE1] border border-[#CCDCD0] rounded-xl transition-colors"
              >
                <span>View Plans & Pricing</span>
              </a>
            </div>

            {/* View Demo Button below View Plans & Pricing */}
            <div className="flex justify-center w-full">
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-[#1E3023] bg-white hover:bg-[#F0F6F1] border-2 border-[#9EC4A5] rounded-xl transition-all shadow-2xs hover:shadow active:scale-98 group"
              >
                <Sparkles className="w-4 h-4 text-[#356B3F] group-hover:scale-110 transition-transform" />
                <span>View Demo (Live WhatsApp Chat Preview)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#356B3F] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Clean trust reassurance */}
          <div className="flex items-center justify-center gap-3 text-xs text-[#526956] mt-5">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#476B4C]" />
              100% Private
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-[#476B4C]" />
              Friendly & Non-judgmental
            </span>
            <span>·</span>
            <span>Daily Chats & Voice Calls</span>
          </div>
        </div>

        {/* Clear Point-by-Point Menu: Highly Optimized for Mobile & Desktop */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-5 sm:p-8 border border-[#DFE8E1] shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F0F5F1]">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1F2F23]">
                Tap What You Need Right Now:
              </h2>
              <p className="text-xs text-[#5D7362]">
                Choose from the menu below to start a direct, friendly 1-on-1 chat on WhatsApp.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-[#3E5F44] bg-[#EAF2EC] px-3 py-1 rounded-full">
              <Lock className="w-3 h-3 text-[#4A7250]" />
              <span>Direct WhatsApp</span>
            </div>
          </div>

          {/* List in points and clear manner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {supportPoints.map((point) => {
              const pointUrl = buildWhatsAppUrl(config.whatsappNumber, point.prefill);
              const isSelected = selectedTopic === point.title;

              return (
                <a
                  key={point.id}
                  href={pointUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedTopic(point.title)}
                  className={`group p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-left active:scale-98 ${
                    isSelected
                      ? 'bg-[#F2F7F3] border-[#3E6144] shadow-xs'
                      : 'bg-[#FAF8F5] hover:bg-[#F2F7F3] border-[#E5EFE7] hover:border-[#CCDCD0]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0 p-2 bg-white rounded-xl border border-[#E7EFE9] shadow-2xs group-hover:scale-105 transition-transform">
                      {point.emoji}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#233527] group-hover:text-[#37543C] truncate">
                        {point.title}
                      </h3>
                      <p className="text-xs text-[#5C7260] line-clamp-1 mt-0.5">
                        {point.desc}
                      </p>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-white group-hover:bg-[#2D4532] text-[#2D4532] group-hover:text-white flex items-center justify-center shrink-0 border border-[#D5E2D7] transition-colors shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Quick Mobile Tip */}
          <div className="mt-4 pt-3 border-t border-[#F2F6F3] flex items-center justify-between text-[11px] text-[#69806D]">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#48734E]" />
              No clinical forms required
            </span>
            <span className="text-right">
              Just click any point to chat freely
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
