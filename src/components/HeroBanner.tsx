import React from 'react';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Flame, 
  Leaf, 
  Award, 
  Wallet,
  Clock,
  Heart
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { DishCategory, Region } from '../types/restaurant';

export const HeroBanner: React.FC = () => {
  const { 
    t, 
    language, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    selectedRegion,
    setSelectedRegion,
    setIsTasteAdvisorOpen,
    setIsReservationOpen,
    setIsCallStaffOpen
  } = useRestaurant();

  const categories: { id: DishCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: t.allCategories, icon: '🥢' },
    { id: 'pho_bun', label: t.categories.pho_bun, icon: '🍜' },
    { id: 'com_xoi', label: t.categories.com_xoi, icon: '🍚' },
    { id: 'mon_cuon_banh', label: t.categories.mon_cuon_banh, icon: '🥗' },
    { id: 'mon_chinh_kho_xao', label: t.categories.mon_chinh_kho_xao, icon: '🍲' },
    { id: 'mon_chay', label: t.categories.mon_chay, icon: '🌱' },
    { id: 'trang_mieng_che', label: t.categories.trang_mieng_che, icon: '🍧' },
    { id: 'do_uong', label: t.categories.do_uong, icon: '☕' }
  ];

  const regions: { id: Region | 'all'; label: string }[] = [
    { id: 'all', label: t.regions.all },
    { id: 'bac', label: t.regions.bac },
    { id: 'trung', label: t.regions.trung },
    { id: 'nam', label: t.regions.nam },
    { id: 'toanquoc', label: t.regions.toanquoc }
  ];

  return (
    <div className="relative overflow-hidden mb-8">
      {/* Hero Header Card with Traditional Motif */}
      <div className="relative bg-gradient-to-br from-[#8C1D18] via-[#A8251F] to-[#781B15] text-[#FFFDF9] py-8 sm:py-12 px-4 sm:px-8 rounded-3xl shadow-xl border-2 border-[#D97706]/40 mx-3 sm:mx-6 mt-4">
        {/* Subtle decorative background circle */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border-[18px] border-[#F59E0B]/10 pointer-events-none" />
        <div className="absolute right-10 top-6 w-32 h-32 rounded-full bg-[#F59E0B]/10 blur-2xl pointer-events-none" />

        <div className="max-w-4xl relative z-10">
          <div className="inline-flex items-center space-x-2 bg-[#FEF3C7]/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-[#FDE68A] mb-3 border border-[#F59E0B]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Món Việt • Tinh hoa ẩm thực con người Việt Nam</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-[#FFFDF9] leading-tight mb-2">
            Món Việt
          </h1>
          <p className="text-base sm:text-xl text-[#FDE68A] font-serif font-semibold tracking-wide mb-3">
            Tinh hoa ẩm thực con người Việt Nam
          </p>
          <p className="text-sm sm:text-base text-[#FDE68A]/90 max-w-2xl leading-relaxed font-light mb-6">
            Mỗi món ăn là một câu chuyện văn hóa được chưng cất từ bàn tay tài hoa của con người Việt Nam. 
            Gọi món tại bàn, đặt trước giữ chỗ, hỗ trợ chu đáo và thanh toán nhanh qua MoMo, ZaloPay, VNPay.
          </p>

          {/* Quick Hero Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 text-xs text-[#FEF3C7]">
            <div className="bg-[#6B1410]/70 backdrop-blur-sm p-2.5 rounded-xl border border-[#F59E0B]/20 flex items-center space-x-2">
              <span className="text-lg">⚡</span>
              <div>
                <p className="font-bold text-white">Gọi Món Tại Bàn</p>
                <p className="text-[11px] text-[#FDE68A]">Bếp nhận đơn tức thì</p>
              </div>
            </div>
            <div className="bg-[#6B1410]/70 backdrop-blur-sm p-2.5 rounded-xl border border-[#F59E0B]/20 flex items-center space-x-2">
              <span className="text-lg">💳</span>
              <div>
                <p className="font-bold text-white">Ví MoMo & VNPay</p>
                <p className="text-[11px] text-[#FDE68A]">Quét QR bảo mật</p>
              </div>
            </div>
            <div className="bg-[#6B1410]/70 backdrop-blur-sm p-2.5 rounded-xl border border-[#F59E0B]/20 flex items-center space-x-2">
              <span className="text-lg">👑</span>
              <div>
                <p className="font-bold text-white">Tích Điểm Món Việt</p>
                <p className="text-[11px] text-[#FDE68A]">Đổi voucher & giảm bill</p>
              </div>
            </div>
            <div className="bg-[#6B1410]/70 backdrop-blur-sm p-2.5 rounded-xl border border-[#F59E0B]/20 flex items-center space-x-2">
              <span className="text-lg">🎯</span>
              <div>
                <p className="font-bold text-white">Gợi Ý Khẩu Vị AI</p>
                <p className="text-[11px] text-[#FDE68A]">Chuẩn gu ẩm thực của bạn</p>
              </div>
            </div>
          </div>

          {/* Search bar inside Hero */}
          <div className="relative max-w-2xl">
            <div className="flex items-center bg-[#FFFDF9] rounded-2xl shadow-lg p-1.5 border-2 border-[#D97706]/40 focus-within:border-[#B91C1C] transition-all">
              <div className="pl-3 pr-2 text-[#8C1D18]">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-[#2D1A12] placeholder-stone-400 focus:outline-none py-1.5"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
              <button 
                onClick={() => setIsTasteAdvisorOpen(true)}
                className="hidden sm:flex items-center space-x-1.5 bg-[#8C1D18] hover:bg-[#A8251F] text-[#FEF3C7] text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Gợi Ý Chuẩn Gu</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Region and Category Filter Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 space-y-4">
        {/* Regions tabs */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-[#8C1D18] uppercase tracking-wider flex items-center space-x-1 whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Vùng Miền:</span>
            </span>
            <div className="flex items-center space-x-1.5">
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedRegion === reg.id
                      ? 'bg-[#8C1D18] text-[#FFFDF9] shadow-md border border-[#F59E0B]/50'
                      : 'bg-white text-stone-700 hover:bg-[#FEF3C7] hover:text-[#78350F] border border-stone-200'
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTasteAdvisorOpen(true)}
              className="text-xs font-bold text-[#8C1D18] bg-[#FEF3C7] hover:bg-[#FDE68A] border border-[#D97706]/40 px-3 py-1 rounded-full flex items-center space-x-1 transition-all cursor-pointer whitespace-nowrap shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Khảo sát khẩu vị</span>
            </button>
          </div>
        </div>

        {/* Categories horizontal scroll pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2 pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#8C1D18] to-[#A8251F] text-[#FFFDF9] ring-2 ring-[#F59E0B]/50 shadow-md transform -translate-y-0.5'
                    : 'bg-white text-[#4A3228] hover:bg-[#FFF8E7] hover:border-[#D97706]/50 border border-stone-200/80'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
