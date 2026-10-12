import React from 'react';
import { 
  RestaurantProvider, 
  useRestaurant 
} from './context/RestaurantContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { DishCard } from './components/DishCard';
import { DishDetailModal } from './components/DishDetailModal';
import { TasteAdvisorModal } from './components/TasteAdvisorModal';
import { ReservationModal } from './components/ReservationModal';
import { CallStaffModal } from './components/CallStaffModal';
import { CartDrawer } from './components/CartDrawer';
import { PaymentModal } from './components/PaymentModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { OrderStatusModal } from './components/OrderStatusModal';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  Flame, 
  UtensilsCrossed, 
  ShoppingBag, 
  Calendar, 
  PhoneCall, 
  Crown,
  SearchX
} from 'lucide-react';

const MainMenuContent: React.FC = () => {
  const { 
    dishes, 
    searchQuery, 
    selectedCategory, 
    selectedRegion, 
    setSearchQuery, 
    setSelectedCategory, 
    setSelectedRegion,
    totalCartItemsCount,
    setIsCartOpen,
    setIsTasteAdvisorOpen,
    setIsReservationOpen,
    setIsCallStaffOpen,
    t, 
    language 
  } = useRestaurant();

  // Filter dishes by search query, category, and region
  const filteredDishes = dishes.filter(dish => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNameVi = dish.nameVi.toLowerCase().includes(q);
      const matchNameEn = dish.nameEn.toLowerCase().includes(q);
      const matchDescVi = dish.descriptionVi.toLowerCase().includes(q);
      const matchDescEn = dish.descriptionEn.toLowerCase().includes(q);
      const matchIngredient = dish.ingredientsVi.some(i => i.toLowerCase().includes(q)) || dish.ingredientsEn.some(i => i.toLowerCase().includes(q));
      if (!matchNameVi && !matchNameEn && !matchDescVi && !matchDescEn && !matchIngredient) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (dish.category !== selectedCategory) return false;
    }

    // Region filter
    if (selectedRegion !== 'all') {
      if (dish.region !== selectedRegion && dish.region !== 'toanquoc') return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2D1A12]">
      {/* Header */}
      <Header />

      {/* Hero and filters */}
      <main className="flex-1">
        <HeroBanner />

        {/* Dishes Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif font-black text-xl sm:text-2xl text-[#2D1A12] flex items-center space-x-2">
                <span>Danh Mục Món Ăn</span>
                <span className="text-xs bg-[#FEF3C7] text-[#78350F] px-2.5 py-0.5 rounded-full font-bold">
                  {filteredDishes.length} món
                </span>
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                Nguyên liệu tươi mới trong ngày • Nấu theo bí quyết gia truyền
              </p>
            </div>

            {(searchQuery || selectedCategory !== 'all' || selectedRegion !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedRegion('all');
                }}
                className="text-xs font-bold text-[#8C1D18] hover:underline cursor-pointer"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>

          {filteredDishes.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8 space-y-3 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center mx-auto">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-800">
                Không tìm thấy món ăn phù hợp
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Quý khách vui lòng thử tìm kiếm bằng từ khóa khác hoặc bấm đặt lại toàn bộ danh mục.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedRegion('all');
                }}
                className="bg-[#8C1D18] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#A8251F] cursor-pointer"
              >
                Xem Toàn Bộ Thực Đơn
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredDishes.map(dish => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Pill for Mobile */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 sm:hidden w-[92%] max-w-sm">
        <div className="bg-[#8C1D18]/95 backdrop-blur-md text-white p-2 rounded-2xl shadow-2xl border border-[#F59E0B]/50 flex items-center justify-around">
          <button 
            onClick={() => setIsCallStaffOpen(true)}
            className="flex flex-col items-center text-[10px] text-[#FEF3C7] cursor-pointer py-1"
          >
            <PhoneCall className="w-4 h-4 text-[#FDE68A] animate-pulse" />
            <span>Gọi phục vụ</span>
          </button>
          
          <button 
            onClick={() => setIsTasteAdvisorOpen(true)}
            className="flex flex-col items-center text-[10px] text-[#FEF3C7] cursor-pointer py-1"
          >
            <Sparkles className="w-4 h-4 text-[#FDE68A]" />
            <span>Khẩu vị AI</span>
          </button>

          <button 
            onClick={() => setIsReservationOpen(true)}
            className="flex flex-col items-center text-[10px] text-[#FEF3C7] cursor-pointer py-1"
          >
            <Calendar className="w-4 h-4 text-[#FDE68A]" />
            <span>Đặt bàn</span>
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-[#FEF3C7] text-[#7F1D1D] px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 cursor-pointer shadow"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#8C1D18]" />
            <span>Giỏ ({totalCartItemsCount})</span>
          </button>
        </div>
      </div>

      {/* Modals & Overlays */}
      <DishDetailModal />
      <TasteAdvisorModal />
      <ReservationModal />
      <CallStaffModal />
      <CartDrawer />
      <PaymentModal />
      <LoyaltyModal />
      <OrderStatusModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RestaurantProvider>
      <MainMenuContent />
    </RestaurantProvider>
  );
}
