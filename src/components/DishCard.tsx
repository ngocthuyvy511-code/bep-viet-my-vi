import React, { useState } from 'react';
import { 
  Star, 
  Flame, 
  Clock, 
  Plus, 
  Check, 
  Sparkles, 
  Leaf, 
  Eye, 
  Heart
} from 'lucide-react';
import { Dish } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';

interface DishCardProps {
  dish: Dish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const { 
    language, 
    addToCart, 
    setSelectedDish, 
    t 
  } = useRestaurant();

  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If dish has customizations, opening detail modal lets user pick preferred options
    if (dish.customizations && dish.customizations.length > 0) {
      setSelectedDish(dish);
      return;
    }

    addToCart(dish, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1200);
  };

  const name = language === 'vi' ? dish.nameVi : dish.nameEn;
  const description = language === 'vi' ? dish.descriptionVi : dish.descriptionEn;

  const regionBadge = () => {
    switch (dish.region) {
      case 'bac': return { label: 'Bắc Bộ', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'trung': return { label: 'Xứ Huế', color: 'bg-red-100 text-red-900 border-red-300' };
      case 'nam': return { label: 'Nam Bộ', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      default: return { label: 'Việt Nam', color: 'bg-orange-100 text-orange-900 border-orange-300' };
    }
  };

  const badgeInfo = regionBadge();

  return (
    <div 
      onClick={() => setSelectedDish(dish)}
      className="group bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1 relative"
    >
      {/* Dish Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img 
          src={dish.image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Region & Special Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border shadow-sm backdrop-blur-md ${badgeInfo.color}`}>
            {badgeInfo.label}
          </span>
          {dish.isBestSeller && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#8C1D18] text-white shadow-sm flex items-center space-x-0.5">
              <span>★ Bán Chạy</span>
            </span>
          )}
          {dish.isVegetarian && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-sm flex items-center space-x-0.5">
              <Leaf className="w-3 h-3 inline" />
              <span>Chay</span>
            </span>
          )}
        </div>

        {/* Spicy indicator */}
        {dish.spicyLevel > 0 && (
          <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-bold text-white flex items-center space-x-0.5 shadow">
            <span className="text-red-400">🌶️</span>
            <span>{t.spiceLevels[dish.spicyLevel]}</span>
          </div>
        )}

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-[#8C1D18] font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Eye className="w-3.5 h-3.5" />
            <span>Xem chi tiết & đánh giá</span>
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating, Prep Time, Calories */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <div className="flex items-center space-x-1 text-amber-600 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{dish.rating}</span>
              <span className="text-stone-400 font-normal">({dish.reviewsCount})</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-stone-500">
              <span className="flex items-center space-x-0.5">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>{dish.prepTimeMinutes}p</span>
              </span>
              <span>•</span>
              <span>{dish.calories} kcal</span>
            </div>
          </div>

          {/* Dish Name */}
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#2D1A12] group-hover:text-[#8C1D18] transition-colors line-clamp-1 mb-1.5">
            {name}
          </h3>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-3">
            {description}
          </p>
        </div>

        {/* Footer: Price and Add Button */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-bold text-base sm:text-lg text-[#8C1D18]">
                {dish.price.toLocaleString('vi-VN')}
                <span className="text-xs ml-0.5 font-normal">đ</span>
              </span>
              {dish.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {dish.originalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
            {dish.customizations && dish.customizations.length > 0 && (
              <span className="text-[10px] text-amber-700 font-medium">
                Có tùy chọn khẩu vị
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm ${
              isAddedRecently
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-[#8C1D18] hover:bg-[#A8251F] text-[#FEF3C7] hover:shadow-md'
            }`}
            title="Thêm vào đơn gọi món"
          >
            {isAddedRecently ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Đã thêm</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{dish.customizations?.length ? 'Tùy chọn' : 'Gọi món'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
