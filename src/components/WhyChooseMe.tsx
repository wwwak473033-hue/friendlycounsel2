import React from 'react';
import { Heart, MessageCircle, CheckCircle2 } from 'lucide-react';
import { SiteConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/config';

interface WhyChooseMeProps {
  config: SiteConfig;
}

export const WhyChooseMe: React.FC<WhyChooseMeProps> = ({ config }) => {
  const reasons = [
    {
      problem: 'No one has the time or patience to truly listen to you?',
      promise: 'I will listen.',
      icon: '👂',
      accentBg: 'bg-[#EFF5F0]',
    },
    {
      problem: 'Don’t have a true friend you can openly talk with?',
      promise: 'Let me be that friend.',
      icon: '🫂',
      accentBg: 'bg-[#FDF2F0]',
    },
    {
      problem: 'No one to give you sincere, honest advice?',
      promise: 'Let me help you think it through.',
      icon: '💡',
      accentBg: 'bg-[#FAF4ED]',
    },
    {
      problem: 'Afraid people will judge you or leak your secrets?',
      promise: '100% confidential & zero judgment.',
      icon: '🔒',
      accentBg: 'bg-[#EEF4F5]',
    },
    {
      problem: 'Tired of cold clinical therapy and medical paperwork?',
      promise: 'Real human connection.',
      icon: '☕',
      accentBg: 'bg-[#F7F5EA]',
    },
    {
      problem: 'Feeling lonely and carrying heavy emotions alone?',
      promise: 'You don’t have to do it alone anymore.',
      icon: '🌸',
      accentBg: 'bg-[#EBF3EC]',
    },
  ];

  const friendWhatsAppUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hi ${config.creatorName}! (Let me be your friend). I saw your "Why Choose Me" section and would really love to talk with you.`
  );

  return (
    <section id="why-choose-me" className="py-14 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#E8F0EA] border border-[#CCDCD0] rounded-full text-xs font-semibold text-[#29422F] mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#48734E] text-[#48734E]" />
            <span>Why Connect With Me</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B2A1E] tracking-tight mb-2.5 text-balance">
            Why I Am Here For You
          </h2>
          <p className="text-sm sm:text-base text-[#4E6352] max-w-lg mx-auto">
            You don’t need a hospital or clinical evaluation. You just need someone genuine who has your back.
          </p>
        </div>

        {/* 6 Problem-Promise Grid Cards - Compact, Punchy, Zero Fluff */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DFE8E1] shadow-2xs hover:shadow-sm hover:border-[#CCDCD0] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Icon & Problem question */}
                <div className="flex items-center gap-3 mb-2.5">
                  <span className={`w-10 h-10 rounded-xl ${item.accentBg} flex items-center justify-center text-lg shrink-0`}>
                    {item.icon}
                  </span>
                  <p className="text-xs font-semibold text-[#6E8873] leading-snug">
                    {item.problem}
                  </p>
                </div>

                {/* Promise headline */}
                <h3 className="text-base sm:text-lg font-bold text-[#1F3323] tracking-tight">
                  {item.promise}
                </h3>
              </div>

              {/* Bottom tick tag */}
              <div className="mt-3.5 pt-2.5 border-t border-[#F2F6F3] flex items-center gap-1.5 text-xs font-semibold text-[#3D6343]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#48734E]" />
                <span>My personal commitment to you</span>
              </div>
            </div>
          ))}
        </div>

        {/* Warm Personal Banner Below */}
        <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-br from-[#EAF2EC] via-[#F1F7F2] to-[#E3EFE6] rounded-3xl p-7 sm:p-10 border border-[#CCDCD0] shadow-xs text-center">
          <span className="text-2xl mb-2 inline-block">🌿</span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1F2F23] mb-2 text-balance">
            "You don’t have to suffer in silence or keep it bottled up."
          </h3>
          <p className="text-xs sm:text-sm text-[#465E4B] max-w-md mx-auto mb-6">
            Whenever you feel alone, misunderstood, or need friendly advice, send me a message. I am right here.
          </p>

          <a
            href={friendWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#2D4532] hover:bg-[#1E3023] rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98"
          >
            <MessageCircle className="w-5 h-5 text-[#9FE2AB]" />
            <span>(Let Me Be Your Friend) Send Message</span>
          </a>
        </div>

      </div>
    </section>
  );
};
