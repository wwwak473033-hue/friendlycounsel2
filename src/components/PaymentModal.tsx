import React, { useState, useRef } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Upload,
  MessageCircle,
  QrCode,
  CreditCard,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Phone,
  Clock
} from 'lucide-react';
import { SiteConfig, PaymentSubmission } from '../types';
import { addPaymentSubmission, buildWhatsAppUrl } from '../utils/config';

interface PaymentModalProps {
  config: SiteConfig;
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    id: string;
    name: string;
    duration: string;
    durationLabel: string;
    amount: string;
  } | null;
  onPaymentSubmitted?: (payment: PaymentSubmission) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  config,
  isOpen,
  onClose,
  selectedPlan,
  onPaymentSubmitted,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'jazzcash' | 'easypaisa'>('jazzcash');

  // Form fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [notes, setNotes] = useState('');
  const [screenshotData, setScreenshotData] = useState<string>('');
  const [formError, setFormError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedPayment, setSubmittedPayment] = useState<PaymentSubmission | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !selectedPlan) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Screenshot size exceeds 5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setScreenshotData(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!clientPhone.trim()) {
      setFormError('Please enter your WhatsApp contact number.');
      return;
    }
    if (!transactionId.trim()) {
      setFormError('Please enter your JazzCash TID / Transaction ID (from SMS receipt).');
      return;
    }

    setFormError('');

    const paymentMethodLabel =
      selectedMethod === 'jazzcash'
        ? config.jazzCashTillId
          ? 'JazzCash Business (Till ID)'
          : 'JazzCash'
        : 'EasyPaisa';

    const newPayment = addPaymentSubmission({
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim() || undefined,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      duration: selectedPlan.duration,
      durationLabel: selectedPlan.durationLabel,
      amount: selectedPlan.amount,
      paymentMethod: paymentMethodLabel,
      transactionId: transactionId.trim(),
      screenshotUrl: screenshotData || undefined,
      notes: notes.trim() || undefined,
    });

    setSubmittedPayment(newPayment);
    setIsSuccess(true);
    if (onPaymentSubmitted) {
      onPaymentSubmitted(newPayment);
    }
  };

  const handleOpenWhatsAppNotify = () => {
    const text = `Hi ${config.creatorName}! 👋\nI have completed the payment for my emotional support plan on your website.\n\n📋 *Booking Details:*\n- *Plan:* ${selectedPlan.name}\n- *Duration:* ${selectedPlan.durationLabel}\n- *Amount Paid:* ${selectedPlan.amount}\n- *Payment Method:* ${selectedMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'}\n- *Transaction ID (TID):* ${transactionId}\n- *My Name:* ${clientName}\n- *My WhatsApp:* ${clientPhone}\n\nPlease verify and let's get started!`;

    const url = buildWhatsAppUrl(config.whatsappNumber, text);
    window.open(url, '_blank');
    onClose();
  };

  const handleReset = () => {
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setTransactionId('');
    setNotes('');
    setScreenshotData('');
    setFormError('');
    setIsSuccess(false);
    setSubmittedPayment(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#D5E2D7] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="bg-[#1E3023] text-white px-5 sm:px-7 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D4532] text-[#A6F4C5] flex items-center justify-center border border-[#3E5F44]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
                <span>Secure Payment & Plan Checkout</span>
              </h2>
              <p className="text-xs text-[#B2D4B9]">JazzCash Account & Till ID (TID) Payment</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-[#C8DFC9] hover:text-white hover:bg-[#344D38] transition-colors cursor-pointer"
            aria-label="Close Payment Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">

          {isSuccess ? (
            /* Success Confirmation Screen */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E8F5EB] text-[#2D4532] border-2 border-[#8AC297] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9 text-[#2E7A3E]" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E8F0EA] text-[#2D4532] px-3 py-1 rounded-full border border-[#BCD4C2]">
                  Order Successfully Recorded
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1F2F23] mt-2">
                  Thank You, {clientName}!
                </h3>
                <p className="text-xs sm:text-sm text-[#4E6753] max-w-md mx-auto mt-1">
                  Your payment details and TID (<strong className="text-[#1F2F23] font-mono">{transactionId}</strong>) have been saved in our system.
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#DFE8E1] max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between pb-2 border-b border-[#E8EDE9]">
                  <span className="text-[#677F6B]">Plan:</span>
                  <span className="font-bold text-[#1F2F23]">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E8EDE9]">
                  <span className="text-[#677F6B]">Duration:</span>
                  <span className="font-bold text-[#1F2F23]">{selectedPlan.durationLabel}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E8EDE9]">
                  <span className="text-[#677F6B]">Amount Paid:</span>
                  <span className="font-bold text-base text-[#1E5C2C]">{selectedPlan.amount}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E8EDE9]">
                  <span className="text-[#677F6B]">Transaction ID (TID):</span>
                  <span className="font-bold font-mono text-[#1F2F23]">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#677F6B]">Status:</span>
                  <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                    Pending Verification
                  </span>
                </div>
              </div>

              <div className="pt-2 max-w-md mx-auto space-y-2.5">
                <button
                  type="button"
                  onClick={handleOpenWhatsAppNotify}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-[#073618] font-bold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-[#073618]" />
                  <span>Send Confirmation on WhatsApp (1-Click)</span>
                </button>

                <p className="text-[11px] text-[#69826F]">
                  Clicking will open WhatsApp with your receipt ready to send directly to {config.creatorName}.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-[#526B57] hover:underline pt-2 cursor-pointer"
                >
                  Close & Return to Website
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Selected Plan Summary Banner */}
              <div className="bg-gradient-to-r from-[#F2F7F3] via-[#EFF6F1] to-[#E8F2EC] p-4 sm:p-5 rounded-2xl border border-[#CCDCD0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2D4532] text-[#A6F4C5] px-2 py-0.5 rounded">
                    Selected Package
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#1B2A1E] mt-1">
                    {selectedPlan.name}
                  </h3>
                  <p className="text-xs text-[#4C6450] flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#2D4532]" />
                    <span>Duration: <strong>{selectedPlan.durationLabel}</strong></span>
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs text-[#526B57] block">Total Amount</span>
                  <span className="text-xl sm:text-2xl font-bold text-[#1F5529] tracking-tight">
                    {selectedPlan.amount}
                  </span>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-[#E3EDE5] pb-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('jazzcash')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      selectedMethod === 'jazzcash'
                        ? 'bg-[#E11926] text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-[#556F5A] hover:bg-[#EBF1EC]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
                    <span>JazzCash (Account & Business TID)</span>
                  </button>

                  {config.easyPaisaAccountNumber && (
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('easypaisa')}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                        selectedMethod === 'easypaisa'
                          ? 'bg-[#00A859] text-white shadow-xs'
                          : 'bg-[#FAF8F5] text-[#556F5A] hover:bg-[#EBF1EC]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
                      <span>EasyPaisa</span>
                    </button>
                  )}
                </div>

                {/* JazzCash Payment Box */}
                {selectedMethod === 'jazzcash' && (
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#E11926]/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#E11926] text-white text-[11px] font-extrabold rounded-lg tracking-wider">
                          JazzCash
                        </span>
                        <span className="text-xs font-semibold text-[#1F2F23]">
                          Business & Mobile Account
                        </span>
                      </div>
                      <span className="text-[10px] text-[#4E6753] bg-[#EBF3ED] px-2 py-0.5 rounded font-medium">
                        Instant Verification
                      </span>
                    </div>

                    {/* Account Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Account Title */}
                      <div className="bg-white p-3 rounded-xl border border-[#DFE8E1]">
                        <span className="text-[10px] uppercase font-bold text-[#677F6B] block">
                          Account Title
                        </span>
                        <span className="text-sm font-bold text-[#1F2F23]">
                          {config.jazzCashAccountTitle || 'Friendly Counsel / Dua Kashmiri'}
                        </span>
                      </div>

                      {/* Mobile Account Number */}
                      <div className="bg-white p-3 rounded-xl border border-[#DFE8E1] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#677F6B] block">
                            JazzCash Mobile Number
                          </span>
                          <span className="text-sm font-bold font-mono text-[#1F2F23]">
                            {config.jazzCashAccountNumber || config.whatsappNumber}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            copyToClipboard(
                              config.jazzCashAccountNumber || config.whatsappNumber,
                              'mobile'
                            )
                          }
                          className="p-1.5 bg-[#F2F7F3] hover:bg-[#2D4532] hover:text-white text-[#2D4532] rounded-lg border border-[#CCDCD0] text-xs transition-colors flex items-center gap-1 cursor-pointer"
                          title="Copy Mobile Number"
                        >
                          {copiedField === 'mobile' ? (
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span className="text-[10px] font-semibold">
                            {copiedField === 'mobile' ? 'Copied' : 'Copy'}
                          </span>
                        </button>
                      </div>

                      {/* JazzCash Business Till ID (TID) */}
                      {config.jazzCashTillId && (
                        <div className="bg-white p-3 rounded-xl border border-[#DFE8E1] sm:col-span-2 flex items-center justify-between bg-gradient-to-r from-red-50/40 to-white">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] uppercase font-bold text-[#E11926]">
                                JazzCash Business Till ID (TID)
                              </span>
                              <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold">
                                For Till Payment
                              </span>
                            </div>
                            <span className="text-base font-bold font-mono tracking-wider text-[#1F2F23]">
                              {config.jazzCashTillId}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(config.jazzCashTillId || '', 'tid')}
                            className="p-1.5 bg-[#E11926] hover:bg-[#BD111C] text-white rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                            title="Copy Till ID"
                          >
                            {copiedField === 'tid' ? (
                              <Check className="w-3.5 h-3.5 text-white" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span className="text-[10px] font-bold">
                              {copiedField === 'tid' ? 'Copied TID' : 'Copy TID'}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* QR Code Display (If uploaded by Admin) */}
                    {config.jazzCashQrCodeImage && (
                      <div className="bg-white p-4 rounded-xl border border-[#DFE8E1] flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-28 h-28 rounded-xl overflow-hidden border-2 border-[#E11926]/40 shadow-xs bg-white shrink-0">
                          <img
                            src={config.jazzCashQrCodeImage}
                            alt="JazzCash Payment QR Code"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-left space-y-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E11926]">
                            <QrCode className="w-3.5 h-3.5" />
                            <span>Scan to Pay with JazzCash App</span>
                          </span>
                          <p className="text-xs text-[#526B57] leading-relaxed">
                            Open your JazzCash App, tap <strong>Scan QR</strong>, scan the code, enter <strong>{selectedPlan.amount}</strong>, and approve with your MPIN.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Easy 3-Step Instruction Guide */}
                    <div className="bg-white/80 p-3.5 rounded-xl border border-[#E3ECE5] text-xs text-[#425946] space-y-1.5">
                      <p className="font-bold text-[#1F2F23]">How to send payment via JazzCash:</p>
                      <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
                        <li>Open the <strong>JazzCash App</strong> or dial <strong>*786#</strong> on your phone.</li>
                        <li>Send <strong>{selectedPlan.amount}</strong> to Till ID: <strong className="font-mono">{config.jazzCashTillId || config.jazzCashAccountNumber}</strong> or Mobile: <strong className="font-mono">{config.jazzCashAccountNumber}</strong>.</li>
                        <li>Copy the <strong>Transaction ID (TID)</strong> from your confirmation SMS and enter it below.</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* EasyPaisa Payment Box */}
                {selectedMethod === 'easypaisa' && config.easyPaisaAccountNumber && (
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#00A859]/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-[#00A859] text-white text-[11px] font-extrabold rounded-lg tracking-wider">
                        EasyPaisa
                      </span>
                      <span className="text-[10px] text-[#4E6753] bg-[#EBF3ED] px-2 py-0.5 rounded font-medium">
                        Direct Transfer
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-[#DFE8E1]">
                        <span className="text-[10px] uppercase font-bold text-[#677F6B] block">
                          Account Title
                        </span>
                        <span className="text-sm font-bold text-[#1F2F23]">
                          {config.easyPaisaAccountTitle || config.creatorName}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-[#DFE8E1] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#677F6B] block">
                            EasyPaisa Mobile Number
                          </span>
                          <span className="text-sm font-bold font-mono text-[#1F2F23]">
                            {config.easyPaisaAccountNumber}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            copyToClipboard(config.easyPaisaAccountNumber || '', 'easypaisa_num')
                          }
                          className="p-1.5 bg-[#F2F7F3] hover:bg-[#00A859] hover:text-white text-[#00A859] rounded-lg border border-[#CCDCD0] text-xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {copiedField === 'easypaisa_num' ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span className="text-[10px] font-semibold">Copy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Proof Submission Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="border-t border-[#E3ECE5] pt-4">
                  <h4 className="text-sm font-bold text-[#1F2F23] mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#356B3F]" />
                    <span>Step 2: Enter Your Payment Details for Verification</span>
                  </h4>
                  <p className="text-xs text-[#59725F]">
                    Once submitted, your order will be logged immediately and accessible to the admin.
                  </p>
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                      Your WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="e.g. 0300 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                      JazzCash Transaction ID (TID) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. 0184920491 or TID from SMS"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#CCDCD0] text-sm font-mono focus:ring-2 focus:ring-[#2D4532] focus:outline-none bg-[#FAF8F5]"
                      required
                    />
                    <span className="text-[10px] text-[#69826F] mt-0.5 block">
                      Found in your JazzCash SMS or transaction receipt.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                      Payment Screenshot Proof (Optional)
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleScreenshotUpload}
                      className="hidden"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 py-2.5 px-3 bg-[#FAF8F5] hover:bg-[#EFF5F0] border border-[#CCDCD0] rounded-xl text-xs font-semibold text-[#2D4532] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{screenshotData ? 'Screenshot Attached ✓' : 'Upload Receipt'}</span>
                      </button>
                      {screenshotData && (
                        <button
                          type="button"
                          onClick={() => setScreenshotData('')}
                          className="text-xs text-red-600 hover:underline px-1"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A3F2E] uppercase mb-1">
                    Special Note / Preferred Timing (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Free to chat between 8 PM - 11 PM"
                    rows={2}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#CCDCD0] text-sm focus:ring-2 focus:ring-[#2D4532] focus:outline-none resize-none"
                  />
                </div>

                {/* Submit Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E3ECE5]">
                  <div className="flex items-center gap-1 text-[11px] text-[#556F5A]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#356B3F]" />
                    <span>Your data is stored securely and directly accessible by admin</span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#4E6753] hover:bg-[#EBF2EC] rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2D4532] hover:bg-[#1E3023] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#A6F4C5]" />
                      <span>Submit Payment & TID</span>
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
