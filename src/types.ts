export interface PlanDurationPrices {
  '2hours': string;
  '1day': string;
  '1week': string;
  '1month': string;
}

export interface PlanPricingConfig {
  chat: PlanDurationPrices;
  notes: PlanDurationPrices;
  calls: PlanDurationPrices;
}

export interface SiteConfig {
  brandName: string;
  creatorName: string;
  whatsappNumber: string; // e.g. "+92 300 1234567"
  instagramUsername: string; // e.g. "your_handle"
  telegramUsername?: string; // e.g. "your_telegram" or "https://t.me/your_telegram"
  email: string; // e.g. "contact@yourbrand.com"
  sevenDayPrice: string; // e.g. "PKR 4,500"
  thirtyDayPrice: string; // e.g. "PKR 14,000"
  sessionDuration: string; // e.g. "45–60 Mins (Daily Voice Call + Texting)"
  qualifications: string; // e.g. "Your Friendly Counsellor · Daily Chats & Voice Calls"
  heroHeadline: string;
  heroSubheadline: string;
  bioHeadline: string;
  bioStory: string;
  portraitImage?: string;
  heroImage?: string;
  availabilityText?: string;
  planPrices?: PlanPricingConfig;
  // Payment Options & JazzCash Account Info
  jazzCashAccountTitle?: string;
  jazzCashAccountNumber?: string;
  jazzCashTillId?: string; // JazzCash Business Till ID (TID)
  jazzCashQrCodeImage?: string; // Uploaded QR Code image
  easyPaisaAccountTitle?: string;
  easyPaisaAccountNumber?: string;
  paymentInstructions?: string;
}

export interface PaymentSubmission {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  planId: string;
  planName: string;
  duration: string;
  durationLabel: string;
  amount: string;
  paymentMethod: 'JazzCash' | 'JazzCash Business (Till ID)' | 'EasyPaisa' | 'Bank Transfer' | 'Other';
  transactionId: string; // TID / Transaction reference
  screenshotUrl?: string;
  notes?: string;
  status: 'Pending' | 'Verified' | 'Completed' | 'Rejected';
  createdAt: string;
}

export interface SupportCardItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  whatsappPreFill: string;
}

