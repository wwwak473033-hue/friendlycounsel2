import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, Settings, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/config';

interface NavbarProps {
  config: SiteConfig;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Plans & Pricing', href: '#plans' },
    { label: 'Chat Preview', href: '#how-it-works' },
    { label: 'Why Choose Me', href: '#why-choose-me' },
    { label: 'About Me', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const primaryWhatsAppUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hi! I visited your website (${config.brandName}) and would love to talk about your emotional support services.`
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E3ECE5] shadow-xs'
            : 'bg-[#FAF8F5] border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="text-lg sm:text-xl font-bold tracking-tight text-[#233527] hover:text-[#38533D] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#527357] inline-block"></span>
            <span>{config.brandName}</span>
          </a>

          {/* Zone 2: Clean single-line text navigation links (desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#46594B]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#1E2E21] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + admin panel button & mobile trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              title="Open Admin Management Panel (Prices, Photos, Copy)"
              className="px-2.5 py-1.5 text-xs text-[#2D4532] hover:bg-[#EBF1EC] rounded-lg transition-colors flex items-center gap-1.5 border border-[#CCDCD0] bg-white shadow-2xs font-semibold cursor-pointer"
              aria-label="Admin Panel"
            >
              <Settings className="w-3.5 h-3.5 text-[#48734E]" />
              <span className="hidden sm:inline">Admin Panel</span>
            </button>

            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#2D4532] hover:bg-[#203424] rounded-lg transition-all duration-150 shadow-xs whitespace-nowrap shrink-0 active:scale-98"
            >
              <MessageCircle className="w-4 h-4 text-[#A8D3B1]" />
              <span>Private Chat</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2D4532] hover:bg-[#EBF1EC] rounded-lg lg:hidden transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-18 left-0 right-0 bg-[#FAF8F5] border-b border-[#DFE8E1] px-6 py-6 shadow-lg animate-in slide-in-from-top-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-4 text-base font-medium text-[#2E4032]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-[#EEF3EF] hover:text-[#507255] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={primaryWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#2D4532] rounded-lg shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#A8D3B1]" />
                  <span>Chat With Me on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#2D4532] bg-[#EAF1EB] border border-[#CCDCD0] rounded-lg cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-[#48734E]" />
                  <span>Open Admin Panel (Edit Prices & Photos)</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
