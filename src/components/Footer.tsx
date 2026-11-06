import { MessageCircle, Instagram, Mail, Heart, Send } from 'lucide-react';
import { SiteConfig } from '../types';
import { buildWhatsAppUrl, buildInstagramUrl, buildMailtoUrl, buildTelegramUrl } from '../utils/config';

interface FooterProps {
  config: SiteConfig;
  onOpenPrivacy: () => void;
  onOpenDisclaimer: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenPrivacy, onOpenDisclaimer, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(
    config.whatsappNumber,
    `Hi ${config.creatorName}! I am reaching out from your website footer.`
  );
  const instagramUrl = buildInstagramUrl(config.instagramUsername);
  const telegramUrl = buildTelegramUrl(config.telegramUsername);
  const emailUrl = buildMailtoUrl(config.email, 'Emotional Support Inquiry');

  return (
    <footer className="bg-[#243527] text-[#EDE8DF] pt-16 pb-12 border-t border-[#314635]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#364D3A]">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5">
            <a href="#home" className="text-xl font-bold text-white tracking-tight inline-block mb-3">
              {config.brandName}
            </a>
            <p className="text-sm text-[#C4D5C7] leading-relaxed mb-6 max-w-sm">
              Personal emotional support, gentle active listening, and guidance designed to help
              you find clarity, comfort, and peace in your daily life.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#2F4433] hover:bg-[#3D5A42] text-[#A6D6B0] flex items-center justify-center transition-colors border border-[#405A44]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#2F4433] hover:bg-[#3D5A42] text-[#E3CEBA] flex items-center justify-center transition-colors border border-[#405A44]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#2F4433] hover:bg-[#3D5A42] text-[#A6DAF4] flex items-center justify-center transition-colors border border-[#405A44]"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4 -rotate-12 ml-0.5" />
              </a>
              <a
                href={emailUrl}
                className="w-10 h-10 rounded-xl bg-[#2F4433] hover:bg-[#3D5A42] text-[#C4D5C7] flex items-center justify-center transition-colors border border-[#405A44]"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A2BBA6] mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C9DACD]">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition-colors">
                  Plans & Pricing
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Chat Preview
                </a>
              </li>
              <li>
                <a href="#why-choose-me" className="hover:text-white transition-colors">
                  Why Choose Me
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Bookings
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Trust Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A2BBA6] mb-4">
              Trust & Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C9DACD]">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDisclaimer}
                  className="hover:text-white transition-colors text-left"
                >
                  Disclaimer & Boundaries
                </button>
              </li>
              {onOpenAdmin && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="hover:text-[#A6F4C5] text-[#91B898] transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>Admin Panel (Owner Login)</span>
                  </button>
                </li>
              )}
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors text-left text-xs text-[#95B199]"
                >
                  Urgent Help: Umang (0311-7786264)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A2BBA6]">
          <p>© {currentYear} {config.brandName}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with care & empathy</span>
            <Heart className="w-3.5 h-3.5 fill-[#8BAE92] text-[#8BAE92]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
