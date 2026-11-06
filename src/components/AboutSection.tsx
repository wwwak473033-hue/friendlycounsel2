import React from 'react';
import { Heart, Award, Clock, Instagram, MessageCircle } from 'lucide-react';
import { SiteConfig } from '../types';
import { buildWhatsAppUrl, buildInstagramUrl } from '../utils/config';

interface AboutSectionProps {
  config: SiteConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config }) => {
  const whatsappUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hi ${config.creatorName}! I read your About Me story and would love to connect for emotional support.`
  );
  const instagramUrl = buildInstagramUrl(config.instagramUsername);

  return (
    <section id="about" className="py-16 md:py-24 bg-[#FBF9F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-[#E0ECE2] p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Portrait Photo Column */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border-2 border-[#DCE8DE] shadow-md bg-[#EBF1EC] mb-5">
                <img
                  src={config.portraitImage || '/src/assets/images/counsellor_portrait_1793978423116.jpg'}
                  alt={`Portrait of ${config.creatorName}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <h3 className="text-xl font-bold text-[#233527]">{config.creatorName}</h3>
              <p className="text-xs sm:text-sm text-[#556F5A] mt-1 font-medium">
                {config.qualifications}
              </p>

              {/* Quick social pills */}
              <div className="flex items-center gap-2 mt-4">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#F2ECE3] text-[#554737] rounded-lg text-xs font-medium border border-[#E7DECE] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{config.instagramUsername}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EAF2EC] hover:bg-[#DCEAE0] text-[#2F4934] rounded-lg text-xs font-semibold border border-[#CCE0D1] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Story & Philosophy Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EEF5EF] rounded-full text-xs font-medium text-[#406144] mb-3">
                <Heart className="w-3.5 h-3.5" />
                <span>Your Friendly Listener & Companion</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2F23] tracking-tight mb-4">
                {config.bioHeadline}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#465C4B] leading-relaxed mb-6">
                <p>{config.bioStory}</p>
                <p>
                  Think of me as a trusted friend who is always in your corner. In our 7-day and 30-day packages,
                  we connect through daily friendly chats and 1-on-1 voice calls. Whether you need to discuss
                  family misunderstandings, navigate heartbreak, or simply need someone to listen when you feel
                  alone, I am here to listen with an open heart.
                </p>
              </div>

              {/* Transparent Credentials Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-[#EDF4EE]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF2EC] text-[#3E6144] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase text-[#6C8571] font-semibold">
                      Background & Credentials
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#293B2D]">
                      {config.qualifications}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F1E8] text-[#695637] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase text-[#7E7058] font-semibold">
                      Session Format
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#293B2D]">
                      {config.sessionDuration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
