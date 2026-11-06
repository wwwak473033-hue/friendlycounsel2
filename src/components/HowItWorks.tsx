import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  CheckCheck,
  Play,
  Pause,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { SiteConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/config';

interface HowItWorksProps {
  config: SiteConfig;
}

interface ChatScenario {
  id: string;
  tabTitle: string;
  emoji: string;
  language: 'English' | 'Roman Urdu';
  clientTime: string;
  clientMessage: string;
  counsellorTime: string;
  counsellorMessage: string;
  hasVoiceNote?: boolean;
  voiceNoteDuration?: string;
  clientReplyTime: string;
  clientReply: string;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ config }) => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // 8 scenarios alternating between English and Roman Urdu / English-Urdu
  const scenarios: ChatScenario[] = [
    {
      id: 'heartbreak-en',
      tabTitle: 'Heartbreak & Grief',
      emoji: '💔',
      language: 'English',
      clientTime: '11:42 PM',
      clientMessage:
        "I can’t stop crying tonight. Everyone keeps telling me to 'just move on', but it hurts so deeply and I feel like an idiot for still caring after everything...",
      counsellorTime: '11:43 PM',
      counsellorMessage:
        "Please never call yourself an idiot for having a caring heart. Heartbreak is real grief, and healing does not follow anyone else's timeline. 🌿 You don't have to 'just move on' tonight. I am right here with you. What hurts the most right now?",
      hasVoiceNote: true,
      voiceNoteDuration: '0:38',
      clientReplyTime: '11:45 PM',
      clientReply:
        "Thank you so much for not lecturing me... Hearing your voice note made me take a full deep breath for the first time all day.",
    },
    {
      id: 'tum-kese-ho-ur',
      tabTitle: 'Tum Kese Ho & Akelapan',
      emoji: '🫂',
      language: 'Roman Urdu',
      clientTime: '10:15 PM',
      clientMessage:
        "Tum kese ho? Aaj bohot zyada akelapan aur udaasi mehsoos ho rahi hai... Sab k hotay huway bhi lagta hai koi sunne ya samajhne wala nahi hai.",
      counsellorTime: '10:16 PM',
      counsellorMessage:
        "Main theek hoon, aur tumhari baat sunne k liye bilkul yahan mojood hoon. 🌿 Bheed mein akele hona sab se mushkil ehsaas hota hai. Baghair kisi jhijhak k batao, dil par kya bojh hai? Main koi judgment nahi karunga.",
      hasVoiceNote: true,
      voiceNoteDuration: '0:45',
      clientReplyTime: '10:18 PM',
      clientReply:
        "Yeh sun kar hi dil halka ho gaya... Sach mein koi aisa chahiye tha jo bina lecture diye meri baat sune.",
    },
    {
      id: 'overthinking-en',
      tabTitle: 'Overthinking & Stress',
      emoji: '💭',
      language: 'English',
      clientTime: '2:15 AM',
      clientMessage:
        "It's 2am and my brain won't shut down. Career pressure, fear of failing family expectations... I feel like I'm falling behind everyone in life.",
      counsellorTime: '2:16 AM',
      counsellorMessage:
        "When late-night thoughts spiral, every worry feels twice as heavy. You are not behind; you're just overwhelmed right now. Let's slow down together. Tell me the one worry troubling you the most right now, and we'll untangle it step by step.",
      hasVoiceNote: false,
      clientReplyTime: '2:18 AM',
      clientReply:
        "Breaking it down like that already makes it less scary. Here is what happened with work today...",
    },
    {
      id: 'relationship-story-ur',
      tabTitle: 'Relationship Ki Story',
      emoji: '🥀',
      language: 'Roman Urdu',
      clientTime: '7:40 PM',
      clientMessage:
        "Meri relationship mein bohot confusion chal rahi hai. Aik taraf attachment hai aur doosri taraf daily ka mental stress. Samajh nahi aa raha break up karu ya wait karu...",
      counsellorTime: '7:42 PM',
      counsellorMessage:
        "Yeh dilemma dil aur dimaag dono ko thaka deta hai. Tum akelay nahi ho jo is mod par stuck ho. Mujhay shuru se clear batao k kya baatein tumhe sab se zyada hurt kar rahi hain? Mil kar faisla sochtay hain.",
      hasVoiceNote: true,
      voiceNoteDuration: '0:40',
      clientReplyTime: '7:44 PM',
      clientReply:
        "Aapki baat sun kar clarity milna shuru hui hai. Main poori story batata hoon shuru se...",
    },
    {
      id: 'lonely-invisible-en',
      tabTitle: 'Feeling Invisible',
      emoji: '🌧️',
      language: 'English',
      clientTime: '6:30 PM',
      clientMessage:
        "I am surrounded by people every day at university/office, but no one actually knows me. Nobody asks how I am truly doing. I just feel invisible.",
      counsellorTime: '6:31 PM',
      counsellorMessage:
        "I hear you, and that quiet loneliness is one of the heaviest things to carry. But you reached out today, and that took genuine courage. You are seen here, and your feelings matter. Let me be your friend. How was your day, honestly?",
      hasVoiceNote: true,
      voiceNoteDuration: '0:35',
      clientReplyTime: '6:34 PM',
      clientReply:
        "That honestly made me tear up in relief. It feels so good to have someone who genuinely cares to ask.",
    },
    {
      id: 'family-pressure-ur',
      tabTitle: 'Family Pressure & Tension',
      emoji: '🏠',
      language: 'Roman Urdu',
      clientTime: '9:20 PM',
      clientMessage:
        "Ghar walon ka pressure bohot zyada barh gaya hai shaadi aur career k decisions ko le kar. Lagta hai meri apni koi khushi ya raye hai hi nahi...",
      counsellorTime: '9:22 PM',
      counsellorMessage:
        "Hamary culture mein family expectations bohot overwhelming ho sakti hain. Lekin tumhari apni zindagi aur mental peace bhi utni hi ahem hai. Apni feelings ko dabao mat. Aao mil kar dekhte hain k boundary kaisay set ki jaye.",
      hasVoiceNote: false,
      clientReplyTime: '9:25 PM',
      clientReply:
        "Mujhay laga tha sab ghar walon ki hi side lenge... Shukriya meri side samajhne ka.",
    },
    {
      id: 'honest-review-en',
      tabTitle: 'Need Honest Review',
      emoji: '🪞',
      language: 'English',
      clientTime: '4:10 PM',
      clientMessage:
        "I need an honest review about a personal situation. Friends sugarcoat things or gossip behind my back. Can I get your unbiased, neutral review?",
      counsellorTime: '4:12 PM',
      counsellorMessage:
        "100%. You will get zero gossip, zero sugarcoating, and zero judgment from me. Lay out the situation completely—what you did, what they did, and what your gut is telling you. We will look at it with a calm, honest perspective.",
      hasVoiceNote: false,
      clientReplyTime: '4:14 PM',
      clientReply:
        "That is exactly what I wanted. Real, sincere honesty without judgment. Here is the full story...",
    },
    {
      id: 'friendly-guiding-ur',
      tabTitle: 'Daily Vent & Guiding',
      emoji: '☕',
      language: 'Roman Urdu',
      clientTime: '5:50 PM',
      clientMessage:
        "Bas thora vent karna tha dil halka karne k liye. Koi aisa dost nahi milta jise bolte waqt sochna na parhe. Aap se baat kar k hamesha sukoon milta hai.",
      counsellorTime: '5:52 PM',
      counsellorMessage:
        "Hamesha welcome ho! Dil ka bojh nikalna bohot zaroori hota hai. Jo bhi chal raha hai dil mein, be-fikar ho kar likho ya audio bhejo. Main pure dhyan se sun raha hoon.",
      hasVoiceNote: true,
      voiceNoteDuration: '0:32',
      clientReplyTime: '5:54 PM',
      clientReply:
        "Sach mein bohot shukriya. Har choti baat par itni respect aur sukoon se sunne k liye...",
    },
  ];

  // Scroll to a specific scenario card
  const scrollToScenario = (index: number) => {
    setActiveScenarioIndex(index);
    setPlayingAudioIndex(null);

    const container = scrollContainerRef.current;
    if (container) {
      const card = container.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    // Also auto-scroll top tabs into view
    const tabsContainer = tabsContainerRef.current;
    if (tabsContainer) {
      const tabButton = tabsContainer.children[index] as HTMLElement;
      if (tabButton) {
        tabButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  // Sync scroll position from user scrolling the chat carousel
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0]?.clientWidth || 320;
    const newIndex = Math.round(scrollLeft / cardWidth);

    if (newIndex >= 0 && newIndex < scenarios.length && newIndex !== activeScenarioIndex) {
      setActiveScenarioIndex(newIndex);

      // Auto-scroll the top heading pills to match
      const tabsContainer = tabsContainerRef.current;
      if (tabsContainer) {
        const tabButton = tabsContainer.children[newIndex] as HTMLElement;
        if (tabButton) {
          tabButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }
  };

  const handlePrev = () => {
    if (activeScenarioIndex > 0) {
      scrollToScenario(activeScenarioIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeScenarioIndex < scenarios.length - 1) {
      scrollToScenario(activeScenarioIndex + 1);
    }
  };

  const currentScenario = scenarios[activeScenarioIndex] || scenarios[0];
  const waStartUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hi ${config.creatorName}! (Let me be your friend). I saw your demo conversations on your website and would love to start our chat.`
  );

  return (
    <section id="how-it-works" className="py-14 md:py-20 bg-[#F4F1EA] border-y border-[#DEE5DF]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F0EA] border border-[#CCDCD0] rounded-full text-xs font-semibold text-[#29422F] mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#527357]" />
            <span>Interactive Chat Demo</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B2A1E] tracking-tight mb-2 text-balance">
            See How Our Conversations Work
          </h2>
          <p className="text-xs sm:text-sm text-[#4E6352] max-w-lg mx-auto">
            Swipe left and right to preview real conversations in English and Roman Urdu. Experience our warm, respectful WhatsApp chat atmosphere.
          </p>

          {/* Top Synchronized Category Headings (Auto-scrolls as user scrolls chats) */}
          <div
            ref={tabsContainerRef}
            className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
          >
            {scenarios.map((scen, idx) => {
              const isActive = idx === activeScenarioIndex;
              return (
                <button
                  key={scen.id}
                  type="button"
                  onClick={() => scrollToScenario(idx)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                    isActive
                      ? 'bg-[#2D4532] text-white ring-2 ring-[#48734E] shadow-xs'
                      : 'bg-white text-[#455A49] hover:bg-[#EBF1EC] border border-[#D5E1D7]'
                  }`}
                >
                  <span>{scen.emoji}</span>
                  <span>{scen.tabTitle}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      scen.language === 'Roman Urdu'
                        ? isActive
                          ? 'bg-[#436A49] text-[#A6F4C5]'
                          : 'bg-[#EFF6F0] text-[#2D5A35]'
                        : isActive
                        ? 'bg-[#3A563E] text-[#D5E3D8]'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {scen.language}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Slider Controls + Chat Screen Container */}
        <div className="relative max-w-5xl mx-auto px-2 sm:px-6">
          
          {/* Previous Arrow Button (Desktop & Tablet) */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeScenarioIndex === 0}
            className={`hidden sm:flex absolute -left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-[#2D4532] border border-[#CCDCD0] shadow-md items-center justify-center transition-all ${
              activeScenarioIndex === 0
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-[#2D4532] hover:text-white cursor-pointer hover:scale-105'
            }`}
            aria-label="Previous Conversation"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Arrow Button (Desktop & Tablet) */}
          <button
            type="button"
            onClick={handleNext}
            disabled={activeScenarioIndex === scenarios.length - 1}
            className={`hidden sm:flex absolute -right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-[#2D4532] border border-[#CCDCD0] shadow-md items-center justify-center transition-all ${
              activeScenarioIndex === scenarios.length - 1
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-[#2D4532] hover:text-white cursor-pointer hover:scale-105'
            }`}
            aria-label="Next Conversation"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable Container:
              - Mobile: 1 screen at a time
              - Desktop (md+): 2 screens side-by-side with clear slide margin
          */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-2 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
          >
            {scenarios.map((scen, idx) => (
              <div
                key={scen.id}
                className="snap-center shrink-0 w-[88vw] sm:w-[calc(50%-12px)] max-w-[420px] rounded-3xl overflow-hidden shadow-xl border-2 border-[#128C7E]/40 flex flex-col bg-[#EFEAE2] transition-all"
              >
                {/* Authentic WhatsApp Green Top Header */}
                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shrink-0 shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={config.portraitImage || '/src/assets/images/counsellor_portrait_1793978423116.jpg'}
                        alt={config.creatorName}
                        className="w-9 h-9 rounded-full object-cover border border-[#25D366]"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border border-[#075E54] rounded-full"></span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs sm:text-sm truncate leading-tight">
                          {config.creatorName}
                        </h4>
                        <span className="text-[9px] bg-[#128C7E] text-white px-1.5 py-0.2 rounded font-semibold uppercase shrink-0">
                          {scen.language}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#A7DFC0] leading-tight flex items-center gap-1 mt-0.5">
                        <span>online · friendly counsel</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-[#C4EAD3] bg-[#054C44] px-2 py-0.5 rounded-full border border-[#0B6C60] shrink-0">
                    <ShieldCheck className="w-3 h-3 text-[#25D366]" />
                    <span>Encrypted</span>
                  </div>
                </div>

                {/* WhatsApp Chat Wallpaper Body (Distinct from Web UI) */}
                <div className="p-3 sm:p-4 space-y-3 flex-1 overflow-y-auto min-h-[310px] max-h-[340px] bg-[#EFEAE2] bg-[radial-gradient(#D6CEBF_1px,transparent_1px)] [background-size:16px_16px]">
                  
                  {/* Category Pill Marker */}
                  <div className="text-center">
                    <span className="text-[9px] font-semibold text-[#54656F] bg-[#FFFFFF]/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-2xs border border-[#D5CEBF]">
                      {scen.emoji} {scen.tabTitle}
                    </span>
                  </div>

                  {/* 1. Client Message Bubble (WhatsApp Soft Light Green, Right) */}
                  <div className="flex justify-end">
                    <div className="max-w-[88%] bg-[#D9FDD3] text-[#111B21] rounded-2xl rounded-tr-xs p-3 shadow-xs text-xs leading-relaxed border border-[#C6EDBF]">
                      <p className="text-[#008069] text-[9px] font-bold mb-0.5">You (Client)</p>
                      <p className="text-[#111B21]">{scen.clientMessage}</p>
                      <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-[#667781]">
                        <span>{scen.clientTime}</span>
                        <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
                      </div>
                    </div>
                  </div>

                  {/* 2. Counsellor Reply Bubble (WhatsApp Pure White, Left) */}
                  <div className="flex justify-start">
                    <div className="max-w-[90%] bg-white text-[#111B21] rounded-2xl rounded-tl-xs p-3 shadow-xs text-xs leading-relaxed border border-[#E1DAD0]">
                      <p className="text-[#075E54] text-[9px] font-bold mb-0.5 flex items-center gap-1">
                        <span>{config.creatorName}</span>
                        <span className="text-[10px]">🌿</span>
                      </p>
                      <p className="text-[#111B21]">{scen.counsellorMessage}</p>
                      <div className="mt-1 flex items-center justify-end text-[9px] text-[#667781]">
                        <span>{scen.counsellorTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Optional Voice Note Bubble */}
                  {scen.hasVoiceNote && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-xs p-2.5 shadow-xs border border-[#E1DAD0]">
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() =>
                              setPlayingAudioIndex(playingAudioIndex === idx ? null : idx)
                            }
                            className="w-8 h-8 rounded-full bg-[#075E54] text-white flex items-center justify-center shrink-0 hover:bg-[#128C7E] transition-colors cursor-pointer shadow-xs"
                            aria-label="Play sample voice note"
                          >
                            {playingAudioIndex === idx ? (
                              <Pause className="w-3.5 h-3.5 text-[#25D366]" />
                            ) : (
                              <Play className="w-3.5 h-3.5 text-[#25D366] ml-0.5" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-0.5 h-3.5">
                              <span className="w-1 h-2 bg-[#075E54] rounded-full animate-pulse"></span>
                              <span className="w-1 h-3.5 bg-[#075E54] rounded-full"></span>
                              <span className="w-1 h-2 bg-[#25D366] rounded-full"></span>
                              <span className="w-1 h-3 bg-[#075E54] rounded-full"></span>
                              <span className="w-1 h-1.5 bg-[#25D366] rounded-full"></span>
                              <span className="w-1 h-3 bg-[#075E54] rounded-full"></span>
                              <span className="w-1 h-2 bg-[#25D366] rounded-full"></span>
                              <span className="w-1 h-2.5 bg-[#075E54] rounded-full"></span>
                            </div>
                            <p className="text-[9px] text-[#54656F] mt-0.5 font-medium">
                              🎙️ Voice message ({scen.voiceNoteDuration})
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Client Relief Response (WhatsApp Soft Light Green, Right) */}
                  <div className="flex justify-end">
                    <div className="max-w-[88%] bg-[#D9FDD3] text-[#111B21] rounded-2xl rounded-tr-xs p-3 shadow-xs text-xs leading-relaxed border border-[#C6EDBF]">
                      <p className="text-[#008069] text-[9px] font-bold mb-0.5">You (Client)</p>
                      <p className="text-[#111B21]">{scen.clientReply}</p>
                      <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-[#667781]">
                        <span>{scen.clientReplyTime}</span>
                        <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom WhatsApp Message Bar */}
                <div className="bg-[#F0F2F5] px-3.5 py-2.5 border-t border-[#DFE5E7] flex items-center justify-between gap-2 shrink-0">
                  <span className="text-[11px] text-[#54656F] italic">
                    Type a message...
                  </span>
                  <a
                    href={waStartUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20BA5A] text-[#073618] font-bold text-[11px] rounded-full shadow-2xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-[#073618]" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

          {/* Carousel Dot Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {scenarios.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToScenario(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === activeScenarioIndex
                    ? 'w-6 bg-[#2D4532]'
                    : 'w-2 bg-[#CAD9CD] hover:bg-[#85A38B]'
                }`}
                aria-label={`Go to scenario ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 text-[11px] text-[#617B66] mt-2 font-medium">
            <span>← Swipe left & right to browse all conversations →</span>
          </div>
        </div>

        {/* Action Prompt Below Chat Demonstration */}
        <div className="mt-10 max-w-xl mx-auto text-center">
          <a
            href={waStartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-[#2D4532] hover:bg-[#1E3023] text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98"
          >
            <MessageCircle className="w-4 h-4 text-[#9FE2AB]" />
            <span>Start Your Private Conversation on WhatsApp</span>
            <ArrowRight className="w-4 h-4 text-[#9FE2AB]" />
          </a>
        </div>

      </div>
    </section>
  );
};
