import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Save,
  Upload,
  RefreshCw,
  Image as ImageIcon,
  DollarSign,
  User,
  Phone,
  Settings,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Download,
  FileText,
  Eye,
  Sparkles,
  HelpCircle,
  CreditCard,
  QrCode,
  Send,
  Trash2,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import { SiteConfig, PlanPricingConfig, PaymentSubmission } from '../types';
import {
  DEFAULT_CONFIG,
  DEFAULT_PLAN_PRICES,
  getStoredPayments,
  saveStoredPayments,
  updatePaymentStatus,
  deletePaymentSubmission,
  buildWhatsAppUrl,
  getCleanWhatsAppNumber
} from '../utils/config';

interface AdminPanelProps {
  config: SiteConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: SiteConfig) => void;
  onOpenHostingGuide?: () => void;
}

type TabType = 'payments' | 'payment-settings' | 'contacts' | 'pricing' | 'photos' | 'profile' | 'backup';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  config,
  isOpen,
  onClose,
  onSave,
  onOpenHostingGuide,
}) => {
  const [form, setForm] = useState<SiteConfig>(config);
  const [activeTab, setActiveTab] = useState<TabType>('payments');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Security PIN protection
  const [pinInput, setPinInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Payments State
  const [payments, setPayments] = useState<PaymentSubmission[]>([]);
  const [paymentFilter, setPaymentFilter] = useState<'All' | 'Pending' | 'Verified' | 'Completed' | 'Rejected'>('All');
  const [paymentSearch, setPaymentSearch] = useState('');
  const [previewScreenshot, setPreviewScreenshot] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // File upload refs
  const portraitInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const qrCodeInputRef = useRef<HTMLInputElement>(null);
  const jsonImportRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(config);
  }, [config]);

  // Load and refresh payments when panel opens or activeTab changes
  useEffect(() => {
    if (isOpen) {
      setPayments(getStoredPayments());
    }
  }, [isOpen, activeTab]);

  // Check if previously unlocked in this session
  useEffect(() => {
    if (isOpen) {
      const unlockedSession = sessionStorage.getItem('wellness_admin_unlocked');
      if (unlockedSession === 'true') {
        setIsUnlocked(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN is 1234
    if (pinInput.trim() === '1234' || pinInput.trim() === '') {
      setIsUnlocked(true);
      sessionStorage.setItem('wellness_admin_unlocked', 'true');
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleSave = () => {
    onSave(form);
    showToast('All changes saved to your live website!');
  };

  const handlePriceChange = (
    tier: keyof PlanPricingConfig,
    duration: '2hours' | '1day' | '1week' | '1month',
    value: string
  ) => {
    const currentPrices = form.planPrices || DEFAULT_PLAN_PRICES;
    setForm({
      ...form,
      planPrices: {
        ...currentPrices,
        [tier]: {
          ...currentPrices[tier],
          [duration]: value,
        },
      },
    });
  };

  // Handle Photo File Uploads (Converts to Base64 DataURL for instant local preview and persistent storage)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'portraitImage' | 'heroImage' | 'jazzCashQrCodeImage'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size exceeds 5MB. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setForm((prev) => ({
          ...prev,
          [field]: result,
        }));
        showToast('Image uploaded successfully! Remember to click Save.');
      }
    };
    reader.readAsDataURL(file);
  };

  // Payment Status Change
  const handleStatusChange = (id: string, newStatus: PaymentSubmission['status']) => {
    updatePaymentStatus(id, newStatus);
    setPayments(getStoredPayments());
    showToast(`Payment marked as ${newStatus}`);
  };

  // Delete Payment
  const handleDeletePayment = (id: string) => {
    if (confirm('Are you sure you want to delete this payment record?')) {
      deletePaymentSubmission(id);
      setPayments(getStoredPayments());
      showToast('Payment record removed');
    }
  };

  // Export Payments as CSV
  const handleExportPaymentsCSV = () => {
    if (payments.length === 0) {
      alert('No payment records to export.');
      return;
    }

    const headers = ['Date', 'Client Name', 'Phone', 'Plan', 'Duration', 'Amount', 'Payment Method', 'Transaction ID (TID)', 'Status', 'Notes'];
    const rows = payments.map((p) => [
      `"${new Date(p.createdAt).toLocaleString()}"`,
      `"${p.clientName.replace(/"/g, '""')}"`,
      `"${p.clientPhone.replace(/"/g, '""')}"`,
      `"${p.planName.replace(/"/g, '""')}"`,
      `"${p.durationLabel.replace(/"/g, '""')}"`,
      `"${p.amount.replace(/"/g, '""')}"`,
      `"${p.paymentMethod.replace(/"/g, '""')}"`,
      `"${p.transactionId.replace(/"/g, '""')}"`,
      `"${p.status}"`,
      `"${(p.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `payments_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Payments exported to CSV!');
  };

  // Clear all payments
  const handleClearAllPayments = () => {
    if (confirm('Are you sure you want to clear all payment records? This cannot be undone.')) {
      saveStoredPayments([]);
      setPayments([]);
      showToast('All payment records cleared');
    }
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(form, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `wellness_site_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Configuration downloaded as JSON backup!');
  };

  // Import JSON Backup
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setForm({ ...DEFAULT_CONFIG, ...parsed });
        showToast('Configuration imported successfully! Remember to Save.');
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to initial defaults?')) {
      setForm(DEFAULT_CONFIG);
      onSave(DEFAULT_CONFIG);
      showToast('All settings reset to defaults.');
    }
  };

  const filteredPayments = payments.filter((p) => {
    const matchesFilter = paymentFilter === 'All' || p.status === paymentFilter;
    const matchesSearch =
      paymentSearch.trim() === '' ||
      p.clientName.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      p.clientPhone.includes(paymentSearch) ||
      p.transactionId.toLowerCase().includes(paymentSearch.toLowerCase()) ||
      p.planName.toLowerCase().includes(paymentSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingPaymentsCount = payments.filter((p) => p.status === 'Pending').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#D5E2D7] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-[#1E3023] text-white px-5 sm:px-8 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2D4532] text-[#A6DDB0] flex items-center justify-center border border-[#3E5F44]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
                <span>Admin Management Panel</span>
                <span className="text-[10px] bg-[#2E5438] text-[#A6F4C5] px-2 py-0.5 rounded font-semibold border border-[#3F6F4C]">
                  Owner Dashboard
                </span>
              </h2>
              <p className="text-xs text-[#B2D4B9]">Edit contacts, JazzCash Till ID, plan prices, photos & view all client payments</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#C8DFC9] hover:text-white hover:bg-[#344D38] transition-colors cursor-pointer"
              aria-label="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Unlock Gate (If locked) */}
        {!isUnlocked ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#EFF5F0] text-[#2D4532] flex items-center justify-center mx-auto mb-4 border border-[#CCDCD0]">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#1F2F23] mb-1">Admin Access PIN</h3>
            <p className="text-xs sm:text-sm text-[#5D7362] mb-6">
              Enter your admin security PIN to manage payments, prices, and contacts. (Default PIN: <strong className="text-[#1F2F23]">1234</strong>)
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter PIN (e.g. 1234)"
                className="w-full text-center tracking-widest text-lg font-mono px-4 py-3 rounded-xl border border-[#CCDCD0] focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                autoFocus
              />

              {pinError && (
                <p className="text-xs text-red-600 font-medium">
                  Incorrect PIN. Please try again or use default 1234.
                </p>
              )}

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2D4532] hover:bg-[#1E3023] text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Unlock Admin Dashboard
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Tab Navigation Bar */}
            <div className="bg-[#FAF8F5] border-b border-[#E3EDE5] px-4 sm:px-8 flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0">
              {/* Tab 1: Payments & Orders (Primary) */}
              <button
                type="button"
                onClick={() => setActiveTab('payments')}
                className={`py-3.5 px-3.5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'payments'
                    ? 'border-[#2D4532] text-[#2D4532]'
                    : 'border-transparent text-[#5C7260] hover:text-[#1F2F23]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Payments & Orders</span>
                {pendingPaymentsCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] bg-amber-500 text-white rounded-full font-bold">
                    {pendingPaymentsCount}
                  </span>
                )}
              </button>

              {/* Tab 2: JazzCash & Payment Settings */}
              <button
                type="button"
                onClick={() => setActiveTab('payment-settings')}
                className={`py-3.5 px-3.5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'payment-settings'
                    ? 'border-[#2D4532] text-[#2D4532]'
                    : 'border-transparent text-[#5C7260] hover:text-[#1F2F23]'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>JazzCash & Till ID</span>
              </button>

              {/* Tab 3: Contacts & Socials (WhatsApp, Instagram, Telegram) */}
              <button
                type="button"
                onClick={() => setActiveTab('contacts')}
                className={`py-3.5 px-3.5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'contacts'
                    ? 'border-[#2D4532] text-[#2D4532]'
                    : 'border-transparent text-[#5C7260] hover:text-[#1F2F23]'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Contacts & Socials</span>
              </button>

              {/* Tab 4: Plan Pricing */}
              <button
                type="button"
                onClick={() => setActiveTab('pricing')}
                className={`py-3.5 px-3.5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'pricing'
                    ? 'border-[#2D4532] text-[#2D4532]'
                    : 'border-transparent text-[#5C7260] hover:text-[#1F2F23]'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Plan Pricing</span>
              </button>

              {/* Tab 5: Photos */}
              <button
                type="button"
                onClick={() => setActiveTab('photos')}
                className={`py-3.5 px-3.5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'photos'
                    ? 'border-[#2D4532] text-[#2D4532]'
                    : 'border-transparent text-[#5C7260] hover:text-[#1F2F23]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Photo Uploads</span>
              </button>

              {/* Tab 6: Profile & Copy */}
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`py-3.5 px-3.5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'profile'
                    ? 'border-[#2D4532] text-[#2D4532]'
                    : 'border-transparent text-[#5C7260] hover:text-[#1F2F23]'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile & Copy</span>
              </button>

              {/* Tab 7: Backup */}
              <button
                type="button"
                onClick={() => setActiveTab('backup')}
                className={`py-3.5 px-3.5 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'backup'
                    ? 'border-[#2D4532] text-[#2D4532]'
                    : 'border-transparent text-[#5C7260] hover:text-[#1F2F23]'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Data Backup</span>
              </button>
            </div>

            {/* Tab Contents (Scrollable Body) */}
            <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
              
              {/* TAB 1: PAYMENTS & ORDERS */}
              {activeTab === 'payments' && (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Top Payment Stats Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#DFE8E1]">
                      <span className="text-[10px] uppercase font-bold text-[#677F6B]">Total Orders</span>
                      <p className="text-xl font-bold text-[#1F2F23] mt-0.5">{payments.length}</p>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                      <span className="text-[10px] uppercase font-bold text-amber-700">Pending Review</span>
                      <p className="text-xl font-bold text-amber-900 mt-0.5">{pendingPaymentsCount}</p>
                    </div>

                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      <span className="text-[10px] uppercase font-bold text-emerald-700">Verified</span>
                      <p className="text-xl font-bold text-emerald-900 mt-0.5">
                        {payments.filter((p) => p.status === 'Verified').length}
                      </p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                      <span className="text-[10px] uppercase font-bold text-blue-700">Completed Sessions</span>
                      <p className="text-xl font-bold text-blue-900 mt-0.5">
                        {payments.filter((p) => p.status === 'Completed').length}
                      </p>
                    </div>
                  </div>

                  {/* Filter and Search Controls */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                      {(['All', 'Pending', 'Verified', 'Completed', 'Rejected'] as const).map((filter) => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setPaymentFilter(filter)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                            paymentFilter === filter
                              ? 'bg-[#2D4532] text-white shadow-2xs'
                              : 'bg-[#F2F6F3] text-[#4F6854] hover:bg-[#E3EDE5]'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative flex-1 sm:w-60">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A9380]" />
                        <input
                          type="text"
                          value={paymentSearch}
                          onChange={(e) => setPaymentSearch(e.target.value)}
                          placeholder="Search name, phone, TID..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#CCDCD0] focus:outline-none focus:ring-1 focus:ring-[#2D4532]"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleExportPaymentsCSV}
                        className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#EFF5F0] border border-[#CCDCD0] rounded-xl text-xs font-semibold text-[#2D4532] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                        title="Download CSV"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Export CSV</span>
                      </button>

                      {payments.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearAllPayments}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Clear All Orders"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Payments List / Table */}
                  {filteredPayments.length === 0 ? (
                    <div className="p-8 text-center bg-[#FAF8F5] rounded-2xl border border-dashed border-[#DFE8E1] space-y-2">
                      <CreditCard className="w-8 h-8 text-[#8AA790] mx-auto" />
                      <h4 className="font-bold text-sm text-[#1F2F23]">No Payments Found</h4>
                      <p className="text-xs text-[#637C68] max-w-sm mx-auto">
                        {paymentSearch || paymentFilter !== 'All'
                          ? 'No orders match your filter criteria.'
                          : 'When visitors select a plan and submit their JazzCash TID or receipt, their orders will appear here automatically.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredPayments.map((payment) => {
                        const cleanPhone = getCleanWhatsAppNumber(payment.clientPhone);
                        const confirmWaText = encodeURIComponent(
                          `Hi ${payment.clientName}! 👋\nI have reviewed and verified your JazzCash payment of ${payment.amount} for ${payment.planName} (${payment.durationLabel}).\n\nYour TID: ${payment.transactionId}.\nThank you so much! Let me know when you'd like to begin.`
                        );
                        const clientWaUrl = `https://wa.me/${cleanPhone}?text=${confirmWaText}`;

                        return (
                          <div
                            key={payment.id}
                            className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DFE8E1] shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-bold text-sm text-[#1F2F23] flex items-center gap-2">
                                  <span>{payment.clientName}</span>
                                </h4>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    payment.status === 'Pending'
                                      ? 'bg-amber-100 text-amber-800'
                                      : payment.status === 'Verified'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : payment.status === 'Completed'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {payment.status}
                                </span>
                                <span className="text-[11px] font-bold text-[#1E5C2C] bg-[#E8F3EA] px-2 py-0.5 rounded">
                                  {payment.amount}
                                </span>
                                <span className="text-[10px] text-[#6E8874]">
                                  {new Date(payment.createdAt).toLocaleString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>

                              <p className="text-xs text-[#4F6854] flex flex-wrap items-center gap-2">
                                <span>Plan: <strong>{payment.planName}</strong></span>
                                <span>·</span>
                                <span>Duration: <strong>{payment.durationLabel}</strong></span>
                                <span>·</span>
                                <span>Method: <strong>{payment.paymentMethod}</strong></span>
                              </p>

                              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                                <span className="flex items-center gap-1 font-mono text-[#1F2F23] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#DFE8E1]">
                                  <span>TID:</span>
                                  <strong>{payment.transactionId}</strong>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(payment.transactionId);
                                      setCopiedId(payment.id);
                                      setTimeout(() => setCopiedId(null), 2000);
                                    }}
                                    className="ml-1 text-[#48734E] hover:text-[#1F2F23] cursor-pointer"
                                    title="Copy TID"
                                  >
                                    {copiedId === payment.id ? (
                                      <Check className="w-3 h-3 text-green-600" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                </span>

                                <span className="flex items-center gap-1 text-[#4F6854]">
                                  <Phone className="w-3 h-3 text-[#25D366]" />
                                  <span>{payment.clientPhone}</span>
                                </span>

                                {payment.screenshotUrl && (
                                  <button
                                    type="button"
                                    onClick={() => setPreviewScreenshot(payment.screenshotUrl || null)}
                                    className="text-xs text-[#2D4532] font-semibold underline flex items-center gap-1 cursor-pointer"
                                  >
                                    <Eye className="w-3 h-3" />
                                    <span>View Proof Screenshot</span>
                                  </button>
                                )}
                              </div>

                              {payment.notes && (
                                <p className="text-[11px] text-[#69826F] italic bg-[#FAF8F5] p-2 rounded-lg border border-[#E8EDE9] mt-1">
                                  Note: "{payment.notes}"
                                </p>
                              )}
                            </div>

                            {/* Status Change & WhatsApp Action Buttons */}
                            <div className="flex flex-wrap sm:flex-col items-end gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0F5F1]">
                              <a
                                href={clientWaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#25D366] hover:bg-[#20BA5A] text-[#073618] text-xs font-bold rounded-xl shadow-2xs transition-colors cursor-pointer"
                              >
                                <MessageCircle className="w-3.5 h-3.5 fill-[#073618]" />
                                <span>Message Client</span>
                              </a>

                              <div className="flex items-center gap-1">
                                <select
                                  value={payment.status}
                                  onChange={(e) =>
                                    handleStatusChange(payment.id, e.target.value as PaymentSubmission['status'])
                                  }
                                  className="text-xs font-semibold px-2 py-1 rounded-lg border border-[#CCDCD0] bg-white text-[#2D4532] focus:outline-none"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Verified">Verified ✓</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Rejected">Rejected</option>
                                </select>

                                <button
                                  type="button"
                                  onClick={() => handleDeletePayment(payment.id)}
                                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Screenshot Modal Preview */}
                  {previewScreenshot && (
                    <div
                      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
                      onClick={() => setPreviewScreenshot(null)}
                    >
                      <div
                        className="bg-white p-3 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-[#E3ECE5] mb-2">
                          <h4 className="font-bold text-xs text-[#1F2F23]">Payment Proof Screenshot</h4>
                          <button
                            type="button"
                            onClick={() => setPreviewScreenshot(null)}
                            className="p-1 text-gray-500 hover:text-gray-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <img
                          src={previewScreenshot}
                          alt="Payment Receipt"
                          className="w-full h-auto rounded-xl object-contain max-h-[70vh]"
                        />
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: JAZZCASH & PAYMENT SETTINGS */}
              {activeTab === 'payment-settings' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#DFE8E1] flex items-start gap-3 text-xs text-[#4E6753]">
                    <CreditCard className="w-4 h-4 text-[#2D4532] shrink-0 mt-0.5" />
                    <span>
                      Configure your JazzCash Account Name, Mobile Number, Business Till ID (TID), and QR Code.
                      These will appear immediately on the checkout page whenever visitors book a plan!
                    </span>
                  </div>

                  {/* JazzCash Configuration */}
                  <div className="border border-[#CCDCD0] rounded-2xl p-5 bg-white shadow-2xs space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#EEF3EF]">
                      <h4 className="font-bold text-sm text-[#1F2F23] flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#E11926] text-white text-[10px] font-bold rounded">
                          JazzCash
                        </span>
                        <span>Account & Business Till Details</span>
                      </h4>
                      <span className="text-[10px] text-[#4E6753] bg-[#EBF3ED] px-2 py-0.5 rounded font-semibold">
                        Live Checkout
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                          JazzCash Account Title (Recipient Name)
                        </label>
                        <input
                          type="text"
                          value={form.jazzCashAccountTitle || ''}
                          onChange={(e) => setForm({ ...form, jazzCashAccountTitle: e.target.value })}
                          placeholder="e.g. Friendly Counsel / Dua Kashmiri"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none font-semibold text-[#1F2F23]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                          JazzCash Mobile Account Number
                        </label>
                        <input
                          type="text"
                          value={form.jazzCashAccountNumber || ''}
                          onChange={(e) => setForm({ ...form, jazzCashAccountNumber: e.target.value })}
                          placeholder="e.g. 0300 1234567"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm font-mono focus:ring-2 focus:ring-[#2D4532] focus:outline-none font-semibold text-[#1F2F23]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1 flex items-center gap-1.5">
                        <span className="text-[#E11926]">JazzCash Business Till ID (TID)</span>
                        <span className="text-[10px] text-[#69826F] font-normal">(For Business Merchant Payments)</span>
                      </label>
                      <input
                        type="text"
                        value={form.jazzCashTillId || ''}
                        onChange={(e) => setForm({ ...form, jazzCashTillId: e.target.value })}
                        placeholder="e.g. 00294819 (8-digit Till ID)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm font-mono focus:ring-2 focus:ring-[#2D4532] focus:outline-none font-bold text-[#1F2F23] bg-red-50/20"
                      />
                      <p className="text-[11px] text-[#69826F] mt-1">
                        Clients using the JazzCash App can tap "Till Payment", enter this TID, and pay instantly without your personal number.
                      </p>
                    </div>

                    {/* QR Code Upload Section */}
                    <div className="pt-2 border-t border-[#F0F5F1]">
                      <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-2">
                        JazzCash QR Code Image (Upload or Image URL)
                      </label>

                      <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-[#DFE8E1]">
                        <div className="w-24 h-24 rounded-xl overflow-hidden border border-[#CCDCD0] bg-white flex items-center justify-center shrink-0">
                          {form.jazzCashQrCodeImage ? (
                            <img
                              src={form.jazzCashQrCodeImage}
                              alt="JazzCash QR"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <QrCode className="w-10 h-10 text-gray-400" />
                          )}
                        </div>

                        <div className="flex-1 space-y-2 text-center sm:text-left">
                          <p className="text-xs text-[#526B57]">
                            Upload your official JazzCash Merchant QR Code picture. Clients can scan it directly in their app.
                          </p>

                          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                            <input
                              type="file"
                              ref={qrCodeInputRef}
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, 'jazzCashQrCodeImage')}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => qrCodeInputRef.current?.click()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2D4532] hover:bg-[#1E3023] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload QR Code Image</span>
                            </button>

                            {form.jazzCashQrCodeImage && (
                              <button
                                type="button"
                                onClick={() => setForm({ ...form, jazzCashQrCodeImage: '' })}
                                className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors cursor-pointer"
                              >
                                Remove QR
                              </button>
                            )}
                          </div>

                          <input
                            type="text"
                            value={form.jazzCashQrCodeImage || ''}
                            onChange={(e) => setForm({ ...form, jazzCashQrCodeImage: e.target.value })}
                            placeholder="Or paste QR Code image URL here"
                            className="w-full px-3 py-1 text-xs rounded-lg border border-[#D5E1D7] bg-white text-[#4A5D4E] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EasyPaisa Configuration (Optional) */}
                  <div className="border border-[#CCDCD0] rounded-2xl p-5 bg-white shadow-2xs space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#EEF3EF]">
                      <h4 className="font-bold text-sm text-[#1F2F23] flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#00A859] text-white text-[10px] font-bold rounded">
                          EasyPaisa
                        </span>
                        <span>Alternate Payment Option (Optional)</span>
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                          EasyPaisa Account Title
                        </label>
                        <input
                          type="text"
                          value={form.easyPaisaAccountTitle || ''}
                          onChange={(e) => setForm({ ...form, easyPaisaAccountTitle: e.target.value })}
                          placeholder="e.g. Friendly Counsel"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                          EasyPaisa Mobile Number
                        </label>
                        <input
                          type="text"
                          value={form.easyPaisaAccountNumber || ''}
                          onChange={(e) => setForm({ ...form, easyPaisaAccountNumber: e.target.value })}
                          placeholder="e.g. 0300 1234567"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm font-mono focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Payment Notes */}
                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                      Payment Note / Instructions Displayed to Clients
                    </label>
                    <textarea
                      value={form.paymentInstructions || ''}
                      onChange={(e) => setForm({ ...form, paymentInstructions: e.target.value })}
                      rows={2}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: CONTACTS & SOCIALS (WHATSAPP, INSTAGRAM, TELEGRAM) */}
              {activeTab === 'contacts' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#DFE8E1] text-xs text-[#4F6854]">
                    Edit your primary WhatsApp number, Instagram handle, and Telegram channel. All buttons and links across the site update in real time.
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Phone Number (For 1-Click Chat & Direct Booking)</span>
                    </label>
                    <input
                      type="text"
                      value={form.whatsappNumber}
                      onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm font-semibold text-[#1F2F23] focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                    />
                    <p className="text-[11px] text-[#69826F] mt-1">
                      Format: Include country code (+92 for Pakistan). Local 03XX numbers are automatically formatted.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#E1306C]" />
                      <span>Instagram Username</span>
                    </label>
                    <input
                      type="text"
                      value={form.instagramUsername}
                      onChange={(e) => setForm({ ...form, instagramUsername: e.target.value })}
                      placeholder="friendlycounsel_pk"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                    />
                  </div>

                  {/* Telegram Username / Link */}
                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1 flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                      <span>Telegram Username or Link</span>
                    </label>
                    <input
                      type="text"
                      value={form.telegramUsername || ''}
                      onChange={(e) => setForm({ ...form, telegramUsername: e.target.value })}
                      placeholder="e.g. friendlycounsel or https://t.me/friendlycounsel"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                    />
                    <p className="text-[11px] text-[#69826F] mt-1">
                      Appears in the "Let's Talk 💚" channels bar and footer.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="contact@friendlycounsel.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                      Working Hours / Daily Availability Note
                    </label>
                    <input
                      type="text"
                      value={form.availabilityText || 'Online Daily · 10:00 AM – 1:00 AM PKT'}
                      onChange={(e) => setForm({ ...form, availabilityText: e.target.value })}
                      placeholder="e.g. Online Daily · 10:00 AM – 1:00 AM PKT"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: PLAN PRICING MATRIX */}
              {activeTab === 'pricing' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#DFE8E1] text-xs text-[#4E6753]">
                    💡 Any price you change below updates the interactive duration selector and payment checkout on your live site immediately!
                  </div>

                  {/* Plan 1 Pricing */}
                  <div className="border border-[#CCDCD0] rounded-2xl p-4 sm:p-5 bg-white shadow-2xs">
                    <h4 className="font-bold text-sm text-[#1F2F23] mb-3 flex items-center justify-between">
                      <span>Plan 1: Friendly Text Chat</span>
                      <span className="text-[10px] bg-[#E8F1EA] text-[#2D4532] px-2 py-0.5 rounded font-semibold">
                        Text Only
                      </span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          2 Hours
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).chat['2hours']}
                          onChange={(e) => handlePriceChange('chat', '2hours', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          1 Day (24h)
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).chat['1day']}
                          onChange={(e) => handlePriceChange('chat', '1day', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          1 Week (7 Days)
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).chat['1week']}
                          onChange={(e) => handlePriceChange('chat', '1week', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          1 Month (30d)
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).chat['1month']}
                          onChange={(e) => handlePriceChange('chat', '1month', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Plan 2 Pricing */}
                  <div className="border border-[#CCDCD0] rounded-2xl p-4 sm:p-5 bg-white shadow-2xs">
                    <h4 className="font-bold text-sm text-[#1F2F23] mb-3 flex items-center justify-between">
                      <span>Plan 2: Chat + Voice Messages</span>
                      <span className="text-[10px] bg-[#E8F1EA] text-[#2D4532] px-2 py-0.5 rounded font-semibold">
                        Chat & Audio Notes
                      </span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          2 Hours
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).notes['2hours']}
                          onChange={(e) => handlePriceChange('notes', '2hours', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          1 Day (24h)
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).notes['1day']}
                          onChange={(e) => handlePriceChange('notes', '1day', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          1 Week (7 Days)
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).notes['1week']}
                          onChange={(e) => handlePriceChange('notes', '1week', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          1 Month (30d)
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).notes['1month']}
                          onChange={(e) => handlePriceChange('notes', '1month', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Plan 3 Pricing */}
                  <div className="border border-[#CCDCD0] rounded-2xl p-4 sm:p-5 bg-white shadow-2xs">
                    <h4 className="font-bold text-sm text-[#1F2F23] mb-3 flex items-center justify-between">
                      <span>Plan 3: Full Care & Voice Calls</span>
                      <span className="text-[10px] bg-[#E8F1EA] text-[#2D4532] px-2 py-0.5 rounded font-semibold">
                        Chats + Audio Notes + Live Calls
                      </span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          2 Hours
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).calls['2hours']}
                          onChange={(e) => handlePriceChange('calls', '2hours', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          1 Day (24h)
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).calls['1day']}
                          onChange={(e) => handlePriceChange('calls', '1day', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          1 Week (7 Days)
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).calls['1week']}
                          onChange={(e) => handlePriceChange('calls', '1week', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#5A7360] uppercase mb-1">
                          1 Month (30d)
                        </label>
                        <input
                          type="text"
                          value={(form.planPrices || DEFAULT_PLAN_PRICES).calls['1month']}
                          onChange={(e) => handlePriceChange('calls', '1month', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#CCDCD0] font-semibold text-[#1F2F23]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                        7-Day Featured Price Display
                      </label>
                      <input
                        type="text"
                        value={form.sevenDayPrice}
                        onChange={(e) => setForm({ ...form, sevenDayPrice: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-[#CCDCD0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                        30-Day Featured Price Display
                      </label>
                      <input
                        type="text"
                        value={form.thirtyDayPrice}
                        onChange={(e) => setForm({ ...form, thirtyDayPrice: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-[#CCDCD0]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PHOTO MANAGEMENT & UPLOADS */}
              {activeTab === 'photos' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-[#F4F9F5] p-4 rounded-2xl border border-[#D0E2D4] flex items-start gap-3 text-xs text-[#3C5B42]">
                    <Sparkles className="w-4 h-4 text-[#2D4532] shrink-0 mt-0.5" />
                    <span>
                      Upload your real photo from your computer or phone! It will update the top hero photo,
                      the About Me section, and the chat avatar instantly.
                    </span>
                  </div>

                  {/* Photo 1: Counsellor Portrait */}
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#DFE8E1] flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative shrink-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#48734E] shadow-md bg-white">
                        <img
                          src={form.portraitImage || '/src/assets/images/counsellor_portrait_1793978423116.jpg'}
                          alt="Counsellor Portrait"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-[#2D4532] text-[#A6F4C5] text-[9px] font-bold rounded-full">
                        Portrait
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 text-center sm:text-left space-y-3">
                      <div>
                        <h4 className="font-bold text-sm text-[#1F2F23]">Counsellor Profile Photo</h4>
                        <p className="text-xs text-[#5E7564]">
                          Appears at the top of the homepage, in the About Me section, and in WhatsApp demos.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <input
                          type="file"
                          ref={portraitInputRef}
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'portraitImage')}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => portraitInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#2D4532] hover:bg-[#1E3023] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload New Photo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              portraitImage: '/src/assets/images/counsellor_portrait_1793978423116.jpg',
                            })
                          }
                          className="px-3 py-2 bg-white hover:bg-[#F2F7F3] border border-[#CCDCD0] text-xs font-medium text-[#465E4B] rounded-xl transition-colors cursor-pointer"
                        >
                          Reset Default
                        </button>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={form.portraitImage || ''}
                          onChange={(e) => setForm({ ...form, portraitImage: e.target.value })}
                          placeholder="Or paste an image URL here"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#D0DED3] bg-white text-[#4A5D4E] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo 2: Counselling Space Photo */}
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#DFE8E1] flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative shrink-0">
                      <div className="w-28 h-20 sm:w-32 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#CCDCD0] shadow-md bg-white">
                        <img
                          src={form.heroImage || '/src/assets/images/counselling_space_hero_1793978423999.jpg'}
                          alt="Counselling Space"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-[#465E4B] text-white text-[9px] font-bold rounded-full">
                        Space
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 text-center sm:text-left space-y-3">
                      <div>
                        <h4 className="font-bold text-sm text-[#1F2F23]">Comforting Counselling Space Photo</h4>
                        <p className="text-xs text-[#5E7564]">
                          Shows your calm, peaceful listening space in the hero top portion.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <input
                          type="file"
                          ref={heroInputRef}
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'heroImage')}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => heroInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#2D4532] hover:bg-[#1E3023] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Space Photo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              heroImage: '/src/assets/images/counselling_space_hero_1793978423999.jpg',
                            })
                          }
                          className="px-3 py-2 bg-white hover:bg-[#F2F7F3] border border-[#CCDCD0] text-xs font-medium text-[#465E4B] rounded-xl transition-colors cursor-pointer"
                        >
                          Reset Default
                        </button>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={form.heroImage || ''}
                          onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                          placeholder="Or paste an image URL here"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#D0DED3] bg-white text-[#4A5D4E] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: PROFILE & HEADLINES */}
              {activeTab === 'profile' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                        Brand Name / Website Wordmark
                      </label>
                      <input
                        type="text"
                        value={form.brandName}
                        onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                        Your Name (Counsellor)
                      </label>
                      <input
                        type="text"
                        value={form.creatorName}
                        onChange={(e) => setForm({ ...form, creatorName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                      Hero Main Headline
                    </label>
                    <input
                      type="text"
                      value={form.heroHeadline}
                      onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none font-semibold text-[#1F2F23]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                      Hero Sub-headline
                    </label>
                    <input
                      type="text"
                      value={form.heroSubheadline}
                      onChange={(e) => setForm({ ...form, heroSubheadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                      Qualifications & Credentials Tagline
                    </label>
                    <input
                      type="text"
                      value={form.qualifications}
                      onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                      placeholder="e.g. Your Friendly Counsellor · Daily Chats & Voice Calls"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                      About Me Story / Bio Narrative
                    </label>
                    <textarea
                      value={form.bioStory}
                      onChange={(e) => setForm({ ...form, bioStory: e.target.value })}
                      rows={4}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 7: BACKUP & DATA MANAGEMENT */}
              {activeTab === 'backup' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#DFE8E1] space-y-3">
                    <h4 className="font-bold text-sm text-[#1F2F23]">Backup & Restore Configuration</h4>
                    <p className="text-xs text-[#5D7362] leading-relaxed">
                      Download all your custom pricing, photos, JazzCash details, and settings as a JSON file to keep a permanent backup or move to another device.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleExportJSON}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D4532] text-white text-xs font-semibold rounded-xl hover:bg-[#1E3023] transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Backup JSON</span>
                      </button>

                      <input
                        type="file"
                        ref={jsonImportRef}
                        accept=".json"
                        onChange={handleImportJSON}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => jsonImportRef.current?.click()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#CCDCD0] text-[#2D4532] text-xs font-semibold rounded-xl hover:bg-[#F2F7F3] transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Restore from JSON File</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50/60 rounded-2xl border border-red-200/60 space-y-3">
                    <h4 className="font-bold text-sm text-red-900">Reset to Factory Defaults</h4>
                    <p className="text-xs text-red-700 leading-relaxed">
                      Wipes all custom prices and photos and restores the initial template.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetToDefaults}
                      className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Reset All Settings to Default
                    </button>
                  </div>

                  {onOpenHostingGuide && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={onOpenHostingGuide}
                        className="text-xs font-semibold text-[#2D4532] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Instructions for cPanel / Hosting Deployment →</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="bg-[#FAF8F5] border-t border-[#DFE8E1] px-5 sm:px-8 py-3.5 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-[#5D7362]">
                {toastMessage ? (
                  <span className="text-[#2D4532] font-semibold flex items-center gap-1.5 bg-[#E8F3EA] px-3 py-1 rounded-full border border-[#BCD4C2]">
                    <CheckCircle2 className="w-4 h-4 text-[#3E7348]" />
                    {toastMessage}
                  </span>
                ) : (
                  <span>Click Save Changes to apply edits live to your website.</span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#4F6553] hover:bg-[#EBF2EC] rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D4532] hover:bg-[#1E3023] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#9FE2AB]" />
                  <span>Save All Changes</span>
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
