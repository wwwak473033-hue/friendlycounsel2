import React, { useState } from 'react';
import { Check, MessageCircle, PhoneCall, Clock, Heart, Sparkles, UserCheck } from 'lucide-react';
import { SiteConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/config';

interface FeaturedPackageProps {
  config: SiteConfig;
}

export const FeaturedPackage: React.FC<FeaturedPackageProps> = ({ config }) => {
  const [activePlan, setActivePlan] = useState<'7day' | '30day'>('7day');

  const sevenDayIncludes = [
    'Daily friendly chat & texting support',
    'Daily 1-on-1 voice calls to discuss your day',
    'Attentive listening to your daily problems & worries',
    'Emotional guidance and self-improvement tips',
    'Helpful reflection exercises',
    'Encouragement to build healthy habits',
    'End-of-week review and next steps',
  ];

  const thirtyDayIncludes = [
    'Full 30 days of daily friendly texting support',
    'Daily 1-on-1 voice calls whenever you need to talk',
    'A caring personal friend who listens without judgment',
    'Long-term emotional healing & confidence building',
    'Comfort for loneliness, heartbreak & everyday life stress',
    'Consistent morning check-in & evening reflection routine',
    'End-of-month progress review & ongoing growth roadmap',
  ];

  const sevenDayBookingUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hi ${config.creatorName}! I want to book your 7-Day Friendly Support package (${config.sevenDayPrice}) with daily texting and daily voice calls. How can we get started?`
  );

  const thirtyDayBookingUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hi ${config.creatorName}! I would love to book your 30-Day Friendly Support package (${config.thirtyDayPrice}) with daily chatting, daily voice calls, and full emotional companionship.`
  );

  return (
    <section id="featured" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F0EA] text-[#2F4A33] rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#527357] text-[#527357]" />
            <span>Friendly Emotional Support & Daily Voice Calls</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2F23] tracking-tight mb-3">
            Let Me Be Your Friend & Guide
          </h2>
          <p className="text-sm sm:text-base text-[#4C6150] leading-relaxed">
            Specially created for those who feel alone, need someone to talk to, or want to discuss their daily problems. Choose between 7-day or 30-day friendly companionship.
          </p>

          {/* Interactive Plan Selector Switch */}
          <div className="mt-7 inline-flex items-center p-1 bg-[#E4EEE6] rounded-2xl border border-[#CCDCD0] shadow-2xs">
            <button
              type="button"
              onClick={() => setActivePlan('7day')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activePlan === '7day'
                  ? 'bg-[#2D4532] text-white shadow-xs'
                  : 'text-[#3E5543] hover:text-[#203423]'
              }`}
            >
              <span>7-Day Friendly Support</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePlan('30day')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activePlan === '30day'
                  ? 'bg-[#2D4532] text-white shadow-xs'
                  : 'text-[#3E5543] hover:text-[#203423]'
              }`}
            >
              <span>30-Day Full Companion</span>
              <span className="text-[10px] bg-[#9FE2AB] text-[#1E3322] px-1.5 py-0.2 rounded font-bold">
                Best
              </span>
            </button>
          </div>
        </div>

        {/* Highlighted Package Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#EAF2EC] via-[#F1F7F2] to-[#E3EFE6] border border-[#CADBCF] p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#2D4532] text-white rounded-full text-xs font-semibold tracking-wide uppercase mb-3 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#9FE2AB]" />
                <span>
                  {activePlan === '7day' ? '7-Day Friendly Package' : '30-Day Full Companion Program'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#1F2F23] tracking-tight mb-2">
                {activePlan === '7day' ? '7-Day Friendly Support' : '30-Day Friendly Support'}
              </h3>

              <p className="text-sm sm:text-base font-medium text-[#3F6144] mb-4">
                {activePlan === '7day'
                  ? 'Daily friendly chatting + daily voice calls to untangle your day.'
                  : 'Month-long deep emotional support so you never have to face life alone.'}
              </p>

              <p className="text-xs sm:text-sm text-[#465A49] leading-relaxed mb-6">
                I will be your friendly listener—talking with you every day, listening attentively to your personal problems, and guiding you toward emotional peace with patience.
              </p>

              {/* Price Tag with Voice Call & Chat highlighted */}
              <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#D3E1D7] max-w-md mb-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] uppercase text-[#667E6B] font-semibold block">
                      Program Investment
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#233527] tracking-tight">
                      {activePlan === '7day' ? config.sevenDayPrice : config.thirtyDayPrice}
                    </span>
                    <span className="text-xs text-[#5D7362] ml-1">
                      {activePlan === '7day' ? '/ full 7 days' : '/ full 30 days'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-[#324F37] bg-[#E8F1EA] px-2.5 py-1 rounded-lg inline-block">
                      Chats + Voice Calls
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={activePlan === '7day' ? sevenDayBookingUrl : thirtyDayBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#2D4532] hover:bg-[#1E3023] rounded-xl transition-all duration-150 shadow-md hover:shadow-lg active:scale-98"
                >
                  <MessageCircle className="w-5 h-5 text-[#9FE2AB]" />
                  <span>
                    {activePlan === '7day'
                      ? 'Book 7-Day Friendly Support'
                      : 'Book 30-Day Friendly Support'}
                  </span>
                </a>
              </div>

              {/* Reassurance note */}
              <div className="mt-5 flex items-start gap-2 text-xs text-[#566B59] max-w-lg">
                <Clock className="w-4 h-4 text-[#527357] shrink-0 mt-0.5" />
                <span>
                  <strong>Flexible Daily Schedule:</strong> We arrange a comfortable time each day for your voice call and stay connected via friendly texts.
                </span>
              </div>
            </div>

            {/* Right Column: Features Checklist */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#CCDCD0] shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#EEF4F0]">
                  <PhoneCall className="w-5 h-5 text-[#3F6144]" />
                  <h4 className="font-bold text-sm sm:text-base text-[#203123]">
                    {activePlan === '7day'
                      ? 'What is included in 7 Days:'
                      : 'What is included in 30 Days:'}
                  </h4>
                </div>

                <ul className="space-y-3">
                  {(activePlan === '7day' ? sevenDayIncludes : thirtyDayIncludes).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-4.5 h-4.5 rounded-full bg-[#E8F2EA] text-[#3E6143] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span className="text-xs sm:text-[13px] text-[#344838] font-medium leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-3.5 border-t border-[#EEF4F0] flex items-center justify-between text-[11px] text-[#5E7562]">
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-[#4E7053]" />
                    Friendly & Confidential
                  </span>
                  <span>Daily Texts + Voice Call</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
