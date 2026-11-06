import React from 'react';
import { ArrowRight, MessageCircle, Heart } from 'lucide-react';
import { SiteConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/config';

interface ServicesSectionProps {
  config: SiteConfig;
}

interface ConversationOption {
  id: string;
  emoji: string;
  title: string;
  description: string;
  accentBg: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ config }) => {
  const conversationOptions: ConversationOption[] = [
    {
      id: 'heartbroken',
      emoji: '💔',
      title: 'For Someone Heartbroken',
      description:
        'Going through a painful breakup, missing someone, or feeling rejected? We can talk through the hurt at your pace.',
      accentBg: 'bg-[#FDF2F0]',
    },
    {
      id: 'need-to-talk',
      emoji: '🫂',
      title: 'Need Someone to Talk To',
      description:
        "When you feel lonely, misunderstood, or just wish you had someone genuinely there for you.",
      accentBg: 'bg-[#EFF5F0]',
    },
    {
      id: 'discuss-life-problems',
      emoji: '🌧️',
      title: 'Want to Discuss Life Problems',
      description:
        "Family tension, daily routine struggles, or career stress. Let's talk about what's going on and unburden your mind.",
      accentBg: 'bg-[#F4EFF5]',
    },
    {
      id: 'friendly-advice',
      emoji: '💡',
      title: 'Need Friendly Advice',
      description:
        "When you're stuck between choices or confused about a situation, get a thoughtful, unbiased outside perspective.",
      accentBg: 'bg-[#FAF4ED]',
    },
    {
      id: 'honest-review',
      emoji: '🪞',
      title: 'Need an Honest Review About Yourself',
      description:
        "A safe, sincere mirror. Share what you're dealing with and receive honest, compassionate thoughts about yourself.",
      accentBg: 'bg-[#EEF4F5]',
    },
    {
      id: 'overthinking-lonely',
      emoji: '💭',
      title: 'Overthinking & Feeling Alone',
      description:
        'Too many thoughts keeping you up? Let’s untangle your thoughts together so your mind feels light again.',
      accentBg: 'bg-[#F7F5EA]',
    },
    {
      id: 'share-something',
      emoji: '🗝️',
      title: 'Want to Share Something in Private',
      description:
        'Got something on your chest you can’t tell people in your everyday life? Share it freely in 100% privacy and trust.',
      accentBg: 'bg-[#EBF3EC]',
    },
    {
      id: 'friendly-chat',
      emoji: '☕',
      title: 'Just Want a Friendly Daily Chat',
      description:
        'No heavy problems needed. Just a warm, casual conversation to brighten your day and stay connected.',
      accentBg: 'bg-[#F8F2EB]',
    },
  ];

  const conversationWhatsAppUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hi ${config.creatorName}! (Let me be your friend). I saw your website and would really like to have a friendly conversation with you.`
  );

  return (
    <section id="support" className="py-14 md:py-20 bg-[#F5F2EB]/60 border-y border-[#E7E2DA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Adjusted Short Subheading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#E8F0EA] border border-[#D3E2D6] rounded-full text-xs font-semibold text-[#2D4532] mb-3 shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-[#527357] text-[#527357]" />
            <span>Sometimes You Don't Need Advice. You Just Need Someone Who Listens.</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2F23] tracking-tight mb-2.5 text-balance">
            A Friend to Talk to. A Space to Be Yourself.
          </h2>

          <p className="text-sm sm:text-base text-[#4E6352] leading-relaxed max-w-lg mx-auto">
            Choose what kind of conversation you need today. No clinical forms—just an honest, friendly chat.
          </p>
        </div>

        {/* 8 Conversation Options Grid (Mobile-First) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {conversationOptions.map((option) => {
            const prefilledMessage = `Hi ${config.creatorName}! I visited your website and chose: "${option.title}". Could we have a friendly conversation?`;
            const waUrl = buildWhatsAppUrl(config.whatsappNumber, prefilledMessage);

            return (
              <a
                key={option.id}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-5 sm:p-6 border border-[#DFE8E1] shadow-xs hover:shadow-md hover:border-[#CCDCD0] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer text-left active:scale-98"
              >
                <div>
                  {/* Option Emoji Box */}
                  <div
                    className={`w-11 h-11 rounded-xl ${option.accentBg} flex items-center justify-center text-xl mb-3.5 group-hover:scale-105 transition-transform duration-200`}
                    aria-hidden="true"
                  >
                    <span>{option.emoji}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#233527] mb-1.5 group-hover:text-[#3B5B41] transition-colors leading-snug">
                    {option.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs text-[#506655] leading-relaxed mb-4">
                    {option.description}
                  </p>
                </div>

                {/* Friendly Tap CTA */}
                <div className="pt-3 border-t border-[#F2F6F3] flex items-center justify-between text-xs font-semibold text-[#3C6142] group-hover:text-[#1F3A24]">
                  <span>Start This Chat</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Message Below Conversation Options */}
        <div className="mt-10 sm:mt-12 max-w-2xl mx-auto text-center bg-white/95 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-[#DFE8E1] shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#527357] mb-1.5">
            Zero Pressure · 100% Confidential
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-[#1F2F23] mb-1.5 text-balance">
            "Whatever you're going through, you don't have to explain it perfectly. Just start talking."
          </h3>
          <p className="text-xs sm:text-sm text-[#506454] mb-5 max-w-md mx-auto">
            You don't have to pretend you're okay here. You can just be yourself.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={conversationWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#2D4532] hover:bg-[#1E3023] rounded-xl transition-all shadow-xs active:scale-98"
            >
              <MessageCircle className="w-4 h-4 text-[#9FE2AB]" />
              <span>(Let Me Be Your Friend) Send Message</span>
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-[#3E5543] bg-[#EBF1EC] hover:bg-[#E0ECE2] rounded-xl transition-colors"
            >
              <span>Other Ways to Connect</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
