import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { SiteConfig } from './types';
import { DEFAULT_CONFIG, buildWhatsAppUrl } from './utils/config';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlansSection } from './components/PlansSection';
import { WhyChooseMe } from './components/WhyChooseMe';
import { HowItWorks } from './components/HowItWorks';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PolicyModals } from './components/PolicyModals';
import { AdminPanel } from './components/AdminPanel';
import { PaymentModal } from './components/PaymentModal';
import { HostingInstructionsModal } from './components/HostingInstructionsModal';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('wellness_site_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          !parsed.heroHeadline ||
          parsed.heroHeadline === "You Don't Have to Go Through It Alone." ||
          parsed.heroHeadline === "You Don’t Have to Go Through It Alone." ||
          parsed.heroHeadline === "Connect with me for your emotional support and guidance"
        ) {
          parsed.heroHeadline = DEFAULT_CONFIG.heroHeadline;
          parsed.heroSubheadline = DEFAULT_CONFIG.heroSubheadline;
        }
        if (!parsed.thirtyDayPrice) {
          parsed.thirtyDayPrice = DEFAULT_CONFIG.thirtyDayPrice;
        }
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch {
      // Ignore error and fallback to default
    }
    return DEFAULT_CONFIG;
  });

  const [policyModal, setPolicyModal] = useState<'privacy' | 'disclaimer' | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [hostingGuideOpen, setHostingGuideOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<{
    id: string;
    name: string;
    duration: string;
    durationLabel: string;
    amount: string;
  } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('wellness_site_config', JSON.stringify(config));
    } catch {
      // Ignore storage errors
    }
  }, [config]);

  const floatingWhatsAppUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hi ${config.creatorName}! I visited your website and would love to chat with you about your emotional support services.`
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D3A30] flex flex-col font-sans selection:bg-[#D5E3D8] selection:text-[#1F2E22]">
      {/* Top Navigation */}
      <Navbar
        config={config}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero config={config} />

        {/* Interactive Plans & Duration Configurator */}
        <PlansSection
          config={config}
          onSelectPlanForPayment={(planData) => setSelectedPlanForPayment(planData)}
        />

        {/* Why I Am Here For You (Why Choose Me) */}
        <WhyChooseMe config={config} />

        {/* How It Works (3 Steps) */}
        <HowItWorks config={config} />

        {/* About Me */}
        <AboutSection config={config} />

        {/* Contact Section ("Let's Talk 💚") */}
        <ContactSection config={config} />
      </main>

      {/* Dark Sage Green Footer */}
      <Footer
        config={config}
        onOpenPrivacy={() => setPolicyModal('privacy')}
        onOpenDisclaimer={() => setPolicyModal('disclaimer')}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Modals */}
      <PolicyModals
        config={config}
        isOpen={policyModal !== null}
        type={policyModal}
        onClose={() => setPolicyModal(null)}
      />

      {/* JazzCash & Payment Checkout Modal */}
      <PaymentModal
        config={config}
        isOpen={selectedPlanForPayment !== null}
        onClose={() => setSelectedPlanForPayment(null)}
        selectedPlan={selectedPlanForPayment}
      />

      {/* Full Admin Management Panel */}
      <AdminPanel
        config={config}
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onSave={(newCfg) => setConfig(newCfg)}
        onOpenHostingGuide={() => {
          setAdminOpen(false);
          setHostingGuideOpen(true);
        }}
      />

      <HostingInstructionsModal
        isOpen={hostingGuideOpen}
        onClose={() => setHostingGuideOpen(false)}
      />

      {/* Mobile Floating WhatsApp Quick Action (Thumb-friendly for Pakistani Instagram audience) */}
      <div className="fixed bottom-4 right-4 z-30 sm:hidden">
        <a
          href={floatingWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-[#2D4532] text-white text-xs font-semibold rounded-full shadow-lg active:scale-95 transition-all border border-[#527357]"
          aria-label="Direct WhatsApp Message"
        >
          <MessageCircle className="w-4 h-4 text-[#9FE2AB]" />
          <span>Send Private Message</span>
        </a>
      </div>
    </div>
  );
}
