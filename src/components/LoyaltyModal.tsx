import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  Sparkles, 
  Gift, 
  QrCode, 
  Check, 
  ChevronRight, 
  ShieldCheck, 
  Coins, 
  Award,
  Zap
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MemberTier } from '../types/restaurant';

export const LoyaltyModal: React.FC = () => {
  const { 
    isLoyaltyOpen, 
    setIsLoyaltyOpen, 
    member, 
    redeemVoucher, 
    t, 
    language 
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'card' | 'rewards' | 'tiers'>('card');
  const [redeemSuccessMsg, setRedeemSuccessMsg] = useState<string | null>(null);

  if (!isLoyaltyOpen) return null;

  const tierColors: Record<MemberTier, { label: string; bg: string; text: string; badge: string }> = {
    bronze: { label: 'Hội Viên Đồng', bg: 'from-amber-700 to-amber-900', text: 'text-amber-100', badge: 'bg-amber-600' },
    silver: { label: 'Hội Viên Bạc', bg: 'from-slate-400 to-slate-700', text: 'text-slate-100', badge: 'bg-slate-400' },
    gold: { label: 'Hội Viên Vàng (VIP)', bg: 'from-[#D97706] via-[#B45309] to-[#78350F]', text: 'text-[#FEF3C7]', badge: 'bg-[#F59E0B] text-[#7F1D1D]' },
    diamond: { label: 'Hội Viên Kim Cương', bg: 'from-indigo-600 via-purple-700 to-slate-900', text: 'text-purple-100', badge: 'bg-purple-500' }
  };

  const currentTierInfo = tierColors[member.tier];

  const availableVouchersToRedeem = [
    {
      id: 'vouch-50k',
      title: 'Giảm 50.000đ hóa đơn từ 200.000đ',
      points: 300,
      code: 'VIET50',
      icon: '🎟️'
    },
    {
      id: 'vouch-caphe',
      title: 'Tặng 01 Cà Phê Trứng Hà Nội',
      points: 250,
      code: 'TANGTRUNG',
      icon: '☕'
    },
    {
      id: 'vouch-10pct',
      title: 'Giảm 10% tổng hóa đơn (Tối đa 100k)',
      points: 500,
      code: 'MYVI10',
      icon: '✨'
    },
    {
      id: 'vouch-dessert',
      title: 'Tặng 01 Chè Ba Màu Cốt Dừa',
      points: 200,
      code: 'TANGCHE',
      icon: '🍧'
    }
  ];

  const handleRedeem = (vouchId: string, title: string) => {
    const success = redeemVoucher(vouchId);
    if (success) {
      setRedeemSuccessMsg(`Đã đổi thành công: "${title}"!`);
      setTimeout(() => setRedeemSuccessMsg(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-[#D97706]/40 overflow-hidden my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8C1D18] via-[#A8251F] to-[#6B1410] text-[#FFFDF9] p-5 relative border-b border-[#F59E0B]/30 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#7F1D1D] flex items-center justify-center font-bold shadow">
              <Crown className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-black text-white">
                {t.loyaltyView.title}
              </h2>
              <p className="text-xs text-[#FDE68A]/90 font-light">
                Tích điểm mỗi lần gọi món • Đặc quyền ẩm thực trọn đời
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLoyaltyOpen(false)}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 shrink-0 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('card')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-all ${
              activeTab === 'card'
                ? 'border-[#8C1D18] text-[#8C1D18]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Thẻ Thành Viên
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-all flex items-center space-x-1 ${
              activeTab === 'rewards'
                ? 'border-[#8C1D18] text-[#8C1D18]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Đổi Voucher ({availableVouchersToRedeem.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('tiers')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-all ${
              activeTab === 'tiers'
                ? 'border-[#8C1D18] text-[#8C1D18]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Đặc Quyền Hạng
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {redeemSuccessMsg && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{redeemSuccessMsg}</span>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="space-y-4">
              {/* Luxury Digital Card */}
              <div className={`p-6 rounded-3xl bg-gradient-to-br ${currentTierInfo.bg} text-white shadow-xl border-2 border-[#F59E0B]/50 relative overflow-hidden`}>
                <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full border-8 border-white/10 pointer-events-none" />
                <div className="absolute right-4 top-4 opacity-20 text-6xl">🏮</div>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#FDE68A] font-bold block">
                      MÓN VIỆT CLUB
                    </span>
                    <h3 className="font-serif font-black text-xl text-white mt-0.5">
                      {member.name}
                    </h3>
                    <span className="text-xs text-white/80">{member.phone}</span>
                  </div>

                  <span className={`text-xs font-black px-3 py-1 rounded-full shadow ${currentTierInfo.badge}`}>
                    {currentTierInfo.label}
                  </span>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-white/20">
                  <div>
                    <span className="text-[11px] text-white/70 block">Điểm thưởng khả dụng</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-black font-serif text-[#FDE68A]">
                        {member.points.toLocaleString()}
                      </span>
                      <span className="text-xs text-white/80 font-bold">điểm</span>
                    </div>
                    <span className="text-[10px] text-white/80">
                      ≈ {(member.points * 100).toLocaleString('vi-VN')}đ giảm trừ đơn
                    </span>
                  </div>

                  {/* QR code mini representation */}
                  <div className="bg-white p-1.5 rounded-xl shadow">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=MEMBER_${member.id}`} 
                      alt="Mã thành viên"
                      className="w-14 h-14" 
                    />
                  </div>
                </div>
              </div>

              {/* Tier Progress Bar */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-stone-700">Tiến trình lên Hạng Kim Cương</span>
                  <span className="font-bold text-[#8C1D18]">4.250.000đ / 5.000.000đ</span>
                </div>
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-full w-[85%]" />
                </div>
                <p className="text-[11px] text-stone-500">
                  Chỉ cần tích lũy thêm 750.000đ để thăng hạng Kim Cương và nhận ưu đãi tích 10%!
                </p>
              </div>

              {/* My active vouchers */}
              <div>
                <h4 className="text-xs font-bold text-[#8C1D18] uppercase tracking-wider mb-2">
                  Voucher Của Bạn ({member.vouchers.length})
                </h4>
                <div className="space-y-2">
                  {member.vouchers.map(v => (
                    <div key={v.id} className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200 flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-black text-[#8C1D18] bg-white px-2 py-0.5 rounded border border-amber-300">
                            {v.code}
                          </span>
                          <span className="text-xs font-bold text-stone-900">
                            {language === 'vi' ? v.titleVi : v.titleEn}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-500 block mt-1">
                          Hạn sử dụng: {v.expiresAt}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Sẵn sàng dùng
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="space-y-3">
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs flex justify-between items-center">
                <span>Số điểm của bạn: <b className="text-amber-900">{member.points} điểm</b></span>
                <span className="text-stone-500">1 điểm = 100đ</span>
              </div>

              <div className="space-y-2.5">
                {availableVouchersToRedeem.map(v => {
                  const canRedeem = member.points >= v.points;
                  return (
                    <div key={v.id} className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{v.icon}</span>
                        <div>
                          <h5 className="font-bold text-xs sm:text-sm text-stone-900">
                            {v.title}
                          </h5>
                          <span className="text-xs font-bold text-[#8C1D18]">
                            Cần {v.points} điểm
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRedeem(v.id, v.title)}
                        disabled={!canRedeem}
                        className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                          canRedeem
                            ? 'bg-[#8C1D18] hover:bg-[#A8251F] text-white shadow'
                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        {canRedeem ? 'Đổi Ngay' : 'Thiếu điểm'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'tiers' && (
            <div className="space-y-3">
              {[
                { title: 'Hạng Đồng (0đ - 1 triệu)', icon: '🥉', desc: 'Tích 1% hóa đơn thành điểm thưởng, ưu đãi ngày thành viên.' },
                { title: 'Hạng Bạc (1 triệu - 3 triệu)', icon: '🥈', desc: 'Tích 3% hóa đơn + Tặng 01 ly Trà Sen Vàng Long Nhãn mỗi tháng.' },
                { title: 'Hạng Vàng (3 triệu - 5 triệu)', icon: '🥇', desc: 'Tích 5% hóa đơn + Tặng món tráng miệng sinh nhật + Giảm 10% các ngày lễ.' },
                { title: 'Hạng Kim Cương (Trên 5 triệu)', icon: '💎', desc: 'Tích 10% hóa đơn + Miễn phí đặt phòng VIP + Đầu bếp thiết kế menu riêng.' }
              ].map((tier, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm flex items-start space-x-3">
                  <span className="text-2xl">{tier.icon}</span>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-[#8C1D18]">
                      {tier.title}
                    </h5>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
