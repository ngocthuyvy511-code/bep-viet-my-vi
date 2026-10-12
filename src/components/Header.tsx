import React, { useState } from 'react';
import { 
  Bell, 
  ShoppingBag, 
  Calendar, 
  Sparkles, 
  Crown, 
  Receipt, 
  MapPin, 
  Globe, 
  UtensilsCrossed, 
  Search,
  X,
  ChevronDown,
  PhoneCall
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    tableNumber, 
    setTableNumber,
    diningType,
    setDiningType,
    totalCartItemsCount,
    setIsCartOpen,
    setIsReservationOpen,
    setIsTasteAdvisorOpen,
    setIsCallStaffOpen,
    setIsLoyaltyOpen,
    setIsOrdersOpen,
    member,
    orders,
    serviceRequests,
    searchQuery,
    setSearchQuery
  } = useRestaurant();

  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
  const [customTableInput, setCustomTableInput] = useState('');

  const activeOrdersCount = orders.filter(o => o.status !== 'completed').length;
  const pendingRequestsCount = serviceRequests.filter(s => s.status !== 'completed').length;

  const quickTables = ['Bàn 01', 'Bàn 02', 'Bàn 06', 'Bàn 08', 'Bàn 12', 'Phòng VIP 01'];

  return (
    <header className="sticky top-0 z-40 bg-[#8C1D18] text-[#FFFDF9] shadow-lg border-b border-[#F59E0B]/30">
      {/* Top Banner: Authentic Heritage Strip */}
      <div className="bg-[#6B1410] px-4 py-1 text-xs flex justify-between items-center text-[#FDE68A] border-b border-[#F59E0B]/20">
        <div className="flex items-center space-x-2 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span>Bếp đang phục vụ: 7h30 đến 22h30 • Hotline đặt bàn: 0793464723</span>
        </div>
        
        {/* Language switcher & Member Quick Pill */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsLoyaltyOpen(true)}
            className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{member.name} ({member.points.toLocaleString()}đ)</span>
          </button>
          
          <button 
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            className="flex items-center space-x-1.5 bg-[#8C1D18] hover:bg-[#A8251F] px-2.5 py-0.5 rounded-full border border-[#F59E0B]/40 text-xs font-semibold cursor-pointer transition-all"
            title="Đổi ngôn ngữ / Switch language"
          >
            <Globe className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{language === 'vi' ? 'VI 🇻🇳' : 'EN 🇬🇧'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Emblem */}
        <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#D97706] via-[#F59E0B] to-[#FDE68A] flex items-center justify-center shadow-md p-0.5 border border-[#FEF3C7]">
            <div className="w-full h-full rounded-full bg-[#8C1D18] flex items-center justify-center text-[#F59E0B] font-bold text-lg">
              <UtensilsCrossed className="w-5 h-5 text-[#FDE68A]" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-black text-lg sm:text-2xl tracking-wide text-[#FFFDF9] drop-shadow-sm">
                MÓN VIỆT
              </span>
              <span className="hidden md:inline-block text-[10px] bg-[#F59E0B] text-[#7F1D1D] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Truyền Thống
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#FDE68A]/90 font-light hidden sm:block">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Table Selector / Dining Mode Button */}
        <div className="relative">
          <button 
            onClick={() => setIsTableDropdownOpen(!isTableDropdownOpen)}
            className="flex items-center space-x-1.5 bg-[#6B1410] hover:bg-[#570F0C] border border-[#F59E0B]/50 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-inner"
          >
            <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="font-semibold text-[#FEF3C7]">
              {diningType === 'dine_in' ? tableNumber : t.takeaway}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#FDE68A]" />
          </button>

          {isTableDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#FFFDF9] text-[#2D1A12] rounded-2xl shadow-2xl border border-[#F59E0B]/40 p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="text-xs font-bold text-[#8C1D18] uppercase tracking-wider mb-2">
                {t.cartDrawer.orderType}
              </div>
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                <button 
                  onClick={() => { setDiningType('dine_in'); setIsTableDropdownOpen(false); }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                    diningType === 'dine_in' 
                      ? 'bg-[#8C1D18] text-white shadow' 
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {t.dineIn}
                </button>
                <button 
                  onClick={() => { setDiningType('takeaway'); setIsTableDropdownOpen(false); }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                    diningType === 'takeaway' 
                      ? 'bg-[#8C1D18] text-white shadow' 
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {t.takeaway}
                </button>
              </div>

              {diningType === 'dine_in' && (
                <>
                  <div className="text-[11px] text-stone-500 font-medium mb-1.5">
                    Chọn nhanh bàn đang ngồi:
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                    {quickTables.map((tbl) => (
                      <button 
                        key={tbl}
                        onClick={() => { setTableNumber(tbl); setIsTableDropdownOpen(false); }}
                        className={`text-xs py-1 px-1.5 rounded-lg border text-center font-medium transition-all ${
                          tableNumber === tbl 
                            ? 'bg-[#FEF3C7] border-[#D97706] text-[#78350F] font-bold' 
                            : 'border-stone-200 hover:border-[#D97706] text-stone-700'
                        }`}
                      >
                        {tbl}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-1.5">
                    <input 
                      type="text" 
                      placeholder="Bàn khác (vd: Bàn 15)"
                      value={customTableInput}
                      onChange={(e) => setCustomTableInput(e.target.value)}
                      className="w-full text-xs px-2 py-1.5 border border-stone-300 rounded-lg focus:outline-none focus:border-[#8C1D18]"
                    />
                    <button 
                      onClick={() => {
                        if (customTableInput.trim()) {
                          setTableNumber(customTableInput.trim());
                          setCustomTableInput('');
                          setIsTableDropdownOpen(false);
                        }
                      }}
                      className="bg-[#8C1D18] text-white text-xs px-2.5 py-1.5 rounded-lg font-medium hover:bg-[#A8251F]"
                    >
                      Lưu
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          {/* Taste Advisor AI button */}
          <button 
            onClick={() => setIsTasteAdvisorOpen(true)}
            className="flex items-center space-x-1 bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#7F1D1D] hover:from-[#F59E0B] hover:to-[#FDE68A] px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
            title="Gợi ý món theo khẩu vị & AI"
          >
            <Sparkles className="w-4 h-4 text-[#7F1D1D]" />
            <span className="hidden md:inline">{t.tasteAdvisor}</span>
          </button>

          {/* Book table reservation button */}
          <button 
            onClick={() => setIsReservationOpen(true)}
            className="flex items-center space-x-1 bg-[#6B1410] hover:bg-[#570F0C] border border-[#F59E0B]/40 text-[#FEF3C7] px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer"
            title="Đặt bàn trước"
          >
            <Calendar className="w-4 h-4 text-[#F59E0B]" />
            <span className="hidden lg:inline">{t.reserveTable}</span>
          </button>

          {/* Call Waiter / Service Button */}
          <button 
            onClick={() => setIsCallStaffOpen(true)}
            className="relative flex items-center space-x-1 bg-[#6B1410] hover:bg-[#570F0C] border border-[#F59E0B]/40 text-[#FEF3C7] px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer"
            title="Gọi nhân viên hỗ trợ tại bàn"
          >
            <PhoneCall className="w-4 h-4 text-[#F59E0B] animate-pulse" />
            <span className="hidden xl:inline">{t.callStaff}</span>
            {pendingRequestsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#10B981] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ring-2 ring-[#8C1D18]">
                {pendingRequestsCount}
              </span>
            )}
          </button>

          {/* Member Card / Loyalty */}
          <button 
            onClick={() => setIsLoyaltyOpen(true)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 bg-[#6B1410] hover:bg-[#570F0C] border border-[#F59E0B]/40 text-[#FDE68A] rounded-xl text-xs sm:text-sm font-medium flex items-center space-x-1 cursor-pointer transition-all"
            title="Thẻ hội viên & Voucher"
          >
            <Crown className="w-4 h-4 text-[#F59E0B]" />
            <span className="hidden xl:inline">{t.loyalty}</span>
          </button>

          {/* Active Orders Tracker */}
          <button 
            onClick={() => setIsOrdersOpen(true)}
            className="relative p-1.5 sm:px-2.5 sm:py-1.5 bg-[#6B1410] hover:bg-[#570F0C] border border-[#F59E0B]/40 text-[#FEF3C7] rounded-xl text-xs sm:text-sm font-medium flex items-center space-x-1 cursor-pointer transition-all"
            title="Xem trạng thái bếp nấu đơn gọi món"
          >
            <Receipt className="w-4 h-4 text-[#FDE68A]" />
            <span className="hidden xl:inline">{t.myOrders}</span>
            {activeOrdersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F59E0B] text-[#7F1D1D] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ring-2 ring-[#8C1D18]">
                {activeOrdersCount}
              </span>
            )}
          </button>

          {/* Cart Floating / Drawer Trigger */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center space-x-1.5 bg-[#FEF3C7] text-[#7F1D1D] hover:bg-[#FDE68A] px-3 sm:px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
            title="Xem giỏ món gọi"
          >
            <ShoppingBag className="w-4 h-4 text-[#8C1D18]" />
            <span>{t.cart}</span>
            {totalCartItemsCount > 0 && (
              <span className="bg-[#8C1D18] text-[#FEF3C7] text-xs px-1.5 py-0.2 rounded-full font-bold ml-1">
                {totalCartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
