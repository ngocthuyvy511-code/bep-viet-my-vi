import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  QrCode, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  CreditCard, 
  Smartphone, 
  Receipt, 
  UtensilsCrossed
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRestaurant } from '../context/RestaurantContext';
import { PaymentMethodId } from '../types/restaurant';

export const PaymentModal: React.FC = () => {
  const { 
    isPaymentOpen, 
    setIsPaymentOpen, 
    orderTotal, 
    tableNumber, 
    diningType, 
    placeOrder, 
    setIsOrdersOpen, 
    member, 
    t, 
    language 
  } = useRestaurant();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('momo');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(899); // 15 mins countdown
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate simulated order reference
  useEffect(() => {
    if (isPaymentOpen && !createdOrderId) {
      setCreatedOrderId(`BV-${Math.floor(100000 + Math.random() * 900000)}`);
    }
  }, [isPaymentOpen, createdOrderId]);

  // Countdown timer
  useEffect(() => {
    if (!isPaymentOpen || isSuccess) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaymentOpen, isSuccess]);

  if (!isPaymentOpen) return null;

  const paymentMethods: { 
    id: PaymentMethodId; 
    name: string; 
    logoText: string; 
    bg: string; 
    textColor: string; 
    desc: string 
  }[] = [
    { 
      id: 'momo', 
      name: 'Ví MoMo', 
      logoText: 'MoMo', 
      bg: 'bg-[#A50064] text-white', 
      textColor: 'text-[#A50064]', 
      desc: 'Quét mã QR MoMo hoặc thanh toán 1 chạm' 
    },
    { 
      id: 'zalopay', 
      name: 'Ví ZaloPay', 
      logoText: 'ZaloPay', 
      bg: 'bg-[#0068FF] text-white', 
      textColor: 'text-[#0068FF]', 
      desc: 'Ví điện tử ZaloPay nhanh chóng & hoàn tiền' 
    },
    { 
      id: 'vnpay', 
      name: 'VNPay-QR (VietQR)', 
      logoText: 'VNPay', 
      bg: 'bg-[#005BAA] text-white', 
      textColor: 'text-[#005BAA]', 
      desc: 'Quét từ 30+ ngân hàng VCB, MB, Techcombank' 
    },
    { 
      id: 'viettelpay', 
      name: 'Viettel Money', 
      logoText: 'Viettel', 
      bg: 'bg-[#EE0033] text-white', 
      textColor: 'text-[#EE0033]', 
      desc: 'Ví điện tử & tài khoản viễn thông Viettel' 
    },
    { 
      id: 'card', 
      name: 'Thẻ Quốc Tế / ATM', 
      logoText: 'VISA/ATM', 
      bg: 'bg-[#1E293B] text-white', 
      textColor: 'text-stone-800', 
      desc: 'Hỗ trợ thẻ Visa, MasterCard, JCB, Napas' 
    },
    { 
      id: 'cash', 
      name: 'Tiền mặt tại bàn', 
      logoText: 'TIỀN MẶT', 
      bg: 'bg-emerald-700 text-white', 
      textColor: 'text-emerald-800', 
      desc: 'Thanh toán trực tiếp cho nhân viên khi ra về' 
    }
  ];

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSimulatePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Place order and mark paid
      placeOrder(selectedMethod, true);
      setIsProcessing(false);
      setIsSuccess(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const earnedPoints = Math.round(orderTotal / 10000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-[#D97706]/40 overflow-hidden my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8C1D18] via-[#A8251F] to-[#6B1410] text-[#FFFDF9] p-5 relative border-b border-[#F59E0B]/30 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#7F1D1D] flex items-center justify-center font-bold shadow">
              <ShieldCheck className="w-5 h-5 text-[#8C1D18]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-black text-white">
                {t.payment.title}
              </h2>
              <p className="text-xs text-[#FDE68A]/90 font-light">
                {t.payment.subtitle}
              </p>
            </div>
          </div>

          {!isSuccess && (
            <button
              onClick={() => setIsPaymentOpen(false)}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {isSuccess ? (
            /* Success Screen */
            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Giao Dịch Đã Xác Thực
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-[#2D1A12] mt-2">
                  {t.payment.successTitle}
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto mt-1 leading-relaxed">
                  {t.payment.successDesc}
                </p>
              </div>

              {/* Order & Points Receipt Card */}
              <div className="bg-[#FEF3C7]/40 border border-[#D97706]/30 rounded-2xl p-4 max-w-sm mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">{t.payment.orderId}:</span>
                  <span className="font-bold text-[#8C1D18]">{createdOrderId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Số tiền thanh toán:</span>
                  <span className="font-bold text-[#2D1A12] text-sm">{orderTotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200">
                  <span className="text-stone-500">Hình thức:</span>
                  <span className="font-semibold text-stone-800">
                    {paymentMethods.find(m => m.id === selectedMethod)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Điểm thưởng tích lũy:</span>
                  <span className="font-bold text-emerald-700">+{earnedPoints} điểm</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => {
                    setIsPaymentOpen(false);
                    setIsOrdersOpen(true);
                  }}
                  className="bg-[#8C1D18] hover:bg-[#A8251F] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow flex items-center justify-center space-x-1.5"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#FDE68A]" />
                  <span>{t.payment.viewStatus}</span>
                </button>
                <button
                  onClick={() => {
                    setIsPaymentOpen(false);
                  }}
                  className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  {t.payment.backToMenu}
                </button>
              </div>
            </div>
          ) : (
            /* Payment Workflow */
            <div className="space-y-4">
              {/* Payment Method Selector Grid */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#8C1D18] uppercase tracking-wide block">
                  {t.payment.selectMethod}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {paymentMethods.map(method => {
                    const isSelected = selectedMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#FEF3C7] border-[#D97706] shadow-md ring-1 ring-[#D97706]'
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${method.bg}`}>
                            {method.logoText}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#8C1D18]" />}
                        </div>
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#78350F]' : 'text-stone-800'}`}>
                          {method.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic QR Code & Payment Details Box */}
              <div className="bg-white p-4 rounded-3xl border-2 border-[#D97706]/30 shadow-md text-center space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-2">
                  <span>Mã đơn: <b className="text-stone-900">{createdOrderId}</b></span>
                  <span className="flex items-center space-x-1 text-amber-700 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Hết hạn: {formatTimer(secondsLeft)}</span>
                  </span>
                </div>

                {/* Amount Due Big Display */}
                <div>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-medium">
                    {t.payment.amountDue}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#8C1D18] font-serif">
                    {orderTotal.toLocaleString('vi-VN')} <span className="text-base">VND</span>
                  </span>
                </div>

                {/* QR Code Presentation */}
                {selectedMethod !== 'cash' ? (
                  <div className="space-y-2">
                    <div className="relative inline-block bg-white p-3 rounded-2xl border-2 border-stone-300 shadow-inner">
                      {/* Realistic VietQR / MoMo dynamic simulated QR code image */}
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=vietqr://${selectedMethod}/${createdOrderId}/${orderTotal}`} 
                        alt="Mã QR thanh toán"
                        className="w-40 h-40 mx-auto rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white p-1 rounded-full shadow-md border border-stone-200">
                          <span className="text-[10px] font-black text-[#8C1D18] px-1">
                            MÓN VIỆT
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 font-medium max-w-xs mx-auto">
                      {t.payment.scanPrompt}
                    </p>

                    {/* Account Info Details */}
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs text-left max-w-xs mx-auto space-y-1">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Chủ tài khoản:</span>
                        <span className="font-bold text-stone-900">NHÀ HÀNG MÓN VIỆT</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500">Nội dung CK:</span>
                        <button
                          onClick={() => handleCopy(createdOrderId)}
                          className="font-mono font-bold text-[#8C1D18] flex items-center space-x-1 cursor-pointer hover:underline"
                        >
                          <span>{createdOrderId}</span>
                          {copiedAccount ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Cash Instructions */
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-2 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
                      💵
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">
                      Thanh Toán Tiền Mặt Tại Bàn
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Đơn gọi món sẽ được gửi tới bếp ngay. Bạn có thể thanh toán trực tiếp cho nhân viên phục vụ sau khi kết thúc bữa ăn tại {tableNumber}.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Simulation Button */}
              <button
                onClick={handleSimulatePaymentSuccess}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang xác thực giao dịch qua cổng...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#FDE68A]" />
                    <span>
                      {selectedMethod === 'cash' 
                        ? 'Xác Nhận Gửi Đơn & Trả Tiền Mặt Sau' 
                        : t.payment.confirmPaymentSim}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
